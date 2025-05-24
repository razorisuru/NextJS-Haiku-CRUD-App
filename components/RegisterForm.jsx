"use client";

import { useFormState } from "react-dom";
import { register } from "@/actions/userController";

export default function RegisterForm() {
  const [state, formAction] = useFormState(register, {});

  // console.log(state);

  return (
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
        Create Account
      </button>
    </form>
  );
}
