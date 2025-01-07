import React from 'react';

const stats = [
  { label: 'Job Seekers Placed', value: '2,000+' },
  { label: 'Partner Companies', value: '500+' },
  { label: 'Success Rate', value: '85%' },
  { label: 'Countries Reached', value: '25+' }
];

const Stats = () => (
  <div className="bg-indigo-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-3xl font-bold text-indigo-600">{value}</p>
            <p className="mt-2 text-sm text-gray-600">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Stats;