import React, { useEffect } from "react";

import { Group, Image, Modal, Stack, Text } from "@mantine/core";
import { OrderModelV2 } from "@/model_v2/order";
import { useGetOrderItemsQuery } from "@/redux/api/order";


export type ModalListItemProps = {
    order: OrderModelV2 | null
    modalDetail: boolean
    setModalDetail: (value: boolean) => void
}
const ModalListItem: React.FC<ModalListItemProps> = (props) => {

    const {
        data,
        refetch,
    } = useGetOrderItemsQuery(props.order?.id || 0);

    useEffect(() => {
        refetch();
    }, [props.order?.id]);



    if(props.order === null) return <></>

    return (
        <Modal
                opened={props.modalDetail}
                onClose={() => props.setModalDetail(false)}
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
                        <Text>{props.order?.user_address}</Text>
                    </Group>

                    <Group
                        justify="space-between"
                        pl={16}
                        pr={16}
                    >
                        <Text>Tổng</Text>
                        <Text>{props.order?.total_price} VND</Text>
                    </Group>
                </Stack>
            </Modal>
    )
}

export default ModalListItem;