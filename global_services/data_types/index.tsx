export interface PayloadType {
    payload?: {
        id: string;
        idKaryawan: number;
        username: string;
        exp: number;
        iat: number;
    };
}

export interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    dataUser: any;
    authUser: any;
    login?: () => void;
    logout?: () => void;
    updateProfile?: (
        namaUser: string,
        emailUser: string,
        imageUser: string,
    ) => void;
}

export interface GetServerSideProps {
    req: {
        cookies: {
            token: string;
        };
        url: string;
    };
}
