import React from "react";
import {
  Users,
  FileText,
  Search,
  TrendingUp,
  Book,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Button from "../Button";
import Link from "next/link";

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
  benefits: string[];
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  benefits,
}: FeatureCardProps) => (
  <div className="animate-fadeIn bg-white p-8 rounded-xl border-2 border-gray-100 hover:border-green-500 transition-all duration-300 hover:shadow-xl group">
    <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
      <Icon className="w-7 h-7 text-green-600" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 mb-6 text-lg">{description}</p>
    <ul className="space-y-4">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <span className="text-gray-700">{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Profile Analysis",
      description:
        "Get a personalized roadmap to profile excellence with AI analysis",
      benefits: [
        "Rank higher in search results",
        "4x more client invites",
        "Stand out from competitors",
      ],
    },
    {
      icon: FileText,
      title: "Cover Letter Generator",
      description:
        "Create compelling cover letters that capture attention and win jobs",
      benefits: [
        "Save 2 hours per application",
        "Match client requirements perfectly",
        "Highlight your unique value",
      ],
    },
    {
      icon: Search,
      title: "ATS Optimizer",
      description:
        "Ensure your proposals pass through ATS systems and reach clients",
      benefits: [
        "35% higher response rate",
        "Perfect keyword optimization",
        "Beat automated filters",
      ],
    },
    {
      icon: TrendingUp,
      title: "Proposal Generator",
      description: "Generate winning proposals in minutes, not hours",
      benefits: [
        "Create proposals 5x faster",
        "Proven success templates",
        "Personalized to each job",
      ],
    },
    {
      icon: Book,
      title: "Client Messages",
      description:
        "Craft professional responses that build lasting relationships",
      benefits: [
        "Quick, professional replies",
        "Higher client satisfaction",
        "Better communication",
      ],
    },
    {
      icon: Star,
      title: "Personalized Training",
      description: "Access expert guidance tailored to your freelance journey",
      benefits: [
        "Step-by-step success path",
        "Industry-specific tips",
        "Regular strategy updates",
      ],
    },
  ];

  return (
    <section
      className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white"
      id="features"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 mr-2" />
            All-in-One Platform
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Complete Upwork Success Suite
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to analyze, optimize, and succeed on Upwork
          </p>
        </div>

        {/* How UpHero Works */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="bg-gradient-to-br from-green-50 to-white p-8 sm:p-12 rounded-2xl border border-green-100 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-10 text-center">
              How UpHero Works
            </h3>

            <div className="space-y-12">
              <div className="flex items-start gap-8">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-green-600">1</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Profile Optimization
                  </h4>
                  <p className="text-gray-600 text-lg">
                    Upload your profile and let our AI analyze and optimize it
                    for maximum visibility in Upwork search results.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-8">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Job-Specific Tools
                  </h4>
                  <p className="text-gray-600 text-lg">
                    Use our integrated tools to create perfect proposals, cover
                    letters, and client messages tailored to each opportunity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-8">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Continuous Improvement
                  </h4>
                  <p className="text-gray-600 text-lg">
                    Access personalized training and analytics to keep improving
                    your success rate and income over time.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/sigin/signup">
                <Button
                  variant="primary"
                  size="lg"
                  className="group text-lg px-8 py-4"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
