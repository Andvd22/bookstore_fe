import React, { useEffect, useRef, useState } from "react";
import { Stack } from "@mantine/core";



export type MessProps = {
    me: boolean
    content: string
}

const Mess: React.FC<MessProps> = (props) => {
    const messRef = useRef<HTMLDivElement | null>(null);
    const [widthInPixels, setWidthInPixels] = useState<number>(0);

    const updateWidth = () => {
        if (messRef.current) {
            const actualWidth = messRef.current.offsetWidth;
            setWidthInPixels(actualWidth);
        }
    };

    useEffect(() => {
        updateWidth();
        window.addEventListener("resize", updateWidth);

        return () => {
            window.removeEventListener("resize", updateWidth);
        };
    }, []);



    return (
        <Stack
            w={"100%"}
            ref={messRef}
            align={props.me ? "flex-end" : "flex-start"}
        >
            <Stack
                style={{
                    borderRadius: 16,
                    padding: 8,
                    color: props.me ? "#FFF" : "#000",
                    maxWidth: `${widthInPixels * 0.6}px`,
                    backgroundColor: props.me ? "#8B7FB5" : "#FFF",
                    borderBottomLeftRadius: props.me ? 16 : 0,
                    borderBottomRightRadius: props.me ? 0 : 16
                }}
            >
                {props.content}
            </Stack>
        </Stack>
    )
}

export default Mess;