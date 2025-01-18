'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Briefcase, 
  Users, 
  FileText, 
  Settings, 
  X,
  Building2,
  GraduationCap,
  Shield
} from 'lucide-react';

const navigationConfig = {
  JOBSEEKER: [
    { name: 'Dashboard', href: '/jobseekers/dashboard', icon: Home },
    { name: 'Browse Jobs', href: '/jobs', icon: Briefcase },
    { name: 'My Applications', href: '/jobseekers/applications', icon: FileText },
    { name: 'Profile', href: '/jobseekers/profile', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ],
  EMPLOYER: [
    { name: 'Dashboard', href: '/employers/dashboard', icon: Home },
    { name: 'Post Job', href: '/employers/jobs/post', icon: FileText },
    { name: 'Manage Jobs', href: '/employers/jobs', icon: Briefcase },
    { name: 'Candidates', href: '/employers/candidates', icon: Users },
    { name: 'Company Profile', href: '/employers/profile', icon: Building2 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ],
  ADMIN: [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Jobs', href: '/admin/jobs', icon: Briefcase },
    { name: 'Companies', href: '/admin/companies', icon: Building2 },
    { name: 'Job Seekers', href: '/admin/jobseekers', icon: GraduationCap },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ],
};

export default function DashboardSidebar({ isOpen, setIsOpen, userRole }) {
  const router = useRouter();
  const navigation = navigationConfig[userRole] || [];

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          isOpen ? "block" : "hidden"
        )}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-gray-900/80"
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-white">
          <div className="flex h-full flex-col overflow-y-auto">
            <div className="flex h-16 items-center justify-between px-6">
              <span className="text-2xl font-bold">InclusiveHire</span>
              <button
                type="button"
                className="text-gray-500"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <Icon className="mr-3 h-6 w-6 flex-shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <div className="flex h-16 items-center">
            <span className="text-2xl font-bold">InclusiveHire</span>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                        >
                          <Icon className="h-6 w-6 shrink-0" />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}