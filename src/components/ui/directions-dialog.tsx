"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DirectionsDialogProps {
  isOpen: boolean;
  locationName: string;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * DirectionsDialog — modal for confirming directions intent
 * 
 * Asks the user if they want directions to the selected location.
 * Shows location name and provides "Cancel" and "Get Directions" buttons.
 */
export function DirectionsDialog({
  isOpen,
  locationName,
  onClose,
  onConfirm,
}: DirectionsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 max-w-sm rounded-lg border border-border-hairline bg-canvas p-6 shadow-lg backdrop:bg-surface-inverse/40 backdrop:transition-opacity backdrop:duration-300 backdrop:ease-smooth"
      onClick={handleBackdropClick}
      onCancel={onClose}
    >
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="font-display font-bold uppercase tracking-display text-lg text-text-primary">
            Get Directions?
          </h2>
          <p className="mt-2 font-body text-sm text-text-secondary">
            Open directions to <span className="font-bold">{locationName}</span> in Google Maps?
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center h-10 rounded-full border border-border-hairline bg-canvas px-4 font-display font-bold uppercase tracking-button text-xs text-text-primary transition-all duration-300 ease-smooth hover:border-border-strong hover:shadow-[0_2px_8px_rgba(15,30,45,0.08)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 inline-flex items-center justify-center h-10 rounded-full border border-border-strong bg-surface-inverse px-4 font-display font-bold uppercase tracking-button text-xs text-text-inverse transition-all duration-300 ease-smooth hover:shadow-[0_2px_8px_rgba(15,30,45,0.16)]"
          >
            Get Directions
          </button>
        </div>
      </div>
    </dialog>
  );
}
