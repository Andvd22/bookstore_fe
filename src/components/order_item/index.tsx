import React, { useContext, useMemo } from "react";
import Item from "./item";

import { Stack } from "@mantine/core";
import { OrderContext, OrderContextType } from "@/pages/order";



export type OrderItemProps = {
    status: "Pending" | "Shipping" | "Received"
}

const OrderItem: React.FC<OrderItemProps> = (props) => {

    const { orders: data } = useContext<OrderContextType>(OrderContext);

    console.log(data);

    const orders = useMemo(() => {
        return (data || []).filter(d => d.status === props.status);
    }, [data]);



    return (
        <>
            <Stack>
                {
                    orders.map(o => 
                        <Item key={o.id} order={o}/>
                    )
                }
            </Stack>
        </>
    )
}

export default OrderItem;