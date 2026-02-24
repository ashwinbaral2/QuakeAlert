"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ActivityIcon, SquareActivity } from "lucide-react";

export default function ReportButton() {
  return (
    <Dialog>
      {/* Floating button */}
      <DialogTrigger asChild>
        {/* Floating emergency button: sits above main content */}
        <Button
          className="fixed bottom-20 right-6 z-20 bg-slate-200 hover:bg-red-700 w-fit h-fit text-red-700 hover:text-gray-100 p-5 shadow-2xl rounded-full"
          size="icon"
        >
        Report an Earthquake <SquareActivity className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      {/* Modal / Form */}
      {/* Dialog: use modal z-scale level (z-400) so modals stay above sidebar/footer */}
      <DialogContent className="sm:max-w-lg z-400">
        <DialogHeader>
          <DialogTitle>Report an Earthquake </DialogTitle>
          <DialogDescription>
            Share details about the earthquake you felt. Your submission will
            help others stay informed.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="City, Country"
              className="mt-1 block w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label htmlFor="magnitude" className="block text-sm font-medium">
              Magnitude (optional)
            </label>
            <input
              type="number"
              step="0.1"
              id="magnitude"
              name="magnitude"
              placeholder="e.g., 5.2"
              className="mt-1 block w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Describe what you felt..."
              className="mt-1 block w-full border rounded-md p-2"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Submit
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
