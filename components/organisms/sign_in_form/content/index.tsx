import React, { Fragment, useRef, useState } from "react";
import Router from "next/router";
import { Dialog, Transition } from '@headlessui/react'

//component
import md5 from "md5";
import Cookies from "js-cookie";
import { useAuth } from "@/utils/auth";
// import Cbuttons from "@/components/atoms/button";

//content
import { setLogin } from "../services";

export default function SignInForm() {
    //state global
    const { login } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        codeCompany: "",
        username: "",
        password: "",
    });
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [messageError, setMessageError] = useState("");

    const userName = useRef("");
    const password = useRef("");
    const codeCompany = useRef("");

    const cancelButtonRef = useRef(null)

    const onSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();

        let isValid = true;
        const newErrors = {
            codeCompany: "",
            username: "",
            password: "",
        };

        //Validation
        if (codeCompany.current === "") {
            newErrors.codeCompany = "Kode Perusahaan harus diisi";
            isValid = false;
        }

        if (userName.current === "") {
            newErrors.username = "Username harus diisi";
            isValid = false;
        }

        if (password.current === "") {
            newErrors.password = "Password harus diisi";
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            // Perform form submission
            const data = {
                company: codeCompany.current,
                uname: userName.current,
                passwd: md5(password.current),
            };
            const response = await setLogin(data);
            if (response?.status) {
                const dataUser = response.data.datauser;
                const companyCode = response.data.company_code;
                localStorage.setItem("data-user", JSON.stringify(dataUser));
                localStorage.setItem(
                    "company-code",
                    JSON.stringify(companyCode),
                );
                Cookies.set("is_login", true, { expires: 365 });
                login?.();
                Router.push("/");
            } else {
                setMessageError(response?.message);
                setShowErrorModal(true);
            }
            // const result = await signIn(
            //   "credentials", {
            //   codeCompany: codeCompany.current,
            //   username: userName.current,
            //   password: password.current,
            //   // redirect: true,
            //   // callbackUrl: "/",
            // });
        }
        setIsLoading(false);
    };

    return (
        <>
            <form className="space-y-6" action="#" method="POST">
                <div>
                    <label
                        htmlFor="codeCompany"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                    >
                        Kode Perusahaan
                    </label>
                    <div className="mt-2">
                        <input
                            id="codeCompany"
                            name="codeCompany"
                            type="input"
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              focus:invalid:border-blue-500 focus:invalid:ring-blue-500 dark:text-gray-900"
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                (e.target.value = e.target.value.toUpperCase())
                            }
                            placeholder="Kode Perusahaan"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => (codeCompany.current = e.target.value)}
                        />
                        <div
                            id="message-error"
                            className="text-red-500 text-sm mt-1"
                        >
                            {errors.codeCompany}
                        </div>
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                    >
                        Username
                    </label>
                    <div className="mt-2">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              focus:invalid:border-blue-500 focus:invalid:ring-blue-500 dark:text-gray-900"
                            placeholder="Username"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => (userName.current = e.target.value)}
                        />
                        <div
                            id="message-error"
                            className="text-red-500 text-sm mt-1"
                        >
                            {errors.username}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                            Password
                        </label>
                        <div className="text-sm" tabIndex={-1}>
                            <a
                                href="https://dev.v7.ecespro.id/forgot-password"
                                target="_blank"
                                className="font-semibold text-blue-600 hover:text-blue-500"
                                tabIndex={-1}
                            >
                                Lupa Password?
                            </a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              focus:invalid:border-blue-500 focus:invalid:ring-blue-500 dark:text-gray-900"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => (password.current = e.target.value)}
                            placeholder="Password"
                        />
                        <div
                            id="message-error"
                            className="text-red-500 text-sm mt-1"
                        >
                            {errors.password}
                        </div>
                    </div>
                </div>

                <div className=" bg-blue-600 rounded-md">
                    <button
                        type="submit"
                        className="flex w-full rounded-md justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        onClick={onSubmit}
                    >
                        Masuk
                    </button>
                </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
                Belum Punya Akun?{" "}
                <a
                    href="https://dev.v7.ecespro.id/buat-akun"
                    target="_blank"
                    className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
                >
                    Buat Akun
                </a>
            </p>

            {showErrorModal && (
                <Transition.Root show={showErrorModal} as={Fragment}>
                    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setShowErrorModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" color="red">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                    </svg>
                                                </div>
                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                        {messageError}
                                                    </Dialog.Title>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                                onClick={() => setShowErrorModal(false)}
                                            >
                                                Ok
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            )}
        </>
    );
}
