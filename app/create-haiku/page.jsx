"use client"

import { useFormState } from "react-dom";
import { login } from "@/actions/userController";

export default function Page() {
    const [state, formAction] = useFormState(login, {});
  return (
    <>
    <h2 className="text-center text-2xl text-gray-500 mb-5">Create Haiku</h2>
      <form action={formAction} className="mx-auto max-w-xs">
        {state?.message && (
          <div className="alert alert-success mb-3">{state.message}</div>
        )}

        <div className="mb-3">
          <input
            autoComplete="off"
            name="username"
            type="text"
            placeholder="Username"
            className="input mb-2"
          />
          {state.error?.username && (
            <div role="alert" className="alert alert-error alert-soft">
              <span>{state.error.username}</span>
            </div>
          )}
        </div>
        <div className="mb-3">
          <input
            autoComplete="off"
            name="password"
            type="password"
            placeholder="Password"
            className="input mb-2"
          />
          {state.error?.password && (
            <div role="alert" className="alert alert-error alert-soft">
              <span>{state.error.password}</span>
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </>
  );
}
