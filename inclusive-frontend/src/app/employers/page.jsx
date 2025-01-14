'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import axios from '@/lib/axios';

export default function EmployerDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
  });

  useEffect(() => {
    if (!user || user.role !== 'EMPLOYER') {
      router.push('/login');
      return;
    }
    fetchEmployerData();
  }, [user]);

  const fetchEmployerData = async () => {
    try {
      // Fetch employer's posted jobs
      const jobsResponse = await axios.get('/api/jobs/employer/');
      setJobs(jobsResponse.data);

      // Fetch employer stats
      const statsResponse = await axios.get('/api/jobs/employer/stats/');
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Error fetching employer data:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>
        <Button onClick={() => router.push('/employers/jobs/post')}>
          Post New Job
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Jobs Posted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalJobs}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.activeJobs}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalApplications}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Job Postings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Posted Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>
                    {new Date(job.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      job.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {job.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>{job.applications_count}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => router.push(`/employers/jobs/${job.id}`)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => router.push(`/employers/jobs/${job.id}/edit`)}
                      >
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline"
              onClick={() => router.push('/employers/jobs/post')}>
              Post a New Job
            </Button>
            <Button className="w-full" variant="outline"
              onClick={() => router.push('/employers/applications')}>
              View All Applications
            </Button>
            <Button className="w-full" variant="outline"
              onClick={() => router.push('/employers/profile')}>
              Update Company Profile
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Help & Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/employers/guide" className="block hover:underline">
              Employer's Guide
            </Link>
            <Link href="/employers/faq" className="block hover:underline">
              Frequently Asked Questions
            </Link>
            <Link href="/contact" className="block hover:underline">
              Contact Support
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}