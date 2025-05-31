import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getAuthTypes,
  getViewTypes,
  getDefaultSignInView,
  getRedirectMethod,
} from '@/utils/auth-helpers/settings';
import { AuthLayout } from '@/components/AuthLayout';
import PasswordSignIn from '@/components/ui/AuthForms/PasswordSignIn';
import ForgotPassword from '@/components/ui/AuthForms/ForgotPassword';
import UpdatePassword from '@/components/ui/AuthForms/UpdatePassword';
import SignUp from '@/components/ui/AuthForms/Signup';

export default async function SignIn({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { disable_button: boolean };
}) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes();
  const redirectMethod = getRedirectMethod();

  let viewProp: string;

  if (typeof params.id === "string" && viewTypes.includes(params.id)) {
    viewProp = params.id;
  } else {
    const preferredSignInView = cookies().get('preferredSignInView')?.value || null;
    viewProp = getDefaultSignInView(preferredSignInView);
    return redirect(`/signin/${viewProp}`);
  }

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && viewProp !== "update_password" && viewProp !== "signup") {
    return redirect("/dashboard");
  } else if (!user && viewProp === "update_password") {
    return redirect("/signin");
  }

  return (
    <AuthLayout>
      {viewProp === "password_signin" && (
        <PasswordSignIn redirectMethod={redirectMethod} />
      )}

      {viewProp === "forgot_password" && (
        <ForgotPassword
          redirectMethod={redirectMethod}
          disableButton={searchParams.disable_button}
        />
      )}
      {viewProp === "update_password" && (
        <UpdatePassword redirectMethod={redirectMethod} />
      )}
      {viewProp === "signup" && <SignUp />}
    </AuthLayout>
  );
}