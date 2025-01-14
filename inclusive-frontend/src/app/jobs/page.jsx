'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import axios from '@/lib/axios';

export default function JobListings() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    jobType: '',
    signLanguageEnvironment: '',
    hasInterpreters: false,
    isRemoteFriendly: false,
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.jobType) params.append('job_type', filters.jobType);
      if (filters.signLanguageEnvironment) {
        params.append('sign_language_environment', filters.signLanguageEnvironment);
      }
      if (filters.hasInterpreters) {
        params.append('has_sign_language_interpreters', 'true');
      }
      if (filters.isRemoteFriendly) {
        params.append('is_remote_friendly', 'true');
      }

      const response = await axios.get(`/api/jobs/?${params.toString()}`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Jobs</h1>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filter Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Search jobs..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />

            <Select
              value={filters.signLanguageEnvironment}
              onValueChange={(value) => setFilters({ ...filters, signLanguageEnvironment: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sign Language Environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DEAF_CENTRIC">Deaf-Centric Workplace</SelectItem>
                <SelectItem value="MIXED">Mixed Environment</SelectItem>
                <SelectItem value="INTERPRETERS">Interpreters Available</SelectItem>
                <SelectItem value="LEARNING">Sign Language Learning</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-4">
              <Checkbox
                id="interpreters"
                checked={filters.hasInterpreters}
                onCheckedChange={(checked) => 
                  setFilters({ ...filters, hasInterpreters: checked })}
              />
              <label htmlFor="interpreters">Has Interpreters</label>
            </div>

            <div className="flex items-center space-x-4">
              <Checkbox
                id="remote"
                checked={filters.isRemoteFriendly}
                onCheckedChange={(checked) => 
                  setFilters({ ...filters, isRemoteFriendly: checked })}
              />
              <label htmlFor="remote">Remote Friendly</label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings */}
      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

function JobCard({ job }) {
  const router = useRouter();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
            <p className="text-gray-600">{job.company_name}</p>
            <p className="text-gray-600">{job.location}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{job.salary_range}</p>
            <Badge variant={job.is_remote_friendly ? "success" : "secondary"}>
              {job.is_remote_friendly ? "Remote Friendly" : "On-site"}
            </Badge>
          </div>
        </div>

        {/* Accessibility Features */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Accessibility Features</h3>
          <div className="flex flex-wrap gap-2">
            {job.sign_language_environment && (
              <Badge variant="outline">
                {job.sign_language_environment.replace('_', ' ')}
              </Badge>
            )}
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

        <div className="mb-4">
          <p className="line-clamp-3">{job.description}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Badge>{job.job_type}</Badge>
            <Badge>{job.experience_level}</Badge>
          </div>
          <Button onClick={() => router.push(`/jobs/${job.id}`)}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}