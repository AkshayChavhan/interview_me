"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Interviewer {
  id?: string;
  collegeName: string;
  branch: string;
  section: string;
  subject: string;
  topics: string;
  interviewType: string;
  phoneNumber: string;
  questionFile?: string;
  isDraft?: boolean;
}

interface InterviewerStore {
  interviewers: Interviewer[];
  draftInterviewer: Interviewer | null;
  addInterviewer: (interviewer: Interviewer) => void;
  updateInterviewer: (id: string, interviewer: Interviewer) => void;
  setDraftInterviewer: (interviewer: Interviewer | null) => void;
  saveDraft: (interviewer: Interviewer) => void;
}

export const useInterviewers = create<InterviewerStore>()(
  persist(
    (set) => ({
      interviewers: [],
      draftInterviewer: null,
      addInterviewer: (interviewer) =>
        set((state) => ({
          interviewers: [...state.interviewers, { ...interviewer, id: crypto.randomUUID() }],
        })),
      updateInterviewer: (id, interviewer) =>
        set((state) => ({
          interviewers: state.interviewers.map((i) =>
            i.id === id ? { ...interviewer, id } : i
          ),
        })),
      setDraftInterviewer: (interviewer) =>
        set({ draftInterviewer: interviewer }),
      saveDraft: (interviewer) =>
        set((state) => ({
          draftInterviewer: { ...interviewer, isDraft: true },
        })),
    }),
    {
      name: "interviewer-storage",
    }
  )
);