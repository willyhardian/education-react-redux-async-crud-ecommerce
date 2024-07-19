import { useEffect, useState } from "react";
import { redirect, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import AlertMsg from "../components/AlertMsg";
export default function Login() {
    //"https://api.h8-fern.foxhub.space/login",
    // console.log(import.meta.env.VITE_BASE_URL, "< base url");
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    // const [searchParams] = useSearchParams();
    // const errorMsg = searchParams.get("errorMsg");
    // useEffect(() => {

    // }, [])

    function handleSubmit(e) {
        e.preventDefault();
        async function login() {
            try {
                setLoading(true);
                const response = await axios.post(
                    import.meta.env.VITE_BASE_URL + "/login",
                    {
                        email: form.email,
                        password: form.password,
                    }
                );
                const accessToken = response.data.access_token;
                localStorage.setItem("access_token", accessToken);
                navigate("/seller");
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        login();
    }

    function handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        setForm({
            ...form,
            [name]: value,
        });
    }

    function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        const googleToken = response.credential;
        try {
            setLoading(true);
            async function login() {
                const response = await axios.post(
                    import.meta.env.VITE_BASE_URL + "/google-login",
                    {
                        googleToken,
                        googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                    }
                );
                const accessToken = response.data.access_token;
                localStorage.setItem("access_token", accessToken);
                navigate("/seller");
            }
            login();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // from Google Developer Console
            callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" } // customization attributes
        );
        window.google.accounts.id.prompt(); // also display the One Tap dialog
    }, []);

    // const errorMsg = sessionStorage.getItem("errorMsg");
    return (
        <>
            {/* <AlertMsg errorMsg={errorMsg} alertType="alert-info" /> */}
            <AlertMsg alertType={"alert-info"} />

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                        <hr />
                        <div id="buttonDiv"></div>
                    </form>
                </div>
            </div>
        </>
    );
}
