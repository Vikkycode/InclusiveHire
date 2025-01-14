'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function PostSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after 5 seconds
    const timeout = setTimeout(() => {
      router.push('/employer/dashboard');
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="container mx-auto py-16">
      <Card className="max-w-2xl mx-auto text-center">
        <CardContent className="py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">Job Posted Successfully!</h1>
          <p className="text-gray-600 mb-8">
            Your job listing has been created and is now live.
          </p>
          <div className="space-x-4">
            <Button 
              variant="outline" 
              onClick={() => router.push('/employer/dashboard')}
            >
              Go to Dashboard
            </Button>
            <Button 
              onClick={() => router.push('/employer/jobs/post')}
            >
              Post Another Job
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}