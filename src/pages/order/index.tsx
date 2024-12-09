import React, { createContext, useEffect, useMemo, useState } from "react";
import OrderItem from "@/components/order_item";

import { rem, Stack, Tabs, Text } from "@mantine/core";
import { IconMessageCircle, IconPhoto, IconSettings } from "@tabler/icons-react";
import { useGetOrderByUserIdQuery } from "@/redux/api/order";
import { OrderModelV2 } from "@/model_v2/order";

import classes from "./styles.module.css";



const Order: React.FC = () => {
    const iconStyle = { width: rem(12), height: rem(12) };
    const [status, setStatus] = useState<string>("Pending");

    const {
        data,
        refetch
    } = useGetOrderByUserIdQuery(null);

    const orders = useMemo(() => {
        return data || [];
    }, [data]);

    useEffect(() => {
        refetch();
    }, [status]);

    return (
        <OrderContext.Provider
            value={{
                orders,
                refetch,
            }}
        >
            <Stack>
                <Text className={classes.title}>Đơn hàng của bạn</Text>
                <Tabs
                    defaultValue={status}
                    color="#765c53"
                    onChange={e => setStatus(e || "Pending")}
                >
                    <Tabs.List mb={30}>
                        <Tabs.Tab value="Pending" leftSection={<IconPhoto style={iconStyle} />}>
                            Chờ xác nhận
                        </Tabs.Tab>
                        <Tabs.Tab value="Shipping" leftSection={<IconMessageCircle style={iconStyle} />}>
                            Đang giao
                        </Tabs.Tab>
                        <Tabs.Tab value="Received" leftSection={<IconSettings style={iconStyle} />}>
                            Đã nhận
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="Pending">
                        <OrderItem status="Pending" />
                    </Tabs.Panel>

                    <Tabs.Panel value="Shipping">
                        <OrderItem status="Shipping" />
                    </Tabs.Panel>

                    <Tabs.Panel value="Received">
                        <OrderItem status="Received" />
                    </Tabs.Panel>
                </Tabs>
            </Stack>
        </OrderContext.Provider>
    )
}

export default Order;

export type OrderContextType = {
    orders: OrderModelV2[]
    refetch: () => void
}

export const OrderContext = createContext<OrderContextType>({
    orders: [],
    refetch: () => { },
})