import React, { useEffect } from "react";
import Book from "@/components/book";

import { Grid, Stack, Text } from "@mantine/core";
import { useGetCategoryQuery } from "@/redux/api/category";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";

import classes from "./styles.module.css";


const Category: React.FC = () => {

    const {
        data,
        refetch,
    } = useGetCategoryQuery(null);

    const navigation = useNavigate();

    useEffect(() => {
        refetch();
    }, []);



    return (
        <Stack w={"100%"}>
            <Stack mt={30}>
                <Text className={classes.title}>Thể loại sách</Text>
                <Grid columns={12}>
                    {
                        (data || []).map(c =>
                            <Grid.Col span={2} key={c.id}>
                                <Book 
                                    width={100} 
                                    title={c.type_name}
                                    onClick={() => {
                                        navigation(`${ROUTER.CATEGORY_BOOK.href}/${c.type_name}/${c.id}`)
                                    }}
                                />
                            </Grid.Col>
                        )
                    }
                </Grid>
            </Stack>
        </Stack>
    )
}

export default Category;