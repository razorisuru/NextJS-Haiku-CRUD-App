import RegisterForm from "@/components/RegisterForm";
import { getUserFromCookie } from "@/lib/getUser";
import Dashboard from "@/components/Dashboard";

export default async function page() {
  const user = await getUserFromCookie();
  return (
    <>
      {user && <Dashboard user={user} />}
      {!user && (
        <>
          <p className="text-center mb-5 text-2xl text-amber-100">
            Dont have an account?
          </p>

          <RegisterForm />

          <div className="mx-auto max-w-xs mt-5">
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title font-semibold">
                How do I create an account?
              </div>
              <div className="collapse-content text-sm">
                Click the "Sign Up" button in the top right corner and follow
                the registration process.
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title font-semibold">
                I forgot my password. What should I do?
              </div>
              <div className="collapse-content text-sm">
                Click on "Forgot Password" on the login page and follow the
                instructions sent to your email.
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title font-semibold">
                How do I update my profile information?
              </div>
              <div className="collapse-content text-sm">
                Go to "My Account" settings and select "Edit Profile" to make
                changes.
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
