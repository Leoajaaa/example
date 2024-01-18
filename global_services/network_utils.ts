import axios from "axios";
import Router from "next/router";
import DataSource from "./data-source";

const ROOT_API = process.env.NEXT_PUBLIC_API_URL;

export interface Post {
    url?: string;
    [key: string]: any;
}

export const IPost = async (post: Post) => {
    const postData: { [k: string]: any } = {};
    postData["company"] = `${DataSource().isCompCode}`;
    for (const [k, v] of Object.entries(post)) {
        if (k !== "url") postData[k] = v;
    }

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Device": "w",
        "X-MSI-Company-Code": `${DataSource().isCompCode}`,
    };
    try {
        const response = await axios.post(
            `${ROOT_API}/` + post.url,
            new URLSearchParams(postData),
            { headers },
        );
        const axiosResponse = response.data;
        return axiosResponse;
    } catch (error: any) {
        // if (error.response.status !== 401) throw error;
        if (error.response.status === 401) {
            console.error(error.response.data.message);
            Router.push("/sign-in");
        } else if (error.response.status === 422) {
            const axiosResponse = error.response.data;
            return axiosResponse;
        }
    }
};

export const gsAuthLogout = async () => {
    const params = {
        url: "/Welcome/logout",
    };
    try {
        const response = await IPost(params);
        if (response.status === false) {
            const res = {
                error: true,
                message: response.message,
                data: [],
            };
            return res;
        }
        const res = {
            error: false,
            message: response.message,
            data: response.daftarProvinsi,
        };
        return res;
    } catch (error) {
        console.log(error);
    }
};
