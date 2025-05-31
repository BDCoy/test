/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import Button from '../Button';
import Link from 'next/link';

export const CTASection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50" id="cta">
      <div className="max-w-4xl mx-auto text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-6">
          <Star className="w-4 h-4 mr-2" />
          Join 10,000+ successful freelancers
        </div>

        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Start Winning More Clients Today
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Don&apos;t let another day of missed opportunities pass. Transform your Upwork success story with our AI-powered tools.
        </p>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { stat: '35%', label: 'Higher Response Rate' },
            { stat: '4x', label: 'More Client Invites' },
            { stat: '2hrs', label: 'Saved Per Proposal' }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-1">{item.stat}</div>
              <div className="text-sm text-gray-600">{item.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <Link href="/signin/signup">
            <Button variant="primary" size="lg" className="group">
              Start Your Free 14-Day Trial
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          {/* Trust Points */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600">
            {[
              'No credit card required',
              'Cancel anytime',
              '30-day money-back guarantee'
            ].map((point, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                {point}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-12 bg-white p-8 rounded-xl border border-gray-100 max-w-2xl mx-auto">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-lg text-gray-600 italic mb-4">
            "UpHero transformed my freelancing career. I went from struggling to find clients to having a consistent stream of high-paying projects. Best investment I've made in my business!"
          </p>
          <div className="flex items-center justify-center gap-3">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
              alt="Michael R."
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-left">
              <div className="font-medium text-gray-900">Michael R.</div>
              <div className="text-sm text-gray-500">Digital Marketing Specialist</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};