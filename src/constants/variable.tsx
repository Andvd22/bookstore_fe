import { Badge } from "@mantine/core";
import React from "react";

export const ORDER_STATUS: Record<string, React.ReactNode> = {
    "Pending": <Badge color="yellow">Chờ duyệt</Badge>,
    "Shipping": <Badge color="blue">Đang giao</Badge>,
    "Received": <Badge color="green">Đã nhận</Badge>,
}