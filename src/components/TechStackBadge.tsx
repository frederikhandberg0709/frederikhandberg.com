import React, { useState } from "react";
import "./card.css";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
import { X } from "lucide-react";

interface TechStackBadgeProps {
  name: string;
  description: string;
  logo: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  hasDetails?: boolean;
  detailedInfo?: {
    title?: string;
    description?: string;
    keyFeatures?: string[];
    personalExperience?: React.ReactNode;
  };
}

export default function TechStackBadge({
  name,
  description,
  logo: Logo,
  hasDetails = false,
  detailedInfo,
}: TechStackBadgeProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => hasDetails && setDialogOpen(true)}
        className="card group relative rounded-[14px]"
      >
        <div className="absolute inset-0 rounded-[14px] bg-gradient-to-b from-[#339DFF] to-[#312FAD] opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100"></div>
        <div
          className={`relative z-10 m-0.5 flex h-24 w-60 items-center justify-start rounded-xl bg-white p-3 transition duration-200 ease-in-out dark:bg-[#0a0a0a] dark:group-hover:bg-neutral-900 ${hasDetails ? "cursor-pointer" : ""}`}
        >
          <div className="flex items-center gap-2.5">
            <Logo height={50} width={50} className="min-w-fit" />
            <div className="flex flex-col gap-0.5">
              <p className="font-bold">{name}</p>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>

          {hasDetails && (
            <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
              i
            </div>
          )}
        </div>
      </div>

      {hasDetails && detailedInfo && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md border-neutral-200 bg-white text-black dark:border-neutral-800 dark:bg-neutral-900 dark:text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between gap-2 text-lg font-bold">
                <div className="flex items-center gap-2">
                  <Logo height={24} width={24} />
                  {detailedInfo.title || name}
                </div>
                <button
                  className="rounded-full p-1 text-gray-400 hover:bg-neutral-400 hover:text-white dark:hover:bg-neutral-800"
                  onClick={() => setDialogOpen(false)}
                >
                  <X />
                </button>
              </DialogTitle>
            </DialogHeader>

            <div className="mt-3 space-y-4">
              {detailedInfo.description && (
                <p className="text-sm dark:text-gray-300">
                  {detailedInfo.description}
                </p>
              )}

              {detailedInfo.keyFeatures &&
                detailedInfo.keyFeatures.length > 0 && (
                  <div>
                    <h4 className="mb-1 text-sm font-bold">Key Features</h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm dark:text-gray-300">
                      {detailedInfo.keyFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

              {detailedInfo.personalExperience && (
                <div>
                  <h4 className="mb-1 text-sm font-bold">My Experience</h4>
                  <div className="text-sm dark:text-gray-300">
                    {detailedInfo.personalExperience}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
