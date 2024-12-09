import React, { useEffect, useMemo, useState } from "react";
import TableCustom from "@/components/table";
import ModalListItem from "./modal_list_items";

import { MRT_ColumnDef } from "mantine-react-table";
import { Button, Group, Modal, Text, Tooltip } from "@mantine/core";
import { IconCircleCheck, IconInfoOctagon, IconReload, IconTrash, IconTruck } from "@tabler/icons-react";
import { useDeleteOrderMutation, useGetAllOrderQuery, useUpdateStatusOrderMutation } from "@/redux/api/order";
import { OrderModelV2 } from "@/model_v2/order";
import { ORDER_STATUS } from "@/constants/variable";
import { SIZE } from "@/constants/size";



const ManagerOrder: React.FC = () => {
    const [order, setOrder] = useState<OrderModelV2 | null>(null);
    const [modalDetail, setModalDetail] = useState<boolean>(false);
    const [modalShipping, setModalShipping] = useState<boolean>(false);
    const [modalReceived, setModalReceived] = useState<boolean>(false);
    const [modalDelete, setModalDelete] = useState<boolean>(false);


    const { fields } = useMemo(() => {
        const fields: MRT_ColumnDef<Record<string, any>>[] = [
            {
                accessorKey: "id",
                header: "Id đơn hàng"
            },
            {
                accessorKey: "order_date",
                header: "Ngày đặt"
            },
            {
                accessorKey: "status",
                header: "Trạng thái",
                Cell: (props) => {
                    const order: OrderModelV2 = props.row.original as OrderModelV2;
                    return <>{ORDER_STATUS?.[order.status]}</>
                }
            },
            {
                accessorKey: "total_price",
                header: "Tổng giá trị"
            },
            {
                accessorKey: "user_address",
                header: "Địa chỉ nhận"
            },
            {
                accessorKey: "action",
                header: "Tác vụ",
                Cell: (props) => {
                    const order: OrderModelV2 = props.row.original as OrderModelV2;
                    return (
                        <Group style={{ cursor: "pointer" }}>
                            <Tooltip label="Chi tiết">
                                <IconInfoOctagon 
                                    color="blue" 
                                    onClick={() => {
                                        setOrder(order);
                                        setModalDetail(true);
                                    }}
                                />
                            </Tooltip>
                            {
                                order.status === "Pending" &&
                                <>
                                    <Tooltip label="Xác nhận Giao hàng">
                                        <IconTruck
                                            color="green"
                                            onClick={() => {
                                                setOrder(order);
                                                setModalShipping(true);
                                            }}
                                        />
                                    </Tooltip>
                                    <Tooltip label="Xác nhận Hủy đơn">
                                        <IconTrash
                                            color="red"
                                            onClick={() => {
                                                setOrder(order);
                                                setModalDelete(true);
                                            }}
                                        />
                                    </Tooltip>
                                </>
                            }
                            {
                                order.status === "Shipping" &&
                                <Tooltip label="Xác nhận Đã nhận hàng">
                                    <IconCircleCheck
                                        color="green"
                                        onClick={() => {
                                            setOrder(order);
                                            setModalReceived(true);
                                        }}
                                    />
                                </Tooltip>
                            }
                        </Group>
                    )
                }
            }
        ];

        return { fields };
    }, []);

    const {
        data,
        refetch,
        isFetching,
    } = useGetAllOrderQuery(null);

    const [deleteOrder] = useDeleteOrderMutation();
    const [updateOrder] = useUpdateStatusOrderMutation();



    const handleGet = async () => {
        refetch();
    }

    const handleDelete = async (order_id: number) => {
        const result = await deleteOrder(order_id);
        if ("error" in result) {
            return;
        }

        setModalDelete(false);
        refetch();
    }

    const handleUpdate = async (order_id: number, status: "Shipping" | "Received") => {
        const result = await updateOrder({ order_id, status });
        if ("error" in result) {
            return;
        }

        setModalShipping(false);
        setModalReceived(false);
        refetch();
    }



    useEffect(() => {
        refetch();
    }, []);



    return (
        <>
            <TableCustom
                action={
                    <>
                        <Button
                            onClick={handleGet}
                            leftSection={<IconReload />}
                        >Tải lại</Button>
                    </>
                }
                maxHeight={`calc(100vh + 19px - ${SIZE.t_toolbar} - ${SIZE.t_header} - ${SIZE.t_footer})`}
                loading={isFetching}
                columns={fields}
                data={data || []}
            />

            <Modal
                opened={modalDelete}
                onClose={() => setModalDelete(false)}
                title="Xác nhận Hủy đơn hàng"
            >
                <Text>Bạn chắc chắn muốn Hủy đơn hàng giá trị {order?.total_price} VND</Text>
                <Group justify="end">
                    <Button color="red" onClick={() => setModalDelete(false)}>Hủy</Button>
                    <Button onClick={() => order && handleDelete(order.id)}>Xác nhận</Button>
                </Group>
            </Modal>

            <Modal
                opened={modalShipping}
                onClose={() => setModalShipping(false)}
                title="Xác nhận Đang giao hàng"
            >
                <Text>Bạn chắc chắn muốn Đang giao hàng đơn hàng giá trị {order?.total_price} VND</Text>
                <Group justify="end">
                    <Button color="red" onClick={() => setModalShipping(false)}>Hủy</Button>
                    <Button onClick={() => order && handleUpdate(order.id, "Shipping")}>Xác nhận</Button>
                </Group>
            </Modal>

            <Modal
                opened={modalReceived}
                onClose={() => setModalReceived(false)}
                title="Xác nhận Đã nhận hàng"
            >
                <Text>Bạn chắc chắn muốn Đã nhận hàng đơn hàng giá trị {order?.total_price} VND</Text>
                <Group justify="end">
                    <Button color="red" onClick={() => setModalReceived(false)}>Hủy</Button>
                    <Button onClick={() => order && handleUpdate(order.id, "Received")}>Xác nhận</Button>
                </Group>
            </Modal>

            <ModalListItem
                order={order}
                modalDetail={modalDetail}
                setModalDetail={setModalDetail}
            />
        </>
    )
}

export default ManagerOrder;