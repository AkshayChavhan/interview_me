"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileEdit, Phone, BookOpen, Building2, Users, FileText } from "lucide-react";
import { Interviewer } from "@/types/interviewer";
import { useState } from "react";
import { InterviewerDialog } from "./interviewer-dialog";

interface InterviewerViewProps {
  interviewer: Interviewer;
  onClose: () => void;
}

export function InterviewerView({ interviewer, onClose }: InterviewerViewProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">{interviewer.collegeName}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{interviewer.interviewType}</Badge>
            {interviewer.isDraft && <Badge variant="outline">Draft</Badge>}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <FileEdit className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Branch & Section</label>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{interviewer.branch} - {interviewer.section}</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Subject</label>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{interviewer.subject}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Topics</label>
          <p className="text-sm">{interviewer.topics}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{interviewer.phoneNumber}</span>
            </div>
          </div>
          {interviewer.questionFile && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Question File</label>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{interviewer.questionFile}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <InterviewerDialog
        interviewer={interviewer}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      />
    </div>
  );
}