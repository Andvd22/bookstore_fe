import React from "react";
import AppshellLayout from "@/layouts/appShell";
import ProtectedLayout from "@/layouts/protected";

import { Routes, Route } from "react-router-dom";
import {
    PageCart,
    PageCategory,
    PageCategoryBook,
    PageDetailBook,
    PageHome,
    PageLogin,
    PageManagerOrder,
    PageNotFound,
    PageOrder,
    PageRegister,
    PageReview,
} from "./lazy";
import { ROUTER } from "@/constants/router";
import { useAppSelector } from "@/redux/hook";



const AppRouter: React.FC = () => {
    const role = useAppSelector(state => state.authSlice.role);



    return (
        <Routes>

            <Route element={<ProtectedLayout />}>
                <Route path={ROUTER.LOGIN.href} element={<PageLogin />} />
                <Route path={ROUTER.REGSITER.href} element={<PageRegister />} />
                <Route element={<AppshellLayout />}>
                    <Route path={ROUTER.HOME.href} element={<PageHome />} />
                    <Route path={ROUTER.ORDER.href} element={<PageOrder />} />
                    <Route path={ROUTER.REVIEW.href} element={<PageReview />} />
                    <Route path={ROUTER.CATEGORY_BOOK.href} element={<PageCategory />} />
                    <Route path={`${ROUTER.CATEGORY_BOOK.href}/:category/:id`} element={<PageCategoryBook />} />
                    <Route path={`${ROUTER.BOOK.href}/:id`} element={<PageDetailBook />} />
                    <Route path={ROUTER.CART.href} element={<PageCart />} />


                    {
                        role === "admin" &&
                        <>
                            <Route path={ROUTER.MANAGER_ORDER.href} element={<PageManagerOrder />} />
                            {/* <Route path={ROUTER.MANAGER_PERMISSION.href} element={<PageManagerPermisson />} /> */}
                            {/* <Route path={ROUTER.DEPARTMENT.href} element={<PageDepartment />} />
                            <Route path={ROUTER.MANAGER_USER.href} element={<PageManagerUser />} />
                            <Route path={ROUTER.MANAGER_BOOK.href} element={<PageManagerBook />} />
                            <Route path={ROUTER.MANAGER_CATEGORY.href} element={<PageManagerCategory />} />
                            <Route path={ROUTER.MANAGER_PUBLISHER.href} element={<PageManagerPublisher />} />
                            <Route path={ROUTER.SCHEDULE.href} element={<PageSchedule />} />
                            <Route path={`${ROUTER.SCHEDULE.href}/:id`} element={<PageScheduleDetail />} />
                            <Route path={ROUTER.ROOM_CLIN.href} element={<PageRoomClin />} />
                            <Route path={ROUTER.ROOM_SPEC.href} element={<PageRoomSpec />} />
                            <Route path={ROUTER.FIELD.href} element={<PageField />} />
                            <Route path={ROUTER.FIELD_DETAIL.href} element={<PageFieldDetail />} />
                            <Route path={ROUTER.ACCOUNT_DOCTOR.href} element={<PageAccountDoctor />} />
                            <Route path={ROUTER.LOG_CHECK.href} element={<PageLogCheck />} /> */}
                        </>
                    }

                </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default AppRouter;