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
      const newProfiles = { ...profiles };

      events.forEach((event) => {
        try {
          const profile = JSON.parse(event.content);

          newProfiles[event.pubkey] = profile;

          setLoadingProfiles((prev) => {
            const newSet = new Set(prev);
            newSet.delete(event.pubkey);
            return newSet;
          });
        } catch (error) {
          console.error("Error parsing profile:", error);
        }
      });

      setProfiles(newProfiles);
    }
  }, [events, profiles]);

  useEffect(() => {
    if (events.length > 0) {
      const newProfiles = { ...profiles };

      events.forEach((event) => {
        try {
          const profile = JSON.parse(event.content);
          newProfiles[event.pubkey] = profile;

          setLoadingProfiles((prev) => {
            const newSet = new Set(prev);
            newSet.delete(event.pubkey);
            return newSet;
          });
        } catch (error) {
          console.error(
            "Error parsing profile:",
            error,
            "for pubkey:",
            event.pubkey,
          );
        }
      });

      console.log("Updated profiles:", newProfiles);
      setProfiles(newProfiles);
    }
  }, [events]);

  const getProfile = (pubkey: string): Profile | null => {
    return profiles[pubkey] || null;
  };

  const loadProfile = (pubkey: string) => {
    if (!pubkey) return;

    if (
      profiles[pubkey] ||
      loadingProfiles.has(pubkey) ||
      requestedProfiles.has(pubkey)
    ) {
      console.log("Profile already loaded or loading:", pubkey);
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
    return loadingProfiles.has(pubkey);
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
