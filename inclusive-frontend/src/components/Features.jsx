import React from 'react';
import { Users, Building2, Heart } from 'lucide-react';

const Features = () => {
  const features = [
    {
      name: 'For Job Seekers',
      description: 'Access inclusive job opportunities, free resources, and support services tailored to your needs.',
      icon: Users,
    },
    {
      name: 'For Employers',
      description: 'Connect with diverse talent and get expert guidance on creating inclusive workplaces.',
      icon: Building2,
    },
    {
      name: 'Social Impact',
      description: 'Join our mission to create a more inclusive workforce through our hybrid business model.',
      icon: Heart,
    },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Platform</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to connect
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            InclusiveHire combines social impact with business sustainability to create meaningful employment opportunities.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;