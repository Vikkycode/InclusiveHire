"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  location: z.string().min(2, "Location is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  requirements: z.string().min(30, "Requirements must be at least 30 characters"),
  salary_range: z.string().min(1, "Salary range is required"),
  job_type: z.string().min(1, "Job type is required"),
  experience_level: z.string().min(1, "Experience level is required"),
  is_remote_friendly: z.boolean().default(false),  // Correct type
  sign_language_environment: z.string().min(1, "Sign language environment is required"),
  has_sign_language_interpreters: z.boolean().default(false), // Correct type
  has_visual_alerts: z.boolean().default(false), // Correct type
  has_caption_devices: z.boolean().default(false), // Correct type
  has_video_relay: z.boolean().default(false),  // Correct type
  has_assistive_technology: z.boolean().default(false), // Correct type
  has_deaf_friendly_training: z.boolean().default(false), // Correct type
  workplace_accommodations: z.string().optional(),
  accessibility_notes: z.string().optional(),          // Made optional
  deaf_employee_support: z.string().optional(),      // Made optional
});

export default function PostJob() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      requirements: "",
      salary_range: "",
      job_type: "",
      experience_level: "",
      is_remote_friendly: false,
      sign_language_environment: "",
      has_sign_language_interpreters: false,
      has_visual_alerts: false,
      has_caption_devices: false,
      has_video_relay: false,
      has_assistive_technology: false,
      has_deaf_friendly_training: false,
      workplace_accommodations: "",
      accessibility_notes: "",
      deaf_employee_support: "",
    },
  });

  useEffect(() => {
    if (!user || user.role !== "EMPLOYER") {
      router.push("/login");
    }
  }, [user]);

  const onSubmit = async (data) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to post a job",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/jobs/", data);
      console.log("Job posted successfully:", response.data);

      toast({
        variant: "default",
        title: "Success!",
        description: "Job posted successfully",
      });

      setTimeout(()=>{
        router.push(`/employers/jobs/${response.data.id}`);
      }, 500)
    } catch (error) {
      console.error("Error posting job:", error);

      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to post job",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <DashboardLayout>
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Post a New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic">Basic Information</TabsTrigger>
                  <TabsTrigger value="accessibility">
                    Accessibility Features
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6">
                  {/* Basic Job Information Fields */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Software Engineer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., New York, NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="job_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="FULL_TIME">Full Time</SelectItem>
                            <SelectItem value="PART_TIME">Part Time</SelectItem>
                            <SelectItem value="CONTRACT">Contract</SelectItem>
                            <SelectItem value="INTERNSHIP">
                              Internship
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience_level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ENTRY">Entry Level</SelectItem>
                            <SelectItem value="MID">Mid Level</SelectItem>
                            <SelectItem value="SENIOR">Senior Level</SelectItem>
                            <SelectItem value="LEAD">Lead</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salary_range"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salary Range</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., $50,000 - $70,000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the role and responsibilities..."
                            className="h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List the job requirements..."
                            className="h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Add other basic fields similarly */}
                </TabsContent>

                <TabsContent value="accessibility" className="space-y-6">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="is_remote_friendly"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Remote Work Available</FormLabel>
                            <p>
                              Indicate if this position can be performed remotely
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sign_language_environment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sign Language Environment</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select environment type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="DEAF_CENTRIC">
                                Deaf-Centric Workplace
                              </SelectItem>
                              <SelectItem value="MIXED">
                                Mixed Deaf/Hearing Environment
                              </SelectItem>
                              <SelectItem value="INTERPRETERS">
                                Interpreters Available
                              </SelectItem>
                              <SelectItem value="LEARNING">
                                Sign Language Learning Supported
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Accessibility Checkboxes */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Available Accommodations
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          {
                            name: "has_sign_language_interpreters",
                            label: "Sign Language Interpreters",
                          },
                          { name: "has_visual_alerts", label: "Visual Alerts" },
                          {
                            name: "has_caption_devices",
                            label: "Caption Devices",
                          },
                          {
                            name: "has_video_relay",
                            label: "Video Relay Services",
                          },
                          {
                            name: "has_assistive_technology",
                            label: "Assistive Technology",
                          },
                          {
                            name: "has_deaf_friendly_training",
                            label: "Deaf-Friendly Training",
                          },
                        ].map(({ name, label }) => (
                          <FormField
                            key={name}
                            control={form.control}
                            name={name}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {label}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Additional Information Fields */}
                    <FormField
                      control={form.control}
                      name="workplace_accommodations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Additional Workplace Accommodations
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe any additional workplace accommodations..."
                              className="h-20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deaf_employee_support"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deaf Employee Support</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe how your company supports deaf employees..."
                              className="h-20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Posting..." : "Post Job"}
                </Button> 
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
    </DashboardLayout>
  );
}
