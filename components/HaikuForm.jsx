"use client";

import { createHaiku, editHaiku } from "@/actions/haikuController";
import { useFormState } from "react-dom";

export default function HaikuForm(props) {
  let action, buttonName;
  if (props.action === "edit") {
    action = editHaiku;
    buttonName = "Update Haiku";
  }

  if (props.action === "create") {
    action = createHaiku;
    buttonName = "Create Haiku";
  }

  const [state, formAction] = useFormState(action, {});
  return (
    <>
      <form action={formAction} className="mx-auto max-w-xs">
        {state?.message && (
          <div className="alert alert-success mb-3">{state.message}</div>
        )}

        <div className="mb-3">
          <input
            autoComplete="off"
            name="line1"
            type="text"
            placeholder="Line #1"
            className="input mb-2"
            defaultValue={props.haiku?.line1}
          />
          {state.error?.line1 && (
            <div role="alert" className="alert alert-error alert-soft">
              <span>{state.error.line1}</span>
            </div>
          )}
        </div>
        <div className="mb-3">
          <input
            autoComplete="off"
            name="line2"
            type="text"
            placeholder="Line #2"
            className="input mb-2"
             defaultValue={props.haiku?.line2}
          />
          {state.error?.line2 && (
            <div role="alert" className="alert alert-error alert-soft">
              <span>{state.error.line2}</span>
            </div>
          )}
        </div>
        <div className="mb-3">
          <input
            autoComplete="off"
            name="line3"
            type="text"
            placeholder="Line #3"
            className="input mb-2"
             defaultValue={props.haiku?.line3}
          />
          {state.error?.line3 && (
            <div role="alert" className="alert alert-error alert-soft">
              <span>{state.error.line3}</span>
            </div>
          )}
        </div>
        <input type="hidden" name="haikuId" defaultValue={props.haiku?._id.toString()}/>
        <button type="submit" className="btn btn-primary">
          {buttonName}
        </button>
      </form>
    </>
  );
}
