import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType } from "@/global_services/data_types";
import Cookies from "js-cookie";
import Router from "next/router";

//services
import { gsAuthLogout } from "@/global_services/network_utils";

//content
const AuthContext = createContext<Partial<AuthContextType>>({});

interface AuxProps {
    children: React.ReactNode;
}

function AuthProvider({ children }: AuxProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dataUser, setDataUser] = useState({});

    useEffect(() => {
        try {
            const kodeCompany = JSON.parse(
                localStorage.getItem("company-code")!,
            );
            const dataUser = JSON.parse(localStorage.getItem("data-user")!);

            if (
                !(
                    kodeCompany === null ||
                    kodeCompany === undefined ||
                    dataUser === null ||
                    dataUser === undefined
                )
            ) {
                login();
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }, []);

    const login = () => {
        let dataUser = JSON.parse(localStorage.getItem("data-user")!);

        updateProfile(
            dataUser?.namauser,
            dataUser?.email,
            dataUser?.photo_profile_url,
        );
        setIsAuthenticated(true);
    };

    const updateProfile = async (
        namaUser: string,
        emailUser: string,
        imageUser: string,
    ) => {
        let dataUser = JSON.parse(localStorage.getItem("data-user")!);
        dataUser.namauser = namaUser;
        dataUser.email = emailUser;
        dataUser.photo_profile_url = imageUser;
        localStorage.setItem("data-user", JSON.stringify(dataUser));
        await setDataUser({
            ...dataUser,
            username: namaUser,
            email: emailUser,
            image: imageUser,
        });
    };

    const logout = async () => {
        await gsAuthLogout();
        setIsAuthenticated(false);
        setIsLoading(false);
        Cookies.remove("is_login");
        localStorage.removeItem("data-user");
        localStorage.removeItem("company-code");
        Router.push("/sign-in");
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isLoading,
                dataUser,
                login,
                logout,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
