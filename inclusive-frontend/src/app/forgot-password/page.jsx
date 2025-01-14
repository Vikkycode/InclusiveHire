'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import axios from '@/lib/axios';

export default function ForgotPassword() {
  const [status, setStatus] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(resetPasswordSchema)
  });

  const onSubmit = async (data) => {
    try {
      await axios.post('/auth/forgot-password/', data);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Card className="w-[400px]" role="main" aria-labelledby="reset-title">
        <CardHeader>
          <h1 id="reset-title" className="text-2xl font-bold text-center">
            Reset Password
          </h1>
        </CardHeader>
        <CardContent>
          {status === 'success' && (
            <Alert className="mb-4" role="alert">
              If an account exists with that email, you will receive password reset instructions.
            </Alert>
          )}
          {status === 'error' && (
            <Alert variant="destructive" className="mb-4" role="alert">
              Something went wrong. Please try again.
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span id="email-error" className="text-red-500 text-sm" role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}