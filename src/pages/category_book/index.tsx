import React, { useEffect, useMemo, useState } from "react";
import BookItem from "@/components/book_item";

import { Grid, Group, Stack, Text, TextInput, Tooltip } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";
import { ROUTER } from "@/constants/router";
import { useGetBookByCategoryQuery } from "@/redux/api/book";

import classes from "./styles.module.css";



const CategoryBook: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const { category, id } = useParams();
    const navigation = useNavigate();

    const {
        data,
        refetch,
    } = useGetBookByCategoryQuery(Number(id || 0));

    const list = useMemo(() => {
        if(search.length === 0) return data?.books || [];
        return (data?.books || []).filter(b => b.title.includes(search));
    }, [search, data]);

    useEffect(() => {
        refetch();
    }, [id]);



    return (
        <Stack w={"100%"}>
            <Group w={"100%"}>
                <TextInput
                    placeholder="Nhập từ khóa"
                    style={{ flex: 1 }}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </Group>
            <Stack>
                <Group justify="start" w={"100%"}>
                    <Tooltip label="Quay lại">
                        <IconArrowLeft
                            onClick={() => navigation(ROUTER.CATEGORY_BOOK.href)}
                            style={{ cursor: "pointer" }}
                            size={24}
                        />
                    </Tooltip>
                    <Text className={classes.title}>{category}</Text>
                </Group>
                <Grid columns={12} gutter={40}>
                    {
                        list.map(b =>
                            <Grid.Col span={4} key={b.id}>
                                <BookItem
                                    title={b.title}
                                    image_url={b.image_url}
                                    price={b.price}
                                    onClick={() => navigation(`${ROUTER.BOOK.href}/${b.id}`)}
                                />
                            </Grid.Col>
                        )
                    }
                </Grid>
            </Stack>
        </Stack>
    )
}

export default CategoryBook;