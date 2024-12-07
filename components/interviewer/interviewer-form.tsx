"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useInterviewers } from "@/hooks/use-interviewers";

const formSchema = z.object({
  collegeName: z.string().min(2, "College name must be at least 2 characters"),
  branch: z.string().min(2, "Branch must be at least 2 characters"),
  section: z.string().min(1, "Section is required"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  topics: z.string().min(2, "Topics must be at least 2 characters"),
  instructionsToInterviewer: z.string().min(10, "Instructions must be at least 10 characters"),
  interviewType: z.string(),
  phoneNumber: z.string().regex(/^\d{10}$/, "Invalid phone number"),
  questionFile: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface InterviewerFormProps {
  interviewer?: FormValues & { id?: string };
  onClose?: () => void;
}

export function InterviewerForm({ interviewer, onClose }: InterviewerFormProps) {
  const { toast } = useToast();
  const { addInterviewer, updateInterviewer, saveDraft } = useInterviewers();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: interviewer || {
      collegeName: "",
      branch: "",
      section: "",
      subject: "",
      topics: "",
      instructionsToInterviewer: "",
      interviewType: "technical",
      phoneNumber: "",
      questionFile: "",
    },
  });

  async function onSubmit(values: FormValues) {
    if (interviewer?.id) {
      updateInterviewer(interviewer.id, values);
     
      toast({
        title: "Interviewer updated",
        description: "The interviewer has been successfully updated.",
      });
    } else {
      addInterviewer(values);
      toast({
        title: "Interviewer created",
        description: "The interviewer has been successfully created.",
      });
    }
    form.reset();
    onClose?.();
    return 
    // const response = await axios
    // .post(
    //   '/api/openAi',
    //   {
    //     name: {`${values.collegeName}-${values.branch}-${values.section}-${values.subject}`},
    //     tools: [{ type: 'file_search' }],
    //     model: 'gpt-4o-mini',
    //     instructions: instructionsToInterviewer
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // )

    // if (!response.data || !response.data?.id) {
    // console.error('Invalid response data');
    // throw new Error('Failed to create assistant. No response from API.');
    // }
  }

  function onSaveDraft() {
    const values = form.getValues();
    saveDraft(values);
    toast({
      title: "Draft saved",
      description: "The interviewer has been saved as a draft.",
    });
    onClose?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="collegeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>College Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter college name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <FormControl>
                  <Input placeholder="Enter branch" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="section"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section</FormLabel>
                <FormControl>
                  <Input placeholder="Enter section" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Enter subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topics"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topics</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter topics (comma separated)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instructionsToInterviewer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instruction to Interviewer</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share what should be pace of interview..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interviewType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interview Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interview type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="questionFile"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Question File</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  accept=".pdf,.doc,.docx" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file ? file.name : "");
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onSaveDraft}>
            Save as Draft
          </Button>
          <Button type="submit">
            {interviewer ? "Update" : "Create"} Interviewer
          </Button>
        </div>
      </form>
    </Form>
  );
}