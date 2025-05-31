/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating?: number;
  impact?: string;
}

const TestimonialCard = ({
  quote,
  author,
  role,
  avatar,
  rating = 5,
  impact,
}: TestimonialCardProps) => (
  <div className="animate-fadeIn bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
    <div className="flex space-x-1 mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-600 italic mb-4 text-lg">{quote}</p>
    {impact && (
      <p className="text-green-600 font-medium mb-6 text-sm">
        Impact: {impact}
      </p>
    )}
    <div className="flex items-center space-x-4">
      <img
        src={avatar}
        alt={author}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <div className="font-medium text-gray-900">{author}</div>
        <div className="text-gray-500 text-sm">{role}</div>
      </div>
    </div>
  </div>
);

export const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 3;

  const testimonials = [
    {
      quote:
        "UpHero transformed my freelancing career. The AI-powered proposals are a game-changer - I went from spending hours writing proposals to getting them done in minutes, with a 3x higher response rate!",
      author: "Jane D.",
      role: "Graphic Designer",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      impact: "Response rate increased from 12% to 35%",
    },
    {
      quote:
        "As a non-native English speaker, I always struggled with writing compelling proposals. UpHero's ATS optimization helped me rank higher in search results and land better clients. My income has doubled in just 3 months!",
      author: "John M.",
      role: "Web Developer",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      impact: "Monthly income increased by 105%",
    },
    {
      quote:
        "The profile analysis tool pointed out issues I never noticed. After implementing the suggestions, I started getting direct client invites almost daily. The stress of constantly hunting for projects is gone!",
      author: "Sarah K.",
      role: "Content Writer",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      impact: "Client invites increased by 400%",
    },
    {
      quote:
        "I was skeptical at first, but UpHero's personalized training modules helped me understand exactly what clients look for. Now I'm consistently landing long-term projects at higher rates.",
      author: "Michael R.",
      role: "Digital Marketing Specialist",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
      impact: "Average project value up by 80%",
    },
    {
      quote:
        "The cover letter generator is brilliant! It captures my voice while highlighting exactly what makes me perfect for each job. My work-life balance has improved dramatically now that I spend less time on proposals.",
      author: "Elena P.",
      role: "UX/UI Designer",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      impact: "Reduced proposal time by 75%",
    },
    {
      quote:
        "As a virtual assistant, I needed to stand out in a crowded market. UpHero helped me niche down and optimize my profile for specific services. The results were immediate and impressive!",
      author: "David L.",
      role: "Virtual Assistant",
      avatar:
        "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150",
      impact: "Hourly rate increased from $15 to $45",
    },
    {
      quote:
        "The client message templates have been invaluable for maintaining professional communication. My client satisfaction scores have never been higher, and I'm getting more repeat business than ever.",
      author: "Rachel H.",
      role: "Project Manager",
      avatar:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
      impact: "Client retention increased by 60%",
    },
    {
      quote:
        "UpHero's analytics helped me identify my most profitable project types and optimize my rates accordingly. I'm now earning more while being more selective about the projects I take on.",
      author: "Thomas W.",
      role: "Data Analyst",
      avatar:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
      impact: "Profit margin improved by 45%",
    },
    {
      quote:
        "The ATS optimization feature ensured my proposals were getting through to clients. Combined with the proposal generator, I've significantly reduced the time I spend on job applications while improving my success rate.",
      author: "Sofia M.",
      role: "SEO Specialist",
      avatar:
        "https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=150",
      impact: "Proposal success rate up by 85%",
    },
  ];

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const nextPage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${
        (currentPage * 100) / totalPages
      }%)`;
    }

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentPage]);

  useEffect(() => {
    const autoplayTimer = setInterval(() => {
      nextPage();
    }, 5000);

    return () => clearInterval(autoplayTimer);
  }, [currentPage]);

  return (
    <section
      className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white"
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 mr-2" />
            Over 10,000 Satisfied Users
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Real Results from Real Freelancers
          </h2>
          <p className="text-xl text-gray-600">
            See how UpHero is transforming freelance careers
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${totalPages * 100}%`,
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="flex-shrink-0 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  style={{ width: `${100 / totalPages}%` }}
                >
                  {testimonials
                    .slice(
                      pageIndex * itemsPerPage,
                      (pageIndex + 1) * itemsPerPage
                    )
                    .map((testimonial, index) => (
                      <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentPage === index
                    ? "bg-green-600 w-4"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
