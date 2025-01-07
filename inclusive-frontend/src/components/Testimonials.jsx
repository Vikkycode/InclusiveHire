import React from 'react';

const testimonials = [
  {
    quote: "InclusiveHire helped me find a job that values my abilities and supports my growth.",
    author: "Sarah Chen",
    role: "Software Developer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "We've built a more diverse and talented team thanks to InclusiveHire's platform.",
    author: "Michael Roberts",
    role: "HR Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

const Testimonials = () => (
  <div className="bg-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Success Stories
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.author} className="bg-gray-50 p-8 rounded-xl">
            <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
            <div className="flex items-center">
              <img
                src={testimonial.image}
                alt={testimonial.author}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-4">
                <p className="font-medium text-gray-900">{testimonial.author}</p>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Testimonials;