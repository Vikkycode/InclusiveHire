'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function JobPreview() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobData = JSON.parse(searchParams.get('data') || '{}');

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Preview Job Posting</h1>
        <div className="space-x-4">
          <Button variant="outline" onClick={() => router.back()}>
            Edit
          </Button>
          <Button onClick={() => handleSubmit(jobData)}>
            Confirm & Post
          </Button>
        </div>
      </div>

      {/* Preview Cards */}
      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{jobData.title}</h2>
                <p className="text-gray-600">{jobData.location}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Job Type</p>
                  <p>{jobData.job_type}</p>
                </div>
                <div>
                  <p className="font-medium">Experience Level</p>
                  <p>{jobData.experience_level}</p>
                </div>
                <div>
                  <p className="font-medium">Salary Range</p>
                  <p>{jobData.salary_range}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Features */}
        <Card>
          <CardHeader>
            <CardTitle>Accessibility Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Work Environment</h3>
                <Badge variant="outline">
                  {jobData.sign_language_environment.replace('_', ' ')}
                </Badge>
                {jobData.is_remote_friendly && (
                  <Badge variant="outline" className="ml-2">
                    Remote Friendly
                  </Badge>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">Available Accommodations</h3>
                <div className="flex flex-wrap gap-2">
                  {/* Display selected accommodations */}
                  {Object.entries(jobData)
                    .filter(([key, value]) => key.startsWith('has_') && value)
                    .map(([key]) => (
                      <Badge key={key} variant="outline">
                        {key.replace('has_', '').replace(/_/g, ' ')}
                      </Badge>
                    ))}
                </div>
              </div>

              {jobData.workplace_accommodations && (
                <div>
                  <h3 className="font-medium mb-2">Additional Accommodations</h3>
                  <p className="text-gray-700">{jobData.workplace_accommodations}</p>
                </div>
              )}

              {jobData.deaf_employee_support && (
                <div>
                  <h3 className="font-medium mb-2">Deaf Employee Support</h3>
                  <p className="text-gray-700">{jobData.deaf_employee_support}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Job Description & Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Description & Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Job Description</h3>
                <p className="whitespace-pre-wrap">{jobData.description}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Requirements</h3>
                <p className="whitespace-pre-wrap">{jobData.requirements}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}