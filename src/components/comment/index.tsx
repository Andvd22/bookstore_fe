import { useGetUserByIdQuery } from "@/redux/api/auth";
import { useDeleteReviewMutation } from "@/redux/api/review";
import { useAppSelector } from "@/redux/hook";
import { Avatar, Button, Group, Modal, Rating, Stack, Text, Tooltip } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import React, { useEffect, useMemo, useState } from "react";


export type CommentProps = {
    me: boolean
    rating: number
    comment: string
    user_id: number
    id: number
    cbDelete?: () => void
}

const Comment: React.FC<CommentProps> = (props) => {
    const profile = useAppSelector(state => state.authSlice.profile);
    const [modal, setModal] = useState<boolean>(false);

    const [deleteReview] = useDeleteReviewMutation();

    const {
        data,
        refetch,
    } = useGetUserByIdQuery(props.user_id)

    const name = useMemo(() => {
        return profile?.id === data?.id ? "Bạn" : `${data?.last_name} ${data?.first_name}`
    }, [data, profile]);

    const handleDeleteReview = async () => {
        const result = await deleteReview(props.id);
        if("error" in result) {
            setModal(false);
            return;
        }
        props.cbDelete && props.cbDelete();
    }

    useEffect(() => {
        refetch();
    }, [props.user_id]);



    return (
        <>
            <Stack
                style={{
                    padding: 8,
                    borderRadius: 8,
                    backgroundColor: "#F7EFE5"
                }}
            >
                <Group justify="space-between">
                    <Group align="start">
                        <Avatar color="cyan" radius="xl">{name.split("")[0]}</Avatar>
                        <Stack gap={0} pt={0}>
                            <Text>{name}</Text>
                            <Rating defaultValue={props.rating} readOnly />
                        </Stack>
                    </Group>
                    
                    {
                        props.user_id === profile?.id && 
                        <Tooltip label="Xóa bình luận">
                            <IconTrash 
                                color="red"
                                style={{
                                    cursor: "pointer"
                                }}
                                onClick={() => setModal(true)}
                            />
                        </Tooltip>
                    }
                </Group>
                <Text>{props.comment}</Text>
            </Stack>

            <Modal 
                opened={modal}
                onClose={() => setModal(false)}
                title="Xác nhận xóa bình luận"
            >
                Bạn chắc chắn muốn xóa bình luận này
                <Group justify="end" mt={20}>
                    <Button color="red" onClick={() => setModal(false)}>Hủy</Button>
                    <Button
                        onClick={handleDeleteReview}
                    >Xác nhận</Button>
                </Group>
            </Modal>
        </>
    )
}

export default Comment;