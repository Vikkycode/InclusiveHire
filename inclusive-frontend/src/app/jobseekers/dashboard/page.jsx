'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function JobSeekerDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch job applications
        const applicationsResponse = await axios.get('/api/jobs/applications/');
        setApplications(applicationsResponse.data);

        // Fetch recent job postings
        const jobsResponse = await axios.get('/api/jobs/recent/');
        setRecentJobs(jobsResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.username}!</h1>
        <p className="text-gray-600">Manage your job applications and discover new opportunities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Applications Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Your Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.length > 0 ? (
                applications.map((application) => (
                  <div
                    key={application.id}
                    className="p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <h3 className="font-semibold">{application.job.title}</h3>
                    <p className="text-sm text-gray-600">
                      Status: <span className="capitalize">{application.status}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Applied: {new Date(application.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No applications yet</p>
              )}
              <Button
                className="w-full"
                onClick={() => router.push('/jobs')}
              >
                Browse Jobs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Job Postings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Postings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/jobs/${job.id}`)}
                >
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <p className="text-sm text-gray-600">
                    Posted: {new Date(job.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push('/jobs')}
              >
                View All Jobs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}