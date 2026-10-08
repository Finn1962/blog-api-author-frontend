import { useState } from "react";
import RichTextEditor from "../Components/RichTextEditor.jsx";

function PostEditorPage() {
  const [textEditorValue, setTextEditorValue] = useState("");

  return (
    <div className="flex flex-col items-center justify-start xl:px-10 px-5 ">
      <div className="pt-5 pb-10 flex justify-center flex-col w-full max-w-5xl gap-5 ">
        <div className="flex items-start justify-between bg-base-100 p-3 rounded-md shadow-sm">
          <button className="btn btn btn-soft">← Discard</button>
          <div className="flex justify-center items-center gap-5">
            <button className="btn bg-base-100 font-normal border-base-300">
              Show preview
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
            </button>
            <select
              defaultValue="Draft"
              className="select font-normal border-base-300"
            >
              <option>Draft</option>
              <option>Public</option>
            </select>
            <button className="btn btn-success">Save</button>
          </div>
        </div>

        <div className="bg-base-100 p-3 rounded-md shadow-sm flex flex-col gap-3 pb-5">
          <fieldset className="fieldset">
            <legend className="fieldset-legend ">Title</legend>
            <input
              type="text"
              className="input "
              placeholder="My awesome Post"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Content</legend>
            <RichTextEditor
              textEditorValue={textEditorValue}
              setTextEditorValue={setTextEditorValue}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Image</legend>
            <input type="file" className="file-input" />
            <label className="label">Max size 2MB</label>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default PostEditorPage;
