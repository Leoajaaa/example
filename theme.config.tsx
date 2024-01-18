import React from "react";
import Logo from "@/public/favicon-192x192.png";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "./components/organisms/layout/logout";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
    useNextSeoProps() {
        const { asPath } = useRouter();
        if (asPath !== "/") {
            return {
                titleTemplate: "Dokumentasi Porta Pro | %s",
            };
        }
    },
    head: (
        <>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <meta property="og:title" content="Dokumentasi V7 Porta Pro" />
            <meta
                property="og:description"
                content="Dokumentasi V7 Porta Pro"
            />
            <meta name="author" content="Mediasarana Informasi" />
            <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
            <link
                href="/favicon-72x72.png"
                rel="icon"
                sizes="72x72"
                type="image/png"
            />

            <link
                href="/favicon-96x96.png"
                rel="icon"
                sizes="96x96"
                type="image/png"
            />
            <link
                href="/favicon-48x48.png"
                rel="icon"
                sizes="48x48"
                type="image/png"
            />
            <link
                href="/favicon-32x32.png"
                rel="icon"
                sizes="32x32"
                type="image/png"
            />
            <link
                href="/favicon-16x16.png"
                rel="icon"
                sizes="16x16"
                type="image/png"
            />
            <meta content="#185adb" name="theme-color" />
        </>
    ),
    primaryHue: 204,
    logo: (
        <>
            <Image
                src={Logo}
                onClick={() => { }}
                alt="setting"
                height={50}
                width={50}
            />
            <span style={{ marginLeft: ".8em", fontWeight: 700 }}>
                Porta Pro
            </span>
        </>
    ),
    logoLink: "https://portapro.co.id",
    banner: {
        key: "2.0-release",
        text: (
            <a href="https://dev.help.portapro.co.id" target="_blank">
                SELAMAT DATANG DI DOKUMENTASI PORTA PRO
            </a>
        ),
    },
    navbar: {
        extraContent: <Navbar />,
    },
    sidebar: {
        toggleButton: true,
    },
    toc: {
        title: "Daftar Konten halaman ini",
        backToTop: true,
    },
    feedback: {
        content: null
    },
    editLink: {
        text: null
    },
    // project: {
    //   link: 'https://github.com/shuding/nextra-docs-template',
    // },
    // chat: {
    //   link: 'https://discord.com',
    // },
    // docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
    navigation: {
        prev: true,
        next: true
    },
    footer: {
        text: (
            <span>
                Porta Pro {new Date().getFullYear()} ©{" "}
                <a href="https://www.mediasarana.com" target="_tunggu">
                    PT.Media Sarana Informasi
                </a>
            </span>
        ),
    },
};

export default config;
