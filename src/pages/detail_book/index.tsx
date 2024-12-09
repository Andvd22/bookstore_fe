import React, { useEffect, useState } from "react";
import Comment from "@/components/comment";

import { Avatar, Button, Grid, Group, Image, NumberInput, Rating, Stack, Text, TextInput, Tooltip } from "@mantine/core";
import { IconArrowLeft, IconShoppingCart } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";
import { useGetBookByIdQuery } from "@/redux/api/book";
import { useCreateReviewMutation, useGetReviewQuery } from "@/redux/api/review";
import { useAppSelector } from "@/redux/hook";
import { addCart } from "@/utils/cart";
import { ROUTER } from "@/constants/router";

import classes from "./styles.module.css";



const DetailBook: React.FC = () => {
    const { id } = useParams();
    const profile = useAppSelector(state => state.authSlice.profile);

    const [review, setReview] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);

    const navigation = useNavigate();

    const {
        data,
        refetch,
    } = useGetBookByIdQuery(Number(id || 0));
    const {
        data: dataReview,
        refetch: refetchReview,
    } = useGetReviewQuery(Number(id || 0));

    const [post, { isLoading: loadReview }] = useCreateReviewMutation();

    const handleAddCart = () => {
        if(!profile || !id) return;
        addCart(profile.id, { book_id: Number(id), quantity: quantity });
        setQuantity(0);
    }

    const handleCreateReview = async () => {
        if (!id) return;

        const result = await post({
            book_id: Number(id),
            rating: rating,
            comment: review,
        });

        if("error" in result) {
            return;
        }

        setRating(0);
        setReview("");
        refetchReview();
    }


    useEffect(() => {
        refetch();
        refetchReview();
    }, [id]);

    if (!data) return <></>



    return (
        <Stack w={"100%"}>
            <Group justify="start" w={"100%"}>
                <Tooltip label="Quay lại">
                    <IconArrowLeft 
                        style={{ cursor: "pointer" }} 
                        size={24}
                        onClick={() => navigation(`${ROUTER.CATEGORY_BOOK.href}/${data.categories.type_name}/${data.category_id}`)}
                    />
                </Tooltip>
                <Text className={classes.title}>Chi tiết sản phẩm</Text>
            </Group>

            <Grid>
                <Grid.Col span={5}>
                    <Image
                        src={data.image_url}
                        style={{
                            aspectRatio: 3 / 4
                        }}
                    />

                    {profile &&
                        <Group mt={30}>
                            <NumberInput
                                min={1}
                                step={1}
                                style={{
                                    flex: 1,
                                }}
                                value={quantity}
                                onChange={e => setQuantity(Number(e))}
                            />
                            <Button
                                disabled={quantity === 0}
                                leftSection={<IconShoppingCart />}
                                onClick={handleAddCart}
                            >Thêm</Button>
                        </Group>
                    }
                </Grid.Col>
                <Grid.Col span={7}>
                    <Stack>
                        <Text>Thông tin sản phẩm</Text>
                        <Group justify="space-between">
                            <Text fw={700}>Tên sản phẩm: </Text>
                            <Text>{data.title}</Text>
                        </Group>

                        <Group justify="space-between">
                            <Text fw={700}>Tác giả: </Text>
                            <Text>{data?.authors.author_name}</Text>
                        </Group>

                        <Group justify="space-between">
                            <Text fw={700}>Thể loại: </Text>
                            <Text>{data?.categories.type_name}</Text>
                        </Group>

                        <Group justify="space-between">
                            <Text fw={700}>Mô tả: </Text>
                            <Text>{data.description}</Text>
                        </Group>

                        <Group justify="space-between">
                            <Text fw={700}>Giá: </Text>
                            <Text>{data.price}</Text>
                        </Group>

                        <Group justify="space-between">
                            <Text fw={700}>Số lượng: </Text>
                            <Text>{data.quantity}</Text>
                        </Group>
                    </Stack>
                </Grid.Col>
            </Grid>

            <Stack mt={50}>
                <Text className={classes.title}>Đánh giá sản phẩm</Text>

                <Stack>
                    <Group>
                        <Avatar color="cyan" radius="xl">B</Avatar>
                        <Text>Bạn</Text>
                    </Group>
                    <Rating
                        value={rating}
                        onChange={e => setRating(e)}
                    />
                    <TextInput
                        placeholder="Viết bình luận"
                        className={classes.comment}
                        value={review}
                        onChange={e => setReview(e.target.value)}
                    />
                    <Group justify="end">
                        <Button
                            onClick={handleCreateReview}
                            disabled={loadReview || rating <= 0 || review.length === 0}
                        >Bình luận</Button>
                    </Group>
                </Stack>

                <Stack gap={16} mt={30}>
                    {
                        (dataReview?.data || []).map(r =>
                            <Comment
                                key={r.id}
                                id={r.id}
                                user_id={r.user_id}
                                rating={r.rating}
                                comment={r.comment}
                                me={false}
                                cbDelete={() => refetchReview()}
                            />
                        )
                    }
                </Stack>
            </Stack>
        </Stack>
    )
}

export default DetailBook;