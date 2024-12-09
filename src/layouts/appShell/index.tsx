import React, { Suspense, useMemo } from "react";

import { useNavigate, useOutlet } from "react-router";
import { AppShell, Grid, Group, LoadingOverlay, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ObjectRouter, ROUTER } from "@/constants/router";
import { useAppSelector } from "@/redux/hook";

import classes from "./styles.module.css";
import RoomChat from "@/components/room_chat";
import ModalUser from "./modalUser";



const AppshellLayout: React.FC = () => {
    const {
        profile,
        role,
    } = useAppSelector(state => {
        return ({
            profile: state.authSlice.profile,
            role: state.authSlice.role,
        })
    });

    const links: ObjectRouter[] = useMemo(() => {
        let list: ObjectRouter[] = [
            ROUTER.HOME,
            ROUTER.CATEGORY_BOOK,
            ROUTER.CART,
            ROUTER.ORDER,
        ];
        
        if (role === "admin") {
            list.push(
                ROUTER.MANAGER_ORDER,
            )
        }

        // if (role === "room-clin") {
        //     list.push(...[
        //         ROUTER.CLINICAL,
        //         ROUTER.RESULT,
        //     ])
        // }

        // if (role === "room-spec") {
        //     list.push(ROUTER.SPEC,)
        // }

        return list;
    }, [role]);

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const outlet = useOutlet();
    const navigation = useNavigate();

    const pathname = window.location.pathname;



    return (
        <Suspense fallback={<LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />}>
            <AppShell
                header={{ height: 0 }}
                navbar={{
                    width: 300,
                    breakpoint: "md",
                }}
                padding={0}
                withBorder={false}
            >
                <AppShell.Navbar p={0} style={{ backgroundColor: "#EEE5DA" }}>
                    <Stack h={"100%"} justify="space-between">
                        <Stack gap={8} pt={30}>
                            {links.map((l, index) => {
                                const active = pathname === ROUTER.HOME.href && l.href === ROUTER.HOME.href ? true : pathname.includes(l.href) && l.href !== ROUTER.HOME.href;
                                const Icon = l.icon
                                return (
                                    <Group
                                        key={index}
                                        gap={16}
                                        align="center"
                                        className={classes.link_root}
                                        onClick={() => navigation(l.href)}
                                    >
                                        <div
                                            style={{
                                                width: 4,
                                                borderTopRightRadius: 100,
                                                borderBottomRightRadius: 100,
                                                height: "100%"
                                            }}
                                            className={`${classes.link} ${active && classes.active}`}
                                        ></div>
                                        <Group
                                            gap={8}
                                            align="center"
                                            w={280 - 16 - 5}
                                            style={{
                                                padding: "10px 8px",
                                                borderRadius: 16,
                                            }}
                                            className={`${classes.link} ${active && classes.active}`}
                                        >
                                            {Icon && <Icon />}
                                            <span>{l.name}</span>
                                        </Group>
                                    </Group>
                                )
                            })}
                        </Stack>

                        <ModalUser/>
                    </Stack>
                </AppShell.Navbar>

                <AppShell.Main
                    pb={0}
                >
                    <Group
                        style={{
                            height: "calc(100vh)",
                            width: "100%",
                            justifyContent: "start",
                            alignItems: "start",
                            padding: 16,
                            backgroundColor: "#FBF8F5",
                            overflowY: "scroll"
                        }}
                    >
                        <Grid w={"100%"}>
                            <Grid.Col span={8}>
                                <Stack
                                    style={{
                                        height: `calc(100vh - ${16 * 2}px)`,
                                        overflow: "hidden",
                                        overflowY: "scroll",
                                        paddingLeft: 8,
                                        paddingRight: 8,
                                    }}
                                >
                                    {outlet}
                                </Stack>
                            </Grid.Col>

                            <Grid.Col span={4}>
                                <RoomChat />
                            </Grid.Col>
                        </Grid>
                    </Group>
                </AppShell.Main>
            </AppShell>
        </Suspense>
    )
}

export default AppshellLayout;