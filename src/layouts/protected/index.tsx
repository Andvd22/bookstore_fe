import React, { Suspense, useEffect } from "react";
import Cookies from "js-cookie";

import { ROUTER } from "@/constants/router";
import { TOKEN_TYPE } from "@/model/variable";
import { useNavigate, useOutlet } from "react-router";
import { LoadingOverlay } from "@mantine/core";
import { useAppDispatch } from "@/redux/hook";
import { reload } from "@/redux/slice/authSlice";



const ProtectedLayout: React.FC = () => {
    const outlet = useOutlet();
    const navigation = useNavigate();

    const dispath = useAppDispatch();
    const accessToken = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);

    useEffect(() => {
        dispath(reload());
        if(!accessToken) {
            navigation(ROUTER.LOGIN.href);
        }
    }, [accessToken]);

    if(!accessToken) {
        // return <></>
    }

    return (
        <Suspense fallback={<LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />}>
            {outlet}
        </Suspense>
    )
}

export default ProtectedLayout;