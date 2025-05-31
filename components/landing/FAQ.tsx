"use client";

import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none"
        onClick={onToggle}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-6 pr-12">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      question: "How does the AI-powered Proposal Generator work?",
      answer:
        "Our AI analyzes successful proposals and job requirements to help you create personalized, compelling proposals in minutes. It considers your experience, the job description, and proven proposal structures to maximize your chances of success. The system learns from thousands of winning proposals to ensure your applications stand out while maintaining your unique voice and expertise.",
    },
    {
      question: "Is my data secure with UpHero?",
      answer:
        "Absolutely! We take data security seriously. All your data is encrypted using industry-standard protocols, and we never share your personal information with third parties. We use secure AWS servers, implement regular security audits, and comply with GDPR requirements. Your proposals, profile information, and client communications are completely confidential.",
    },
    {
      question: "What's included in the 14-day free trial?",
      answer:
        "Your free trial includes full access to all UpHero features: Profile Analysis, Proposal Generator, ATS Optimizer, Cover Letter Generator, Client Message Assistant, and Personalized Training. You can generate up to 10 proposals, analyze your profile twice, and access all training modules. No credit card is required to start, and you can cancel anytime with no obligations.",
    },
    {
      question: "How fast can I expect to see results?",
      answer:
        "Most users see significant improvements within their first week of using UpHero. On average, our users report a 35% increase in proposal response rates and 4x more client invites within the first month. However, results can vary based on your niche, experience level, and how actively you apply the tools and training provided.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We provide comprehensive support through multiple channels: 24/7 email support with responses within 4 hours, live chat during business hours (9am-6pm EST), and priority support for Pro and Agency plans. Plus, our community forum gives you access to peer support and expert advice from successful freelancers.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes! You can cancel your subscription at any time with no questions asked. We offer a hassle-free cancellation process right from your dashboard. If you cancel during your free trial, you won't be charged anything. For paid subscriptions, you'll continue to have access until the end of your current billing period.",
    },
    {
      question: "Is UpHero only for Upwork?",
      answer:
        "While we specialize in Upwork optimization, many of our tools and strategies can be applied to other freelance platforms. However, our AI models and success metrics are specifically trained on Upwork data to ensure maximum effectiveness. We're constantly expanding our platform support based on user feedback.",
    },
    {
      question: "Do you offer a money-back guarantee?",
      answer:
        "Yes! We offer a 30-day money-back guarantee on all our plans. If you're not completely satisfied with UpHero within your first 30 days of paid subscription, we'll refund your payment in full. No complicated forms or questions asked - just email our support team.",
    },
    {
      question: "How often is the AI model updated?",
      answer:
        "Our AI models are continuously trained on the latest successful proposals and Upwork trends. We perform major updates monthly to incorporate new platform changes and successful strategies. This ensures our tools always reflect current best practices and Upwork's evolving requirements.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through Stripe, and we never store your payment information directly. For Agency plans, we also offer custom invoicing options.",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 px-4" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Got questions? We've got answers.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-200 px-6">
          {filteredFaqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openItems.includes(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Still have questions?{" "}
            <button className="text-green-600 font-medium hover:text-green-500">
              Contact our support team
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};
