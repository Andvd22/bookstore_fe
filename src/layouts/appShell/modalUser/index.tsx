import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { Avatar, Button, Group, Modal, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useAppSelector } from "@/redux/hook";
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/redux/api/auth";
import { TOKEN_TYPE } from "@/model/variable";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";
import { UpdateUserRequest } from "@/dto/request/auth";
import { useForm } from "@mantine/form";

import { useDeleteUserMutation } from "@/redux/api/auth";
import { useNotification } from "@/hook/notification.hook";



const ModalUser: React.FC = () => {
    const profile = useAppSelector(state => state.authSlice.profile);
    const [modal, setModal] = useState<boolean>(false);
    const [modalNavigation, setModalNavigation] = useState<boolean>(false);

    const noti = useNotification();

    const [modalDelete, setModalDelete] = useState<boolean>(false);
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

    const handleDelete = async () => {
        if(profile?.id === undefined) {
            noti.error("Id không tồn tại");
            return;
        };
        const result = await deleteUser(null);  
        if ("error" in result) {
            noti.error("Xóa tài khoản thát bại");
            return;
        }

        Cookies.remove(TOKEN_TYPE.ACCESS_TOKEN);
        setModalDelete(false);
        navigation(ROUTER.LOGIN.href); // Sau khi xóa, chuyển về trang đăng nhập
    };



    const [put, { isLoading }] = useUpdateUserMutation();

    const form = useForm<UpdateUserRequest>({
        initialValues: {
            username: profile?.username || "",
            phone_number: profile?.phone_number || "",
            address: profile?.address || "",
            password: "",
        },
        validate: {
            password: (value) => value.length < 8 ? "Mật khẩu mới phải có ít nhất 8 kí tự" : null,
            username: (value) => value.length === 0 ? "Không được để trống" : null,
        },
    })

    const navigation = useNavigate();

    const {
        data,
        refetch,
    } = useGetUserByIdQuery(profile?.id || 0);

    const handleLogout = async () => {
        Cookies.remove(TOKEN_TYPE.ACCESS_TOKEN);
        setModal(false);
        navigation(ROUTER.LOGIN.href);
    }

    const handleUpdate = async () => {
        const result = await put(form.values);
        if("error" in result) {
            return;
        }

        Cookies.remove(TOKEN_TYPE.ACCESS_TOKEN);
        setModal(false);
        navigation(ROUTER.LOGIN.href);
    }

    useEffect(() => {
        refetch();
    }, [profile?.id]);



    return (
        <>
            <Group p={16} style={{ cursor: "pointer" }} onClick={() => setModal(true)}>
                <Avatar radius="xl" />
                <Text>{data?.last_name} {data?.first_name}</Text>
            </Group>

            <Modal
                opened={modal}
                onClose={() => setModal(false)}
                title={"Thông tin tài khoản"}
            >
                <Stack>
                    <Group>
                        <Text fw={600}>Tên: </Text>
                        <Text>{data?.last_name} {data?.first_name}</Text>
                    </Group>
                    <Group>
                        <Text fw={600}>Địa chỉ: </Text>
                        <TextInput
                            style={{ flex: 1 }}
                            {...form.getInputProps("address")}
                        />
                    </Group>
                    <Group>
                        <Text fw={600}>Số điện thoại: </Text>
                        <TextInput
                            style={{ flex: 1 }}
                            {...form.getInputProps("address")}
                        />
                    </Group>
                    <Group>
                        <Text fw={600}>Email: </Text>
                        <Text>{data?.email}</Text>
                    </Group>
                    <Group>
                        <Text fw={600}>Tên đăng nhập: </Text>
                        <TextInput
                            style={{ flex: 1 }}
                            {...form.getInputProps("username")}
                        />
                    </Group>
                    <Group>
                        <Text fw={600}>Mật khẩu mới: </Text>
                        <PasswordInput
                            style={{ flex: 1 }}
                            {...form.getInputProps("password")}
                        />
                    </Group>
                </Stack>

                <Group justify="end" mt={30}>
                    <Button color="red" onClick={handleLogout}>Đăng xuất</Button>
                    <Button loading={isLoading} disabled={isLoading} onClick={() => setModalNavigation(true)}>Cập nhật</Button>
                    <Button color="yellow" loading={isDeleting} disabled={isDeleting} onClick={() => setModalDelete(true)}>Xóa</Button>
                </Group>
            </Modal>

            <Modal
                opened={modalNavigation}
                onClose={() => {
                    setModalNavigation(false);
                }}
                title="Xác nhận chỉnh sửa"
            >
                <Text>Việc chỉnh sửa sẽ đưa bạn về trang đăng nhập</Text>
                <Group justify="end">
                    <Button
                        color="red"
                        onClick={() => {
                            setModalNavigation(false);
                        }}
                    >Hủy</Button>
                    <Button
                        onClick={() => {
                            setModalNavigation(false);
                            handleUpdate();
                        }}
                    >Xác nhận</Button>
                </Group>
            </Modal>

            <Modal
                opened={modalDelete}
                onClose={() => setModalDelete(false)}
                title="Xác nhận xóa tài khoản"
            >
                <Text>Việc xóa tài khoản sẽ không thể hoàn tác. Bạn có chắc muốn xóa tài khoản của mình không?</Text>
                <Group justify="end">
                    <Button
                        color="red"
                        onClick={() => {
                            setModalDelete(false);
                        }}
                    >Hủy</Button>
                    <Button
                        color="yellow"
                        onClick={() => {
                            setModalDelete(false);
                            handleDelete();
                        }}
                    >Xác nhận</Button>
                </Group>
            </Modal>

        </>
    )
}

export default ModalUser;