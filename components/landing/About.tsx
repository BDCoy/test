import React from "react";

import {
  Globe,
  Rocket,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Button from "../Button";
import Link from "next/link";

export const About = () => {
  return (
    <section className="py-12 sm:py-24 lg:py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4 mr-2" />
            Trusted by freelancers worldwide
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
            Empowering Freelancers to Excel
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of successful freelancers who've transformed their
            Upwork careers with UpHero
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="animate-fadeIn bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                <Users className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Global Community
                </h3>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-green-600">10,000+</p>
                  <p className="text-gray-600">
                    Active freelancers from 100+ countries
                  </p>
                </div>
              </div>
              <div className="animate-fadeIn bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-xl text-white hover:shadow-lg transition-all duration-300">
                <Rocket className="h-8 w-8 text-white mb-4" />
                <h3 className="text-lg font-semibold mb-2">Growth Rate</h3>
                <div className="space-y-2">
                  <p className="text-3xl font-bold">150%</p>
                  <p className="text-white/90">Year-over-year member growth</p>
                </div>
              </div>
            </div>
            <div className="space-y-6 sm:pt-12">
              <div className="animate-fadeIn bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                <Globe className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Platform Success
                </h3>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-green-600">4x</p>
                  <p className="text-gray-600">
                    Average increase in client invites
                  </p>
                </div>
              </div>
              <div className="animate-fadeIn bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-xl text-white hover:shadow-lg transition-all duration-300">
                <Award className="h-8 w-8 text-white mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Client Satisfaction
                </h3>
                <div className="space-y-2">
                  <p className="text-3xl font-bold">85%</p>
                  <p className="text-white/90">Average success rate</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pl-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Built by Freelancers, for Freelancers
                </h3>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                  Founded by successful freelancers and AI experts, UpHero
                  emerged from a simple truth: talented freelancers need better
                  tools to stand out in today's competitive market. We've
                  combined our expertise in freelancing success with
                  cutting-edge AI to create the ultimate Upwork optimization
                  platform.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Why Freelancers Choose UpHero:
                </h4>
                <ul className="space-y-3">
                  {[
                    "AI-powered tools specifically optimized for Upwork",
                    "Proven success framework used by top freelancers",
                    "Regular updates based on platform changes",
                    "Dedicated support from experienced freelancers",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Link href="/signin/signup">
                  <Button variant="primary" size="lg" className="group">
                    Start Your Success Journey
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <p className="mt-3 text-sm text-gray-500">
                  Join thousands of freelancers already succeeding with UpHero
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
