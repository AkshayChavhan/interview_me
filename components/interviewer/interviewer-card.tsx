"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, BookOpen, Building2, Users, FileEdit } from "lucide-react";
import { useState } from "react";
import { InterviewerDialog } from "./interviewer-dialog";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { InterviewerView } from "./interviewer-view";
import { Interviewer } from "@/types/interviewer";

interface InterviewerCardProps {
  interviewer: Interviewer;
}

export function InterviewerCard({ interviewer }: InterviewerCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  return (
    <>
      <Card 
        className="relative hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setIsViewDialogOpen(true)}
      >
        {interviewer.isDraft && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            Draft
          </Badge>
        )}
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {interviewer.collegeName}
            </div>
            <Badge variant="secondary">{interviewer.interviewType}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{interviewer.branch} - {interviewer.section}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{interviewer.subject}</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <strong>Topics:</strong> {interviewer.topics}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{interviewer.phoneNumber}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditDialogOpen(true);
              }}
            >
              <FileEdit className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <InterviewerView
            interviewer={interviewer}
            onClose={() => setIsViewDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <InterviewerDialog
        interviewer={interviewer}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      />
    </>
  );
}