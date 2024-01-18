import React from "react";
import Head from "next/head";
import Image from "next/image";
import Logo from "@/public/logo_porta_pro.png";
import SignInForm from "@/components/organisms/sign_in_form/content";

const meta = {
    title: `Dokumentasi Porta Pro | Sign In`,
    description: `Dokumentasi Porta Pro Software Manajemen Perusahaan Properti.`,
};

const LoginPage = () => {
    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta content={meta.description} name="description" />
            </Head>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-black">
                {/* <div className="sm:min-w-full mx-auto p-4 bg-white rounded shadow-md"> */}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        src={Logo}
                        alt="Dokumentasi Porta Pro"
                        className="mx-auto h-20 w-auto"
                    />
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <SignInForm />
                </div>
                {/* </div> */}
            </div>
            <footer
                className="border-0 text-center bg-white dark:bg-black text-white"
                style={{
                    position: "absolute",
                    padding: "15px 15px 15px",
                    margin: "0px 0px",
                    width: "100%",
                }}
            >
                © 2022 Media Sarana Informasi -{" "}
                <a href="http://mediasarana.com" target="_blank">
                    Porta Pro.
                </a>
            </footer>
        </>
    );
};

export default LoginPage;
