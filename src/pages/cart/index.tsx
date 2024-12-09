import React, { useEffect, useState } from "react";
import Item, { ItemProps } from "./item";

import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useAppSelector } from "@/redux/hook";
import { listCart } from "@/utils/cart";
import { useCreateOrderMutation } from "@/redux/api/order";
import { CreateOrderItem } from "@/dto/request/order";
import { CART } from "@/model/variable";

import classes from "./styles.module.css";



const Cart: React.FC = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [carts, setCarts] = useState<ItemProps[]>([]);
    const [sum, setSum] = useState<number>(0);

    const [post] = useCreateOrderMutation();
    const profile = useAppSelector(state => state.authSlice.profile);

    const handleOrder = async () => {
        if (!profile) return;
        const items: CreateOrderItem[] = carts.map(c => ({ book_id: c.book_id, quantity: c.quantity }));

        const result = await post({ items });
        if ("error" in result) return;

        localStorage.setItem(`${CART}-${profile.id}`, JSON.stringify({}));
        getCarts();
        setSum(0);
        setModal(false);
    }

    const getCarts = () => {
        if (!profile) return;
        const list = listCart(profile.id);
        let carts: ItemProps[] = [];

        Object.keys(list).map(k => {
            carts.push({
                book_id: Number(k),
                quantity: list[Number(k)],
            })
        });

        setCarts(carts);
    }

    useEffect(() => {
        getCarts();
    }, [profile]);

    if (carts.length === 0) {
        return (
            <Stack>
                <Text className={classes.title}>Giỏ hàng</Text>
                <Text w={"100%"} style={{ textAlign: "center" }}>Danh sách trống</Text>
            </Stack>
        )
    }



    return (
        <>
            <Stack>
                <Text className={classes.title}>Giỏ hàng</Text>

                {
                    carts.map(c =>
                        <Item
                            key={c.book_id}
                            {...c}
                            cbDelete={(data) => {
                                getCarts();
                                setSum((prev) => prev - (data.price * c.quantity))
                            }}
                            cbLoad={(data) => setSum((prev) => prev + (data.price * c.quantity))}
                        />
                    )
                }

                <Group
                    justify="space-between"
                    w={"100%"}
                    bg={"#FFFFFF"}
                    p={16}
                    style={{ borderRadius: 16 }}
                >
                    <Text><span style={{ fontWeight: 600 }}>Tổng thanh toán:</span> {sum} VND</Text>
                    <Button onClick={() => setModal(true)}>Đặt hàng</Button>
                </Group>
            </Stack>

            <Modal
                opened={modal}
                onClose={() => setModal(false)}
                title="Xác nhận đặt hàng"
            >
                <Text>Bạn chắc chắn muốn thanh toán đơn hàng giá trị {sum} VND</Text>
                <Group justify="end">
                    <Button color="red" onClick={() => setModal(false)}>Hủy</Button>
                    <Button onClick={handleOrder}>Xác nhận</Button>
                </Group>
            </Modal>
        </>
    )
}

export default Cart;