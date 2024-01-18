import Cookies from "js-cookie";

export default function DataSource() {
    const token = Cookies.get("is_login");
    let kodeCompany;
    let username;
    let password;
    if (token) {
        username = "";
        password = "";
        kodeCompany = JSON.parse(localStorage.getItem("company-code")!);
    } else {
        kodeCompany = "";
        username = "";
        password = "";
    }

    return {
        isCompCode: kodeCompany,
        isUsr: username,
        isPswd: password,
    };
}
