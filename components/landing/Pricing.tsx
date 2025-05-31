"use client";

import React, { useState, useEffect } from "react";
import { Clock, Check, ArrowRight } from "lucide-react";
import Button from "../Button";
import Link from "next/link";

/**
 * Description placeholder
 *
 * @interface PlanProps
 * @typedef {PlanProps}
 */
interface PlanProps {
  /**
 * Description placeholder
 *
 * @type {string}
 */
name: string;
  /**
 * Description placeholder
 *
 * @type {number}
 */
price: number;
  /**
 * Description placeholder
 *
 * @type {string}
 */
description: string;
  /**
 * Description placeholder
 *
 * @type {string[]}
 */
features: string[];
  /**
 * Description placeholder
 *
 * @type {?boolean}
 */
isPopular?: boolean;
  /**
 * Description placeholder
 *
 * @type {?boolean}
 */
hasTrial?: boolean;
  /**
 * Description placeholder
 *
 * @type {?number}
 */
originalPrice?: number;
}

/**
 * Description placeholder
 *
 * @param {PlanProps} param0 
 * @param {string} param0.name 
 * @param {number} param0.price 
 * @param {string} param0.description 
 * @param {{}} param0.features 
 * @param {boolean} param0.isPopular 
 * @param {boolean} param0.hasTrial 
 * @param {number} param0.originalPrice 
 * @returns {*} 
 */
const Plan = ({
  name,
  price,
  description,
  features,
  isPopular,
  hasTrial,
  originalPrice,
}: PlanProps) => (
  <div
    className={`relative p-6 bg-white rounded-xl border-2 ${
      isPopular ? "border-green-600" : "border-gray-200"
    } hover:shadow-xl transition-all duration-300`}
  >
    {isPopular && (
      <div className="absolute -top-3 right-6 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
        Most Popular
      </div>
    )}
    {hasTrial && (
      <div className="absolute -top-3 left-6 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
        14-Day Free Trial
      </div>
    )}
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-bold text-gray-900">{name}</h3>
      <div className="text-right">
        {originalPrice && (
          <span className="text-sm text-gray-500 line-through mr-2">
            ${originalPrice}
          </span>
        )}
        <span className="text-2xl font-bold text-gray-900">${price}</span>
        <span className="text-gray-500 ml-1">/month</span>
      </div>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <ul className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-sm text-gray-600">
          <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
          {feature}
        </li>
      ))}
    </ul>
    <Link href="/signin/signup">
      <Button
        variant={isPopular ? "primary" : "secondary"}
        size="lg"
        className="w-full group"
      >
        Get Started
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </Link>
  </div>
);

/**
 * Description placeholder
 *
 * @returns {*} 
 */
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center space-x-4 text-center">
      <div>
        <div className="text-2xl font-bold text-gray-900">{timeLeft.days}</div>
        <div className="text-sm text-gray-500">Days</div>
      </div>
      <div className="text-2xl font-bold text-gray-900">:</div>
      <div>
        <div className="text-2xl font-bold text-gray-900">
          {timeLeft.hours.toString().padStart(2, "0")}
        </div>
        <div className="text-sm text-gray-500">Hours</div>
      </div>
      <div className="text-2xl font-bold text-gray-900">:</div>
      <div>
        <div className="text-2xl font-bold text-gray-900">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </div>
        <div className="text-sm text-gray-500">Minutes</div>
      </div>
      <div className="text-2xl font-bold text-gray-900">:</div>
      <div>
        <div className="text-2xl font-bold text-gray-900">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </div>
        <div className="text-sm text-gray-500">Seconds</div>
      </div>
    </div>
  );
};

/**
 * Description placeholder
 *
 * @returns {*} 
 */
export const Pricing = () => {
  const plans = [
    {
      name: "Freelancer",
      price: 12,
      originalPrice: 24,
      description: "Great for getting started. Includes 14-day free trial.",
      features: [
        "10 Profile Analyses",
        "50 Proposals / Month",
        "20 ATS Scans / Month",
        "10 Cover Letters / Month",
        "50 Client Responses / Month",
        "Personalized Training",
        "Email Support",
        "Community Access",
      ],
      hasTrial: true,
    },
    {
      name: "Freelancer Pro",
      price: 25,
      originalPrice: 50,
      description: "Best for growing freelancers",
      features: [
        "50 Profile Analyses",
        "250 Proposals / Month",
        "100 ATS Scans / Month",
        "50 Cover Letters / Month",
        "100 Client Responses / Month",
        "Personalized Training",
        "Priority Support",
        "Exclusive Community",
      ],
      isPopular: true,
    },
    {
      name: "Freelancer Agency",
      price: 58,
      originalPrice: 116,
      description: "Perfect for agencies",
      features: [
        "100 Profile Analyses",
        "1500 Proposals / Month",
        "500 ATS Scans / Month",
        "200 Cover Letters / Month",
        "200 Client Responses / Month",
        "Personalized Training",
        "1-on-1 Support",
        "Elite Community",
      ],
    },
  ];

  return (
    <section
      className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      id="pricing"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-green-50 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-green-50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm mb-4">
            <Clock className="w-4 h-4 mr-2" />
            Limited Time Offer - Save 50% on all plans
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Success Path
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Select the plan that fits your needs
          </p>
          <CountdownTimer />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan, index) => (
            <Plan key={index} {...plan} />
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Prices will increase when the timer hits zero. Lock in your discount
            now!
          </p>
        </div>
      </div>
    </section>
  );
};
