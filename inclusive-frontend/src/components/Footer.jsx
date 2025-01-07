import React from 'react';
import { Building2 } from 'lucide-react';

const Footer = () => (
  <footer className="bg-gray-50">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center mb-8">
        <Building2 className="h-8 w-8 text-indigo-600" />
        <span className="ml-2 text-xl font-bold text-gray-900">InclusiveHire</span>
      </div>
      <nav className="flex flex-wrap justify-center -mx-5 -my-2">
        {['About', 'Jobs', 'Employers', 'Resources', 'Contact', 'Privacy'].map((item) => (
          <div key={item} className="px-5 py-2">
            <a href={`#${item.toLowerCase()}`} className="text-gray-500 hover:text-gray-900">
              {item}
            </a>
          </div>
        ))}
      </nav>
      <p className="mt-8 text-center text-gray-400">&copy; 2024 InclusiveHire. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;