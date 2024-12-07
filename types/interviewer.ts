export interface Interviewer {
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