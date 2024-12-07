"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InterviewerForm } from "./interviewer-form";
import { UserPlus } from "lucide-react";

export function CreateInterviewerDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Create an Interviewer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Interviewer</DialogTitle>
        </DialogHeader>
        <InterviewerForm />
      </DialogContent>
    </Dialog>
  );
}