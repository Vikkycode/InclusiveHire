'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import axios from '@/lib/axios';

export default function ViewJobListing() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, [params.id]);

  const fetchJob = async () => {
    try {
      const response = await axios.get(`/api/jobs/${params.id}/`);
      setJob(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch job details",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleJobStatus = async () => {
    try {
      await axios.post(`/api/jobs/${params.id}/toggle_status/`);
      fetchJob(); // Refresh job data
      toast({
        title: "Success",
        description: `Job ${job.is_active ? 'deactivated' : 'activated'} successfully`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update job status",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-gray-500">Job not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        <div className="space-x-4">
          <Button 
            variant="outline"
            onClick={() => router.push(`/employer/jobs/${params.id}/edit`)}
          >
            Edit Job
          </Button>
          <Button 
            variant={job.is_active ? "destructive" : "default"}
            onClick={toggleJobStatus}
          >
            {job.is_active ? 'Deactivate' : 'Activate'} Job
          </Button>
        </div>
      </div>

      {/* Job Overview Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
              <p className="text-gray-500">{job.location}</p>
            </div>
            <Badge variant={job.is_active ? "success" : "secondary"}>
              {job.is_active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-semibold">Job Type</p>
              <p>{job.job_type}</p>
            </div>
            <div>
              <p className="font-semibold">Experience Level</p>
              <p>{job.experience_level}</p>
            </div>
            <div>
              <p className="font-semibold">Salary Range</p>
              <p>{job.salary_range}</p>
            </div>
            <div>
              <p className="font-semibold">Posted Date</p>
              <p>{new Date(job.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Features Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Accessibility Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Work Environment</h3>
              <Badge variant="outline">
                {job.sign_language_environment.replace('_', ' ')}
              </Badge>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Available Accommodations</h3>
              <div className="flex flex-wrap gap-2">
                {job.has_sign_language_interpreters && (
                  <Badge variant="outline">Sign Language Interpreters</Badge>
                )}
                {job.has_visual_alerts && (
                  <Badge variant="outline">Visual Alerts</Badge>
                )}
                {job.has_caption_devices && (
                  <Badge variant="outline">Caption Devices</Badge>
                )}
                {job.has_video_relay && (
                  <Badge variant="outline">Video Relay Services</Badge>
                )}
                {job.has_assistive_technology && (
                  <Badge variant="outline">Assistive Technology</Badge>
                )}
                {job.has_deaf_friendly_training && (
                  <Badge variant="outline">Deaf-Friendly Training</Badge>
                )}
                {job.is_remote_friendly && (
                  <Badge variant="outline">Remote Friendly</Badge>
                )}
              </div>
            </div>

            {job.workplace_accommodations && (
              <div>
                <h3 className="font-semibold mb-2">Additional Accommodations</h3>
                <p className="text-gray-700">{job.workplace_accommodations}</p>
              </div>
            )}

            {job.deaf_employee_support && (
              <div>
                <h3 className="font-semibold mb-2">Deaf Employee Support</h3>
                <p className="text-gray-700">{job.deaf_employee_support}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Job Details Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Requirements</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{job.requirements}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Summary Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Applications</CardTitle>
            <Button 
              variant="outline"
              onClick={() => router.push(`/employer/jobs/${params.id}/applications`)}
            >
              View All Applications
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-3xl font-bold mb-2">{job.applications_count}</p>
            <p className="text-gray-500">Total Applications</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}