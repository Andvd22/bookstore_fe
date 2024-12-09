import React, { useContext, useEffect, useMemo, useState } from "react";

import { OrderModelV2 } from "@/model_v2/order";
import { Button, Group, Image, Modal, Stack, Text } from "@mantine/core";
import { useDeleteOrderMutation, useGetOrderItemsQuery } from "@/redux/api/order";
import { OrderContext, OrderContextType } from "@/pages/order";

import classes from "./styles.module.css";



export type ItemProps = {
    order: OrderModelV2
}

const Item: React.FC<ItemProps> = (props) => {
    const [modalCancel, setModalCancel] = useState<boolean>(false);
    const [modalDetail, setModalDetail] = useState<boolean>(false);

    const { refetch: refetchOrder } = useContext<OrderContextType>(OrderContext);

    const {
        data,
        refetch,
    } = useGetOrderItemsQuery(props.order.id);

    const [deleteOrder] = useDeleteOrderMutation();



    const firstItem = useMemo(() => {
        return data?.[0] || null
    }, [data]);

    const handleCancel = async () => {
        const result = await deleteOrder(props.order.id);
        if("error" in result) {
            setModalCancel(false);
            return;
        }
        
        refetchOrder();
        setModalCancel(false);
    }

    useEffect(() => {
        refetch();
    }, [props.order.id]);



    return (
        <>
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
                    src={firstItem?.books.image_url}
                    style={{
                        width: "50px",
                        aspectRatio: 1 / 1,
                    }}
                />
                <Stack
                    className={classes.text}
                    style={{
                        flex: 1,
                        justifyItems: "start",
                        height: "100%",
                    }}
                >{firstItem?.books.title}</Stack>
                <Group>
                    <Text>{props.order.total_price} VND</Text>
                    {props.order.status === "Pending" && <Button bg={"red"} onClick={() => setModalCancel(true)}>Hủy đơn</Button>}
                    <Button onClick={() => setModalDetail(true)}>Chi tiết</Button>
                </Group>
            </Group>

            <Modal
                opened={modalCancel}
                onClose={() => setModalCancel(false)}
                title="Xác nhận hủy đơn"
            >
                <Text>Bạn có chắc chắn muốn hủy đơn</Text>

                <Group w={"100%"} justify="end" mt={20}>
                    <Button color="red" onClick={() => setModalCancel(false)}>Hủy</Button>
                    <Button onClick={handleCancel}>Xác nhận</Button>
                </Group>
            </Modal>

            <Modal
                opened={modalDetail}
                onClose={() => setModalDetail(false)}
                title="Chi tiết đơn hàng"
            >
                {
                    (data || []).map(it =>
                        <Group
                            key={it.id}
                            style={{
                                padding: 16,
                                backgroundColor: "#FFF",
                                borderRadius: 16,
                                width: "100%",
                                cursor: "pointer"
                            }}
                        >
                            <Image
                                src={it.books.image_url}
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
                            >{it.books.title}</Stack>
                            <Group>
                                <Text>SL: {it.quantity}</Text>
                                <Text>{it.quantity * it.price} VND</Text>
                            </Group>
                        </Group>
                    )
                }

                <Stack gap={4}>
                    <Group
                        justify="space-between"
                        pl={16}
                        pr={16}
                    >
                        <Text>Địa chỉ nhận hàng</Text>
                        <Text>{props.order.user_address}</Text>
                    </Group>

                    <Group
                        justify="space-between"
                        pl={16}
                        pr={16}
                    >
                        <Text>Tổng</Text>
                        <Text>{props.order.total_price} VND</Text>
                    </Group>
                </Stack>
            </Modal>
        </>
    )
}

export default Item;