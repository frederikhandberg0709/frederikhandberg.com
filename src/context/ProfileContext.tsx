"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNostrEvents } from "nostr-react";

interface Profile {
  picture?: string;
  display_name?: string;
  name?: string;
  nip05?: string;
  about?: string;
}

interface ProfileContextType {
  profiles: Record<string, Profile>;
  getProfile: (pubkey: string) => Profile | null;
  loadProfile: (pubkey: string) => void;
  isLoadingProfile: (pubkey: string) => boolean;
}

const ProfileContext = createContext<ProfileContextType>({
  profiles: {},
  getProfile: () => null,
  loadProfile: () => {},
  isLoadingProfile: () => false,
});

interface ProfileProviderProps {
  children: ReactNode;
}

export function ProfileProvider({ children }: ProfileProviderProps) {
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [loadingProfiles, setLoadingProfiles] = useState<Set<string>>(
    new Set(),
  );
  const [requestedProfiles, setRequestedProfiles] = useState<Set<string>>(
    new Set(),
  );

  const { events } = useNostrEvents({
    filter: {
      authors: Array.from(requestedProfiles),
      kinds: [0],
      limit: 50,
    },
    enabled: requestedProfiles.size > 0,
  });

  useEffect(() => {
    if (events.length > 0) {
      const processedPubkeys = new Set<string>();

      setProfiles((prevProfiles) => {
        const newProfiles = { ...prevProfiles };
        let updatedProfiles = false;

        events.forEach((event) => {
          try {
            processedPubkeys.add(event.pubkey);

            if (!prevProfiles[event.pubkey]) {
              const profile = JSON.parse(event.content);
              newProfiles[event.pubkey] = profile;
              updatedProfiles = true;
            }
          } catch (error) {
            console.error("Error parsing profile:", error);
          }
        });

        return updatedProfiles ? newProfiles : prevProfiles;
      });

      setLoadingProfiles((prev) => {
        if (processedPubkeys.size === 0) return prev;

        const newSet = new Set<string>();
        prev.forEach((pubkey) => {
          if (!processedPubkeys.has(pubkey)) {
            newSet.add(pubkey);
          }
        });

        return newSet;
      });

      setRequestedProfiles((prev) => {
        if (processedPubkeys.size === 0) return prev;

        const newSet = new Set<string>();
        prev.forEach((pubkey) => {
          if (!processedPubkeys.has(pubkey)) {
            newSet.add(pubkey);
          }
        });

        return newSet;
      });
    }
  }, [events]);

  const getProfile = (pubkey: string): Profile | null => {
    return profiles[pubkey] || null;
  };

  const loadProfile = (pubkey: string) => {
    if (!pubkey) return;

    if (profiles[pubkey]) {
      return;
    }

    if (loadingProfiles.has(pubkey) || requestedProfiles.has(pubkey)) {
      return;
    }

    setRequestedProfiles((prev) => {
      const newSet = new Set(prev);
      newSet.add(pubkey);
      return newSet;
    });

    setLoadingProfiles((prev) => {
      const newSet = new Set(prev);
      newSet.add(pubkey);
      return newSet;
    });
  };

  const isLoadingProfile = (pubkey: string): boolean => {
    const isLoading = loadingProfiles.has(pubkey);
    return isLoading;
  };

  return (
    <ProfileContext.Provider
      value={{ profiles, getProfile, loadProfile, isLoadingProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfileContext = () => useContext(ProfileContext);
