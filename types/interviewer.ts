export interface Interviewer {
    id?: string;
    collegeName: string;
    branch: string;
    section: string;
    subject: string;
    topics: string;
    instructionsToInterviewer: string;
    interviewType: string;
    phoneNumber: string;
    questionFile?: string;
    isDraft?: boolean;
  }