'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import axios from '@/lib/axios';

export default function JobDetail() {
  const params = useParams();
  const router = useRouter();
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
      console.error('Error fetching job:', error);
      router.push('/404')
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Button 
        variant="outline" 
        className="mb-4"
        onClick={() => router.back()}
      >
        Back to Jobs
      </Button>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl mb-2">{job.title}</CardTitle>
              <p className="text-xl text-gray-600">{job.company_name}</p>
              <p className="text-gray-600">{job.location}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-semibold mb-2">{job.salary_range}</p>
              <Badge variant={job.is_remote_friendly ? "success" : "secondary"}>
                {job.is_remote_friendly ? "Remote Friendly" : "On-site"}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Accessibility Features */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Accessibility Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Sign Language Environment:</h3>
                <Badge variant="outline" className="text-base">
                  {job.sign_language_environment.replace('_', ' ')}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Available Accommodations:</h3>
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
                    <Badge variant="outline">Video Relay</Badge>
                  )}
                  {job.has_assistive_technology && (
                    <Badge variant="outline">Assistive Technology</Badge>
                  )}
                </div>
              </div>
            </div>

            {job.workplace_accommodations && (
              <div className="mt-4">
                <h3 className="font-medium">Additional Accommodations:</h3>
                <p className="mt-2">{job.workplace_accommodations}</p>
              </div>
            )}

            {job.deaf_employee_support && (
              <div className="mt-4">
                <h3 className="font-medium">Deaf Employee Support:</h3>
                <p className="mt-2">{job.deaf_employee_support}</p>
              </div>
            )}
          </section>

          {/* Job Details */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Job Details</h2>
            <div className="prose max-w-none">
              <h3 className="font-medium">Description:</h3>
              <p className="mb-4">{job.description}</p>

              <h3 className="font-medium">Requirements:</h3>
              <p>{job.requirements}</p>
            </div>
          </section>

          {/* Apply Button */}
          <div className="flex justify-center pt-4">
            <Button size="lg" className="w-full md:w-auto">
              Apply for this Position
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}