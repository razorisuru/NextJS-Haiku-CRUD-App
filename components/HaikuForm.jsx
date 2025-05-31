"use client";

import { useState } from "react"
import { createHaiku, editHaiku } from "@/actions/haikuController";
import { useFormState } from "react-dom";
import { CldUploadWidget } from "next-cloudinary";

export default function HaikuForm(props) {
  const [signature, setSignature] = useState("");
  const [public_id, setPublic_id] = useState("");
  const [version, setVersion] = useState("");

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

        <div className="mb-3">
          <CldUploadWidget
            onSuccess={(result, { widget }) => {
              console.log(result?.info);
              setSignature(result?.info.signature);
              setPublic_id(result?.info.public_id);
              setVersion(result?.info.version);
            }}
            onQueuesEnd={(result, { widget }) => {
              widget.close();
            }}
            signatureEndpoint="/widget-signature"
          >
            {({ open }) => {
              function handleClick(e) {
                e.preventDefault();
                open();
              }

              return (
                <button className="btn btn-secondary" onClick={handleClick}>
                  Upload an Image
                </button>
              );
            }}
          </CldUploadWidget>
        </div>

        <input type="hidden" name="public_id" value={public_id} />
        <input type="hidden" name="version" value={version} />
        <input type="hidden" name="signature" value={signature} />

        <input
          type="hidden"
          name="haikuId"
          defaultValue={props.haiku?._id.toString()}
        />
        <button type="submit" className="btn btn-primary">
          {buttonName}
        </button>
      </form>
    </>
  );
}
