import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../Components/PageWrapper.jsx";
import ToggleSwitch from "../Components/ToggleSwitch.jsx";

function ProfilePage() {
  const [profileImageValue, setProfileImageValue] = useState(null);

  const navigate = useNavigate();

  const profileImageRef = useRef(null);

  const imageSrc = profileImageValue
    ? URL.createObjectURL(profileImageValue)
    : null;

  return (
    <PageWrapper>
      <div className="w-full max-w-5xl bg-base-100">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost bg-base-100 border-none"
        >
          ← Back
        </button>
        <div className="p-3 pt-0">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <div className="z-10 w-full h-full flex justify-center items-center aspect-square overflow-hidden relative">
              <label
                htmlFor="profile_image"
                className="h-full absolute top-0 left-0 bottom-0 right-0 z-10 cursor-pointer hover:bg-secondary opacity-20 "
              ></label>
              <input
                className="hidden"
                type="file"
                ref={profileImageRef}
                onChange={(event) =>
                  setProfileImageValue(event.target.files[0])
                }
                id="profile_image"
              />
              {imageSrc ? (
                <img src={imageSrc} className="object-cover h-full w-full" />
              ) : (
                <div className="h-full bg-base-200 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-person-fill h-full opacity-20"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between items-start gap-4">
              <div className="flex justify-between items-center w-full">
                <p className="text-primary font-semibold">Admin</p>
                <p className="text-sm opacity-50">Member since: 20.12.2012</p>
              </div>
              <div className="w-full">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Username</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Max"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Password</legend>
                  <input
                    type="password"
                    className="input w-full"
                    placeholder="⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Confirm password</legend>
                  <input
                    type="password"
                    className="input w-full"
                    placeholder="⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅"
                  />
                </fieldset>
              </div>
              <div className="w-full">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Receive email notifications when new blog posts are
                    published.
                  </legend>
                  <ToggleSwitch />
                </fieldset>
              </div>
              <div className="w-full">
                <fieldset className="fieldset">
                  <button
                    className="btn btn-block btn-primary"
                    disabled="disabled"
                  >
                    block
                  </button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ProfilePage;
