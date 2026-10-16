import { useConfirm } from "../Contexts/ConfirmContext.jsx";

function ConfirmForm() {
  const {
    isConfirmVisible,
    confirmText,
    alertText,
    confirmCallback,
    hideConfirm,
    typeOfAlert,
  } = useConfirm();

  return (
    <>
      {isConfirmVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10">
          <fieldset className="flex flex-col gap-5 z-10 bg-base-100 p-5 ">
            {typeOfAlert === "WARNING" && (
              <div role="alert" className="alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>{alertText}</span>
              </div>
            )}

            {typeOfAlert === "INFO" && (
              <div role="alert" className="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 shrink-0 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{alertText}</span>
              </div>
            )}

            <p>{confirmText}</p>
            <div className="flex flex-col gap-2">
              <button
                className="btn btn-error"
                onClick={() => {
                  confirmCallback();
                  hideConfirm();
                }}
              >
                Yes
              </button>
              <button className="btn  btn-outline" onClick={hideConfirm}>
                No
              </button>
            </div>
          </fieldset>

          <div className="absolute top-0 left-0 right-0 bottom-0 bg-neutral opacity-50"></div>
        </div>
      )}
    </>
  );
}

export default ConfirmForm;
