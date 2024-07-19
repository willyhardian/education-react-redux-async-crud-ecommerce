import React, { useEffect, useState } from "react";

// export default function AlertMsg({ errorMsg, alertType }) {
export default function AlertMsg({ alertType }) {
    const [error, setError] = useState();
    // const errorMsg = sessionStorage.getItem("errorMsg");
    // setError(errorMsg);
    // sessionStorage.removeItem("errorMsg");
    useEffect(() => {
        let errorMsg;
        errorMsg = sessionStorage.getItem("errorMsg");
        setError(errorMsg);
        setTimeout(() => {
            if (sessionStorage.getItem("errorMsg")) {
                sessionStorage.removeItem("errorMsg");
            }
        }, 3000);
    }, []);
    return (
        <>
            {error && (
                <div role="alert" className={`alert ${alertType} rounded-none`}>
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
                    <span>{error}</span>
                </div>
            )}
        </>
    );
}
