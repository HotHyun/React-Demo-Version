import React from 'react';
import { useRouter } from 'next/router';

const DetailPage = () => {
    const router = useRouter();

    const newsId = router.query.newsId;

    return <h1>This is {newsId} Page</h1>;
};

export default DetailPage;
