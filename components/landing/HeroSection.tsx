/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";
import Button from "../Button";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section
      className="relative pt-20 pb-32 bg-gradient-to-b from-white to-gray-50"
      id="home"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f0fdf4_0%,_transparent_60%)] opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#f0fdf4_0%,_transparent_60%)] opacity-70" />

      <div className="relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left Column - Content */}
            <div className="lg:pr-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-green-50 text-green-600 ring-1 ring-green-100 animate-fadeIn">
                <Star className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">
                  Trusted by 10,000+ Top-Rated Freelancers
                </span>
              </div>

              {/* Main Headline */}
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 animate-fadeIn"
                style={{ animationDelay: "150ms" }}
              >
                <span className="block">Win More Jobs,</span>
                <span className="block text-green-600">Work & Stress Less</span>
              </h1>

              {/* Subheading */}
              <p
                className="text-xl text-gray-600 mb-8 max-w-2xl animate-fadeIn"
                style={{ animationDelay: "200ms" }}
              >
                Unlike generic freelance tools, UpHero uses AI to optimize your
                Upwork profile, craft winning proposals, and help you stand out.
                Get more client invites and higher response rates, guaranteed.
              </p>

              {/* Call-to-Action Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 sm:items-center mb-8 animate-fadeIn"
                style={{ animationDelay: "250ms" }}
              >
                <Link href="/signin/signup">
                  <Button
                    variant="primary"
                    size="lg"
                    className="group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
                <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                    14-day free trial
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                    No credit card required
                  </span>
                </div>
              </div>

              {/* Before/After Comparison */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 animate-fadeIn"
                style={{ animationDelay: "300ms" }}
              >
                <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                  <h3 className="text-red-800 font-semibold mb-3">
                    Before UpHero
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-red-700 text-sm">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                      5% proposal response rate
                    </li>
                    <li className="flex items-center text-red-700 text-sm">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                      2+ hours per proposal
                    </li>
                    <li className="flex items-center text-red-700 text-sm">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                      Buried in search results
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h3 className="text-green-800 font-semibold mb-3">
                    With UpHero
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-green-700 text-sm">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      35% proposal response rate
                    </li>
                    <li className="flex items-center text-green-700 text-sm">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      15 minutes per proposal
                    </li>
                    <li className="flex items-center text-green-700 text-sm">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      Top 3 search rankings
                    </li>
                  </ul>
                </div>
              </div>

              {/* Quick Stats */}
              <div
                className="grid grid-cols-3 gap-4 animate-fadeIn"
                style={{ animationDelay: "350ms" }}
              >
                <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                  <TrendingUp className="w-5 h-5 text-green-600 mb-2" />
                  <div className="text-2xl font-bold text-gray-900">4x</div>
                  <div className="text-sm text-gray-600">More Invites</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                  <Clock className="w-5 h-5 text-green-600 mb-2" />
                  <div className="text-2xl font-bold text-gray-900">75%</div>
                  <div className="text-sm text-gray-600">Time Saved</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                  <Award className="w-5 h-5 text-green-600 mb-2" />
                  <div className="text-2xl font-bold text-gray-900">85%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div
              className="mt-12 lg:mt-0 animate-fadeIn"
              style={{ animationDelay: "400ms" }}
            >
              <div className="relative">
                {/* Main Image */}
                <div className="relative mx-auto rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Freelancer success"
                    className="w-full h-auto"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-600/10 to-transparent" />
                </div>

                {/* Floating Success Card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Response Rate
                      </p>
                      <p className="text-2xl font-bold text-green-600">+35%</p>
                    </div>
                  </div>
                </div>

                {/* Floating Review Card */}
                <div
                  className="absolute -top-6 -right-6 bg-white rounded-lg shadow-xl p-4 animate-float"
                  style={{ animationDelay: "200ms" }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    &quot;Doubled my income in 3 months!&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
