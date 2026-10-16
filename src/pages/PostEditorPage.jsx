import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { useConfirm } from "../Contexts/ConfirmContext.jsx";
import { useFetch } from "../hooks/useFetch.js";

import PageWrapper from "../Components/PageWrapper.jsx";
import RichTextEditor from "../Components/RichTextEditor.jsx";

function PostEditorPage() {
  const location = useLocation();
  const {
    showConfirm,
    setConfirmText,
    setAlertText,
    setConfirmCallback,
    setTypeOfAlert,
  } = useConfirm();

  const navigate = useNavigate();
  const { fetchData } = useFetch();
  const { postId } = useParams();

  const [mode] = useState(() => {
    switch (true) {
      case location.pathname.includes("new"):
        return "new";
      case location.pathname.includes("edit"):
        return "edit";
    }
  });

  const [statusValue, setStatusValue] = useState("DRAFT");
  const [titleValue, setTitleValue] = useState("");
  const [textEditorValue, setTextEditorValue] = useState("");
  const [tagsValue, setTagsValue] = useState("");
  const [errors, setErrors] = useState([]);
  const [imageValue, setImageValue] = useState(null);
  const imageSrc = imageValue ? URL.createObjectURL(imageValue) : null;

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (mode !== "edit") return;
    fetchData({
      url: `http://localhost:3000/post/${postId}`,
      callback: async (result) => {
        setStatusValue(result.post.status);
        setTitleValue(result.post.title);
        setTextEditorValue(result.post.content);
        setTagsValue(result.post.tags.map((tag) => tag.content).join(", "));

        if (result.post.image_url) {
          try {
            const response = await fetch(result.post.image_url);
            const blob = await response.blob();
            const file = new File(
              [blob],
              result.post.image_path || "image.jpg",
              {
                type: blob.type,
              },
            );
            setImageValue(file);
            if (fileInputRef.current) {
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(file);
              fileInputRef.current.files = dataTransfer.files;
            }
          } catch (error) {
            console.error(error);
          }
        }
      },
    });
  }, []);

  function fetchNewPostData() {
    const formData = new FormData();
    formData.append("title", titleValue);
    formData.append("content", textEditorValue);
    formData.append("status", statusValue);
    formData.append("tags", tagsValue);
    if (imageValue !== "") formData.append("image", imageValue);

    fetchData({
      url: "http://localhost:3000/post",
      method: "POST",
      body: formData,
      stringifyBody: false,
      callback: (result) => {
        if (result.errors) setErrors(result.errors);
        else navigate("/");
      },
    });
  }

  function fetchUpdatedPostData() {
    const formData = new FormData();
    formData.append("title", titleValue);
    formData.append("content", textEditorValue);
    formData.append("status", statusValue);
    formData.append("tags", tagsValue);
    formData.append("id", postId);
    if (imageValue !== "") formData.append("image", imageValue);

    fetchData({
      url: "http://localhost:3000/post",
      method: "PUT",
      body: formData,
      stringifyBody: false,
      callback: (result) => {
        if (result.errors) setErrors(result.errors);
        else navigate("/");
      },
    });
  }

  return (
    <PageWrapper>
      <div className="pb-10 flex justify-center flex-col w-full max-w-5xl gap-5 ">
        <div className="flex items-start justify-between bg-base-100 p-3 shadow-sm">
          <button
            className="btn btn-outline font-normal border-base-300"
            onClick={() => {
              setAlertText("Discarded posts cannot be restored.");
              setConfirmText("Do you really want to discard the post?");
              setTypeOfAlert("INFO");
              setConfirmCallback(() => () => navigate("/"));
              showConfirm();
            }}
          >
            ← Discard
          </button>
          <div className="flex justify-center items-center gap-5">
            <button className="btn btn-outline font-normal border-base-300">
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
              className="select font-normal border-base-300"
              value={statusValue}
              onChange={(event) => setStatusValue(event.target.value)}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLIC">Public</option>
            </select>
            <button
              className="btn btn btn-primary"
              onClick={() => {
                if (mode === "new") fetchNewPostData();
                else fetchUpdatedPostData();
              }}
            >
              Save
            </button>
          </div>
        </div>

        <div className="bg-base-100 p-3 shadow-sm flex flex-col gap-5 pb-5">
          <fieldset className="fieldset">
            <legend className="fieldset-legend ">Title</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="My awesome Post"
              value={titleValue}
              onChange={(event) => setTitleValue(event.target.value)}
            />
            {errors.some((error) => error.msg === "Title cannot be empty") && (
              <p className="text-error font-semibold">Title cannot be empty</p>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Content</legend>
            <RichTextEditor
              textEditorValue={textEditorValue}
              setTextEditorValue={setTextEditorValue}
            />
            {errors.some(
              (error) => error.msg === "Content cannot be empty",
            ) && (
              <p className="text-error font-semibold">
                Content cannot be empty
              </p>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend pt-0 pb-2">Image</legend>
            <input
              type="file"
              className="file-input w-full mb-1"
              onChange={(event) => setImageValue(event.target.files[0])}
              ref={fileInputRef}
            />
            {imageSrc && (
              <div className="w-full max-w-100 border rounded-lg border-base-300 mb-1 relative min-h-25">
                <button
                  className="btn btn-circle boder-base-100 p-2 w-10 absolute right-1 top-1"
                  onClick={() => {
                    setImageValue(null);
                    fileInputRef.current.value = null;
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-x w-full opacity-75"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                  </svg>
                </button>
                <img
                  src={imageSrc}
                  className="object-cover w-full max-h-150 rounded-lg "
                />
              </div>
            )}
            {errors.some((error) => error.msg === "Image is too large") && (
              <p className="text-error font-semibold ">Image is too large</p>
            )}
            {errors.some(
              (error) => error.msg === "Only image files are allowed",
            ) && (
              <p className="text-error font-semibold ">
                Only image files are allowed
              </p>
            )}
            <label className="label">Max size 2MB</label>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Tags</legend>
            <textarea
              className="textarea h-24 w-full"
              placeholder=""
              value={tagsValue}
              onChange={(event) => setTagsValue(event.target.value)}
            ></textarea>
            <div className="label">Separate tags with a comma</div>
          </fieldset>
        </div>
      </div>
    </PageWrapper>
  );
}

export default PostEditorPage;
