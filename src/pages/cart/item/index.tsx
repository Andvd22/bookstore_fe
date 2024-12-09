import React, { useEffect } from "react";

import { Group, Image, Stack, Text, Tooltip } from "@mantine/core";
import { useGetBookByIdQuery } from "@/redux/api/book";
import { IconTrash } from "@tabler/icons-react";
import { deleteCart } from "@/utils/cart";
import { useAppSelector } from "@/redux/hook";
import { BookModelAllV2 } from "@/model_v2/book";



export type ItemProps = {
    book_id: number
    quantity: number
    cbDelete?: (data: BookModelAllV2) => void
    cbLoad?: (data: BookModelAllV2) => void
}

const Item: React.FC<ItemProps> = (props) => {
    const profile = useAppSelector(state => state.authSlice.profile);

    const {
        data,
        refetch,
    } = useGetBookByIdQuery(props.book_id);

    const handleDeleteCart = () => {
        if (!profile || !data) return
        deleteCart(profile.id, props.book_id);
        props.cbDelete && props.cbDelete(data);
    }

    useEffect(() => {
        if(!data) return;
        props.cbLoad && props.cbLoad(data);
    }, [data]);

    useEffect(() => {
        refetch();
    }, [props.book_id]);



    if (!data) return <></>

    return (
        <Group
            style={{
                padding: 16,
                backgroundColor: "#FFF",
                borderRadius: 16,
                width: "100%",
                cursor: "pointer"
            }}
        >
            <Image
                src={data.image_url}
                style={{
                    width: "50px",
                    aspectRatio: 1 / 1,
                }}
            />
            <Stack
                style={{
                    flex: 1,
                    justifyItems: "start",
                    height: "100%",
                }}
            >{data.title}</Stack>
            <Group>
                <Text>SL: {props.quantity}</Text>
                <Text>{data.price} VND</Text>
                <Tooltip label="Xóa" onClick={handleDeleteCart}>
                    <IconTrash color="red" />
                </Tooltip>
            </Group>
        </Group>
    )
}

export default Item;