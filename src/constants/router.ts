import { 
    Icon, 
    IconAlignBoxRightMiddle, 
    IconBaselineDensityMedium, 
    IconBook, 
    IconBook2, 
    IconFolders, 
    IconGitFork, 
    IconLayoutDashboard, 
    IconMessage, 
    IconProps,
    IconShoppingCart,
    IconTruckDelivery,
    IconUserPlus,
} from "@tabler/icons-react"

export type ObjectRouter = {
    href: string
    name?: string
    type: "public" | "protected"
    icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>
}

export type FieldRouter =
    | "HOME"
    | "LOGIN"
    | "CATEGORY_BOOK"
    | "BOOK"
    | "REGSITER"
    | "ORDER"
    | "CART"
    | "REVIEW"
    | "MANAGER_BOOK"
    | "MANAGER_ORDER"
    | "MANAGER_CATEGORY"
    | "MANAGER_PUBLISHER"
    | "MANAGER_PERMISSION"
    | "MANAGER_USER"
export const ROUTER: Record<FieldRouter, ObjectRouter> = {
    LOGIN: {
        href: "/login",
        type: "protected",
        name: "Đăng nhập",
    },
    REGSITER: {
        href: "/register",
        type: "protected",
        name: "Đăng kí",
    },
    HOME: {
        href: "/",
        type: "protected",
        name: "Trang chủ",
        icon: IconLayoutDashboard
    },
    CART: {
        href: "/cart",
        type: "protected",
        name: "Giỏ hàng",
        icon: IconShoppingCart
    },
    BOOK: {
        href: "/book",
        type: "protected",
    },
    CATEGORY_BOOK: {
        href: "/category",
        type: "protected",
        name: "Thể loại",
        icon: IconBaselineDensityMedium
    },
    ORDER: {
        href: "/order",
        type: "protected",
        name: "Đơn hàng",
        icon: IconTruckDelivery
    },
    REVIEW: {
        href: "/review",
        type: "protected",
        name: "Đánh giá",
        icon: IconMessage
    },
    MANAGER_CATEGORY: {
        href: "/manager-category",
        type: "protected",
        name: "Phân loại sách",
        icon: IconAlignBoxRightMiddle
    },
    MANAGER_PUBLISHER: {
        href: "/manager-publiser",
        type: "protected",
        name: "Nhà xuất bản",
        icon: IconBook
    },
    MANAGER_ORDER: {
        href: "/manager-order",
        type: "protected",
        name: "Quản lí đơn hàng",
        icon: IconFolders
    },
    MANAGER_BOOK: {
        href: "/manager-book",
        type: "protected",
        name: "Kho sách",
        icon: IconBook2
    },
    MANAGER_PERMISSION: {
        href: "/manager-permission",
        type: "protected",
        name: "Phân quyền",
        icon: IconGitFork
    },
    MANAGER_USER: {
        href: "/manager-user",
        type: "protected",
        name: "Tài khoản",
        icon: IconUserPlus
    },
}