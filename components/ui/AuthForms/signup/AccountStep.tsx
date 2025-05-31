/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useFormik } from "formik";
import { SignupFormData, signupValidationSchemas } from "@lib/validation";
import { Eye, EyeOff } from "lucide-react";
import Button from "../../../Button";
import Separator from "../Separator";

interface AccountStepProps {
  onNext: (data: Partial<SignupFormData>) => void;
  onBack?: () => void;
  initialData: {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
  };
  isLoading?: boolean;
  onGoogleSignIn?: () => void;
  error?: string | null;
}

export function AccountStep({
  onNext,
  initialData,
  isLoading = false,
  onGoogleSignIn,
  error,
}: AccountStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Common input styles
  const baseInputClass =
    "appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-upwork-gray-light focus:outline-none focus:ring-upwork-green focus:border-upwork-green";
  const getInputClass = (
    touched: boolean | undefined,
    errorMsg: string | undefined
  ) =>
    `${baseInputClass} border ${
      touched && errorMsg ? "border-red-300" : "border-upwork-gray-lighter"
    }`;

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: signupValidationSchemas.account,
    onSubmit: (values) => {
      onNext(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 animate-fade-down animate-once animate-duration-500"
    >
      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-upwork-gray"
        >
          Full Name
        </label>
        <div className="mt-1">
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            value={formik.values.fullName}
            onChange={(e) => {
              const capitalizedName = e.target.value
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase());
              formik.setFieldValue("fullName", capitalizedName);
            }}
            onBlur={formik.handleBlur}
            className={getInputClass(
              formik.touched.fullName,
              formik.errors.fullName
            )}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <p className="mt-2 text-sm text-red-600">
              {formik.errors.fullName}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-upwork-gray"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            {...formik.getFieldProps("email")}
            type="email"
            autoComplete="email"
            className={getInputClass(formik.touched.email, formik.errors.email)}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
          )}
        </div>
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-upwork-gray"
        >
          Password
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            {...formik.getFieldProps("password")}
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            className={`${getInputClass(
              formik.touched.password,
              formik.errors.password
            )} pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-upwork-gray-light hover:text-upwork-gray"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
          {formik.touched.password && formik.errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {formik.errors.password}
            </p>
          )}
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-upwork-gray"
        >
          Confirm Password
        </label>
        <div className="mt-1 relative">
          <input
            id="confirmPassword"
            {...formik.getFieldProps("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            className={`${getInputClass(
              formik.touched.confirmPassword,
              formik.errors.confirmPassword
            )} pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-upwork-gray-light hover:text-upwork-gray"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      {/* Next Button */}
      <Button
        type="submit"
        fullWidth
        className="w-full"
        loading={isLoading}
        disabled={isLoading || !formik.isValid || formik.isSubmitting}
      >
        {isLoading ? "Creating account..." : "Next"}
      </Button>

      {/* Divider */}
      <Separator text="Or continue with" />

      {/* Google Sign-In Button */}
      <button
        onClick={onGoogleSignIn}
        disabled={isLoading}
        type="button"
        className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
      >
        <img
          className="w-5 h-5 mr-2"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google logo"
        />
        Sign up with Google
      </button>
    </form>
  );
}
