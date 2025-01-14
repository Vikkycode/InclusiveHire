'use client';

import * as React from 'react';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validations/auth';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const methods = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Card className="w-[400px]" role="main" aria-labelledby="login-title">
        <CardHeader>
          <h1 id="login-title" className="text-2xl font-bold text-center">Sign in</h1>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4" role="alert">
              {error}
            </Alert>
          )}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="email">
                  Email
                  {methods.formState.errors.email && (
                    <span className="text-red-500 ml-2" role="alert">
                      {methods.formState.errors.email.message}
                    </span>
                  )}
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...methods.register('email')}
                  aria-invalid={methods.formState.errors.email ? "true" : "false"}
                  aria-describedby={methods.formState.errors.email ? "email-error" : undefined}
                />
              </div>
              <div>
                <Label htmlFor="password">
                  Password
                  {methods.formState.errors.password && (
                    <span className="text-red-500 ml-2" role="alert">
                      {methods.formState.errors.password.message}
                    </span>
                  )}
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...methods.register('password')}
                  aria-invalid={methods.formState.errors.password ? "true" : "false"}
                  aria-describedby={methods.formState.errors.password ? "password-error" : undefined}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={methods.formState.isSubmitting}
                aria-busy={methods.formState.isSubmitting}
              >
                {methods.formState.isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </FormProvider>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Link 
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Forgot your password?
          </Link>
          <p className="text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link 
              href="/register" 
              className="text-blue-600 hover:text-blue-800"
            >
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}