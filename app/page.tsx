"use client";

import { CreateInterviewerDialog } from "@/components/interviewer/create-interviewer-dialog";
import { InterviewerCard } from "@/components/interviewer/interviewer-card";
import { useInterviewers } from "@/hooks/use-interviewers";

export default function Home() {
  const { interviewers } = useInterviewers();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Welcome to Dashboard</h1>
        <CreateInterviewerDialog />
      </div>

      {interviewers.length === 0 ? (
        <div className="text-center p-12 bg-muted/50 rounded-lg">
          <h2 className="text-2xl font-semibold text-muted-foreground">
            No Interviewers Created
          </h2>
          <p className="text-muted-foreground mt-2">
            Click the &quot;Create an Interviewer&quot; button to add your first interviewer.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {interviewers.map((interviewer, index) => (
            <InterviewerCard key={index} interviewer={interviewer} />
          ))}
        </div>
      )}
    </div>
  );
}