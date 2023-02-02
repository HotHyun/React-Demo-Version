import Head from 'next/head';

const MetaTags = ({ title, description }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title}></meta>
            <meta property="og:description" content={description}></meta>
        </Head>
    );
};

export default MetaTags;
