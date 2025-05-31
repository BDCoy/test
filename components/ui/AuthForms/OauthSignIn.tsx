/* eslint-disable @next/next/no-img-element */
"use client";

import { signInWithOAuth } from "@/utils/auth-helpers/client";
import { type Provider } from "@supabase/supabase-js";
import { useState } from "react";
import { Button } from "../Button";

type OAuthProviders = {
  name: Provider;
  displayName: string;
  icon: JSX.Element;
};

export default function OauthSignIn() {
  const oAuthProviders: OAuthProviders[] = [
    {
      name: "google",
      displayName: "Sign in with Google",
      icon: (
        <img
          className="w-5 h-5 mr-2"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google logo"
        />
      ),
    },
    /* Add desired OAuth providers here */
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await signInWithOAuth(e);
    setIsSubmitting(false);
  };

  return (
    <div className="mt-6">
      {oAuthProviders.map((provider) => (
        <form
          key={provider.name}
          className="pb-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input type="hidden" name="provider" value={provider.name} />
          <Button
            variant="outline"
            type="submit"
            loading={isSubmitting}
            className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <span className="mr-2">{provider.icon}</span>
            <span>{provider.displayName}</span>
          </Button>
        </form>
      ))}
    </div>
  );
}
