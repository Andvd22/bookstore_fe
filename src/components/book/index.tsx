import React, { useEffect, useRef, useState } from "react";
import classes from "./style.module.css";
import { Tooltip } from "@mantine/core";

export type BookProps = {
    width: number;
    title?: string
    thumnail?: string
    onClick?: () => void
};

const Book: React.FC<BookProps> = (props) => {
    const bookRef = useRef<HTMLDivElement | null>(null);
    const [widthInPixels, setWidthInPixels] = useState<number>(0);

    const updateWidth = () => {
        if (bookRef.current) {
            const actualWidth = bookRef.current.offsetWidth;
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
        <Tooltip label={props.title}>
            <div
                className={classes.book}
                ref={bookRef}
                style={{
                    height: `${widthInPixels * 1.5}px`,
                    width: `${props.width}%`,
                }}
                onClick={props.onClick}
            >
                <div
                    className={classes.book_cover}
                    style={{
                        backgroundImage: `url('${props.thumnail}')`,
                        textAlign: "center",
                    }}
                >
                    <p className={classes.text}>
                        {props.title}
                    </p>
                </div>
                <div className={classes.bookmark}></div>
            </div>
        </Tooltip>
    );
};

export default Book;
