import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
import { X } from "lucide-react";

export default function UnderConstruction({
  onOpen,
  setDialogOpen,
}: {
  onOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={onOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-md text-black dark:text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between gap-2 text-lg font-bold">
            <div className="flex items-center gap-2">Coming Soon 🚧 👷‍♂️</div>
            <button
              className="rounded-full p-1 text-gray-400 hover:bg-neutral-400 hover:text-white dark:hover:bg-neutral-800"
              onClick={() => setDialogOpen(false)}
            >
              <X />
            </button>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-3 space-y-4">
          This page is currently under development.
        </div>
      </DialogContent>
    </Dialog>
  );
}
