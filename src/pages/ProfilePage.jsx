import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";
import { useLoader } from "../Contexts/LoaderContext.jsx";
import Loader from "../Components/Loader.jsx";
import PageWrapper from "../Components/PageWrapper.jsx";
import ToggleSwitch from "../Components/ToggleSwitch.jsx";

function ProfilePage() {
  const [roleValue, setRoleValue] = useState("");
  const [createdAtValue, setCreatedAtValue] = useState(null);
  const [usernameValue, setUsernameValue] = useState("");
  const [currentPasswordValue, setCurrentPasswordValue] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [confirmNewPasswordValue, setConfirmNewPasswordValue] = useState("");
  const [emailNotificationValue, setEmailNotificationValue] = useState(false);
  const [profileImageValue, setProfileImageValue] = useState(null);
  const [errors, setErrors] = useState([]);
  const [hasValuesChanged] = useState(true);

  const navigate = useNavigate();

  const { fetchData } = useFetch();
  const { setLoadingTrue, setLoadingFalse } = useLoader();

  const profileImageRef = useRef(null);

  const imageSrc = profileImageValue
    ? URL.createObjectURL(profileImageValue)
    : null;

  useEffect(() => {
    fetchData({
      url: "http://localhost:3000/profile",
      setLoadingTrue,
      setLoadingFalse,
      callback: async (result) => {
        const { userData } = result;
        setRoleValue(
          userData.role.charAt(0).toUpperCase() +
            userData.role.slice(1).toLowerCase(),
        );
        setUsernameValue(userData.username);
        setEmailNotificationValue(userData.email_notifications);
        setCreatedAtValue(
          new Date(userData.created_at).toLocaleDateString("de-DE"),
        );

        if (userData.profile_image_url) {
          try {
            const response = await fetch(userData.profile_image_url);
            const blob = await response.blob();
            const file = new File(
              [blob],
              userData.profile_image_url || "image.jpg",
              {
                type: blob.type,
              },
            );

            setProfileImageValue(file);
            if (profileImageRef.current) {
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(file);
              profileImageRef.current.files = dataTransfer.files;
            }
          } catch (error) {
            console.error(error);
          }
        }
      },
    });
  }, []);

  function uploadProfileData() {
    const formData = new FormData();
    formData.append("username", usernameValue);
    formData.append("currentPassword", currentPasswordValue);
    formData.append("newPassword", newPasswordValue);
    formData.append("confirmNewPassword", confirmNewPasswordValue);
    formData.append("emailNotifications", emailNotificationValue);
    formData.append("image", profileImageValue);

    fetchData({
      url: "http://localhost:3000/profile",
      method: "PUT",
      body: formData,
      stringifyBody: false,
      callback: (result) => {
        if (result.message === "User data successfully changed") {
          setCurrentPasswordValue("");
          setNewPasswordValue("");
          setConfirmNewPasswordValue("");
        }
        if (result.errors) setErrors(result.errors);
        else setErrors([]);
      },
    });
  }

  return (
    <PageWrapper>
      <Loader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100" />
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
              {imageSrc && (
                <button
                  className="btn btn-circle boder-base-100 p-2 w-10 absolute right-1 top-1 z-20"
                  onClick={() => {
                    setProfileImageValue(null);
                    profileImageRef.current.value = null;
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
              )}
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
                <p className="text-primary font-semibold">{roleValue}</p>
                <p className="text-xs opacity-35">
                  Member since: {createdAtValue}
                </p>
              </div>
              <div className="w-full">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Username</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Max"
                    value={usernameValue}
                    onChange={(event) => setUsernameValue(event.target.value)}
                  />
                  {errors.some(
                    (error) => error.msg === "Username is required",
                  ) && (
                    <p className="text-error font-semibold">
                      Username is required
                    </p>
                  )}
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Current password</legend>
                  <input
                    type="password"
                    className="input w-full"
                    placeholder="⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅"
                    value={currentPasswordValue}
                    onChange={(event) =>
                      setCurrentPasswordValue(event.target.value)
                    }
                  />
                  {errors.some(
                    (error) => error.msg === "Current passwords is required",
                  ) && (
                    <p className="text-error font-semibold">
                      Current passwords is required
                    </p>
                  )}
                  {errors.some((error) => error.msg === "Wrong password") && (
                    <p className="text-error font-semibold">Wrong password</p>
                  )}
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">New password</legend>
                  <input
                    type="password"
                    className="input w-full"
                    placeholder="⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅"
                    value={newPasswordValue}
                    onChange={(event) =>
                      setNewPasswordValue(event.target.value)
                    }
                  />

                  {errors.some(
                    (error) => error.msg === "New password is required",
                  ) && (
                    <p className="text-error font-semibold">
                      New password is required
                    </p>
                  )}
                  {errors.some(
                    (error) =>
                      error.msg ===
                      "New password must be between 8 and 32 characters",
                  ) && (
                    <p className="text-error font-semibold">
                      New password must be between 8 and 32 characters
                    </p>
                  )}
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Confirm new password
                  </legend>
                  <input
                    type="password"
                    className="input w-full"
                    placeholder="⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅"
                    value={confirmNewPasswordValue}
                    onChange={(event) =>
                      setConfirmNewPasswordValue(event.target.value)
                    }
                  />
                  {errors.some(
                    (error) => error.msg === "New password must be confirmed",
                  ) && (
                    <p className="text-error font-semibold">
                      New password must be confirmed
                    </p>
                  )}
                  {errors.some(
                    (error) => error.msg === "New password must match",
                  ) && (
                    <p className="text-error font-semibold">
                      New password must match
                    </p>
                  )}
                </fieldset>
              </div>
              <div className="w-full">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Receive email notifications when new posts are published.
                  </legend>
                  <ToggleSwitch
                    emailNotificationValue={emailNotificationValue}
                    setEmailNotificationValue={setEmailNotificationValue}
                  />
                </fieldset>
              </div>
              <div className="w-full">
                <fieldset className="fieldset">
                  <button
                    className="btn btn-block btn-primary"
                    disabled={hasValuesChanged ? false : true}
                    onClick={uploadProfileData}
                  >
                    Save changes
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
