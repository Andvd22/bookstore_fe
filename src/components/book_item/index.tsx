import React from "react";

import { Button, Image, Stack, Text } from "@mantine/core";

import classes from "./styles.module.css";



export type BookItemProps = {
    title: string
    price: number
    image_url: string
    onClick?: () => void
}

const BookItem: React.FC<BookItemProps> = (props) => {
    return (
        <>
            <Stack className={classes.root}>
                <Stack w={"100%"}>
                    <Image
                        src={props.image_url}
                        style={{
                            aspectRatio: 1 / 1
                        }}
                    />
                    <Text className={classes.text}>
                        {props.title}
                    </Text>
                    <Button variant="outline">{props.price} VND</Button>
                    <Button onClick={props.onClick}>Chi tiết</Button>
                </Stack>
            </Stack>
        </>
    )
}

export default BookItem;