import React, { useState, useRef, useEffect } from "react";
import Mess from "../mess";

import { Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { IconBrandTelegram } from "@tabler/icons-react";
import { useChatbotMutation } from "@/redux/api/chat";

import classes from "./styles.module.css";

type Mess = {
    me: boolean;
    content: string;
};

const RoomChat: React.FC = () => {
    const [mess, setMess] = useState<string>("");
    const [list, setList] = useState<Mess[]>([]);
    const messagesRef = useRef<HTMLDivElement>(null); // Ref for message container

    const [post, { isLoading }] = useChatbotMutation();

    const handleChat = async () => {
        if (mess.length === 0) return;

        const result = await post(mess);
        if ("error" in result) return;

        const newMess: Mess[] = [
            {
                me: true,
                content: mess,
            },
            {
                me: false,
                content: result.data,
            },
        ];

        setMess("");
        setList((prev) => [...prev, ...newMess]);
    };

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [list]);

    return (
        <Stack
            style={{
                height: `calc(100vh - ${16 * 2}px)`,
                borderRadius: 16,
                backgroundColor: "#E2D6C9",
                padding: 16,
            }}
        >
            <Text className={classes.title}>Chat</Text>
            <Stack
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto", // Enable overflow scrolling
                }}
                ref={messagesRef} // Assign ref to message container
            >
                {list.map((m, index) => (
                    <Mess key={index} content={m.content} me={m.me} />
                ))}
            </Stack>
            <Group>
                <TextInput
                    placeholder="Nhập tin nhắn"
                    style={{ flex: 1 }}
                    value={mess}
                    onChange={(e) => setMess(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleChat();
                        }
                    }}
                />
                <Button loading={isLoading} disabled={isLoading} style={{ backgroundColor: "#ED5E64" }}>
                    <IconBrandTelegram onClick={handleChat} />
                </Button>
            </Group>
        </Stack>
    );
};

export default RoomChat;