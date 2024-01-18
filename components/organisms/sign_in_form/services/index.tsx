import { IPost } from "@/global_services/network_utils";

interface LoginType {
    company: string;
    uname: string;
    passwd: string;
}
export const setLogin = async (dataLogin: LoginType) => {
    const params = {
        url: "Auth/login",
        company: dataLogin.company,
        uname: dataLogin.uname,
        passwd: dataLogin.passwd,
    };

    try {
        const response = await IPost(params);
        if (response.status === false) {
            const res = {
                status: false,
                errors: response.errors,
                message: response.message,
                data: null,
            };
            return res;
        }
        const res = {
            status: true,
            errors: response.errors,
            message: response.message,
            data: response,
        };
        return res;
    } catch (error) {
        console.log(error);
    }
};
