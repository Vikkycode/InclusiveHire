'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      setError('Please log in to access the dashboard');
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        role="status"
        aria-label="Loading dashboard"
      >
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        role="alert"
      >
        <Card className="w-[400px]">
          <CardContent className="p-6">
            <p className="text-red-500">{error}</p>
            <Button 
              className="mt-4 w-full"
              onClick={() => window.location.href = '/login'}
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8" role="main" aria-label="Dashboard">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <section aria-labelledby="welcome-title">
          <Card>
            <CardHeader>
              <CardTitle id="welcome-title">
                Welcome, {user?.username}!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                You are logged in as a {user?.role.toLowerCase().replace('_', ' ')}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions */}
        <section 
          aria-labelledby="quick-actions-title"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <h2 id="quick-actions-title" className="sr-only">
            Quick Actions
          </h2>

          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                onClick={() => window.location.href = '/profile'}
                aria-label="Go to profile settings"
              >
                View Profile
              </Button>
            </CardContent>
          </Card>

          {/* Accessibility Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                onClick={() => window.location.href = '/accessibility'}
                aria-label="Manage accessibility preferences"
              >
                Manage Preferences
              </Button>
            </CardContent>
          </Card>

          {/* Logout Card */}
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    aria-label="Log out of your account"
                  >
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will log you out of your account. You will need to log in again to access your dashboard.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={logout}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </section>

        {/* Role-specific Content */}
        {user?.role === 'JOBSEEKER' && (
          <section aria-labelledby="jobseeker-section">
            <Card>
              <CardHeader>
                <CardTitle id="jobseeker-section">
                  Your Job Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    className="w-full"
                    onClick={() => window.location.href = '/jobs'}
                    aria-label="Browse available jobs"
                  >
                    Browse Jobs
                  </Button>
                  <Button 
                    className="w-full"
                    onClick={() => window.location.href = '/applications'}
                    aria-label="View your job applications"
                  >
                    My Applications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {user?.role === 'EMPLOYER' && (
          <section aria-labelledby="employer-section">
            <Card>
              <CardHeader>
                <CardTitle id="employer-section">
                  Job Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    className="w-full"
                    onClick={() => window.location.href = '/jobs/post'}
                    aria-label="Post a new job"
                  >
                    Post New Job
                  </Button>
                  <Button 
                    className="w-full"
                    onClick={() => window.location.href = '/jobs/manage'}
                    aria-label="Manage your posted jobs"
                  >
                    Manage Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </main>
  );
}