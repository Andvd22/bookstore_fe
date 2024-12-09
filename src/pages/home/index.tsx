import React, { useEffect, useMemo, useState } from "react";
import BookItem from "@/components/book_item";

import { Grid, Group, Stack, Text, TextInput } from "@mantine/core";
import { useGetAllBookQuery, useSearchBookQuery } from "@/redux/api/book";
import { useNavigate } from "react-router";

import classes from "./styles.module.css";
import { ROUTER } from "@/constants/router";



const Home: React.FC = () => {
    const [search, setSearch] = useState<string>("");

    const navigation = useNavigate();

    const {
        data: dataAll,
        refetch: refetchAll,
    } = useGetAllBookQuery(null);

    const {
        data: dataSearch,
        refetch: refetchSearch,
    } = useSearchBookQuery(search);



    const data = useMemo(() => {
        if(search.length > 0) {
            return dataSearch || [];
        }

        if (!dataAll?.books) return [];

        if (dataAll.books.length > 12) {
            return dataAll.books.slice(0, 12);
        }

        return dataAll.books;
    }, [dataAll, dataSearch]);

    useEffect(() => {
        refetchAll();
        refetchSearch();
    }, []);



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
                <Text className={classes.title}>Mới ra mắt</Text>
                <Grid columns={12} gutter={40}>
                    {
                        data.map(d =>
                            <Grid.Col key={d.id} span={4}>
                                <BookItem
                                    title={d.title}
                                    price={d.price}
                                    image_url={d.image_url}
                                    onClick={() => navigation(`${ROUTER.BOOK.href}/${d.id}`)}
                                />
                            </Grid.Col>
                        )
                    }
                </Grid>
            </Stack>
        </Stack>
    )
}

export default Home;