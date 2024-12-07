"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InterviewerForm } from "./interviewer-form";
import { Interviewer } from "@/types/interviewer";

interface InterviewerDialogProps {
  interviewer?: Interviewer;
  isOpen: boolean;
  onClose: () => void;
}

export function InterviewerDialog({ interviewer, isOpen, onClose }: InterviewerDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {interviewer ? "Edit Interviewer" : "Create New Interviewer"}
          </DialogTitle>
        </DialogHeader>
        <InterviewerForm
          interviewer={interviewer}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}