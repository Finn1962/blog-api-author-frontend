import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";
import PageWrapper from "../Components/PageWrapper.jsx";
import ToggleSwitch from "../Components/ToggleSwitch.jsx";

const initialValues = {
  username: "",
  newPassword: "",
  confirmNewPassword: "",
  emailNotification: false,
  profileImage: null,
};

function ProfilePage() {
  const [roleValue, setRoleValue] = useState("");
  const [createdAtValue, setCreatedAtValue] = useState(null);
  const [usernameValue, setUsernameValue] = useState("");
  const [currentPasswordValue, setCurrentPasswordValue] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [confirmNewPasswordValue, setConfirmNewPasswordValue] = useState("");
  const [emailNotificationValue, setEmailNotificationValue] = useState(false);
  const [profileImageValue, setProfileImageValue] = useState(null);

  const navigate = useNavigate();

  const { fetchData } = useFetch();

  const profileImageRef = useRef(null);

  const imageSrc = profileImageValue
    ? URL.createObjectURL(profileImageValue)
    : null;

  function hasValuesChanged() {
    if (
      initialValues.username !== usernameValue ||
      initialValues.newPassword !== newPasswordValue ||
      initialValues.confirmNewPassword !== confirmNewPasswordValue ||
      initialValues.emailNotification !== emailNotificationValue ||
      initialValues.profileImage !== profileImageValue
    ) {
      return true;
    } else {
      return false;
    }
  }

  function fetchProfileData() {
    const formData = new FormData();
    formData.append("username", usernameValue);
    formData.append("currentPassword", currentPasswordValue);
    formData.append("newPassword", newPasswordValue);
    formData.append("confirmNewPassword", confirmNewPasswordValue);
    formData.append("emailNotification", emailNotificationValue);
    formData.append("profileImage", profileImageValue);

    fetchData({
      url: "http://localhost:3000/profile",
      method: "PUT",
      body: formData,
      stringifyBody: false,
      callback: (result) => {
        console.log(result);
      },
    });
  }

  useEffect(() => {
    fetchData({
      url: "http://localhost:3000/profile",
      callback: async (result) => {
        const { userData } = result;
        setRoleValue(
          userData.role.charAt(0).toUpperCase() +
            userData.role.slice(1).toLowerCase(),
        );
        setUsernameValue(userData.username);
        initialValues.username = userData.username;
        setEmailNotificationValue(userData.email_notifications);
        initialValues.emailNotification = userData.email_notifications;
        setCreatedAtValue(
          new Date(userData.created_at).toLocaleDateString("de-DE"),
        );

        if (userData.profile_image_path) {
          try {
            const response = await fetch(userData.post.profile_image_path);
            const blob = await response.blob();
            const file = new File(
              [blob],
              userData.post.image_path || "image.jpg",
              {
                type: blob.type,
              },
            );
            setProfileImageValue(file);
            initialValues.profileImage = file;
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
                <p className="text-sm opacity-50">
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
                    disabled={hasValuesChanged() ? false : true}
                    onClick={fetchProfileData}
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
