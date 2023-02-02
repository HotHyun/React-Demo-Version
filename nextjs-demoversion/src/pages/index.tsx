import Loader from '../components/Loader';
import { useState } from 'react';
//import { toast } from 'react-hot-toast';
import { firestore } from '@/lib/firebase';
import { postToJSON } from '@/lib/firebase';
import PostFeed from '@/components/PostFeed';
import { fromMillis } from '@/lib/firebase';
import MetaTags from '@/components/Metatags';

const LIMIT = 1;

export const getServerSideProps = async () => {
    const postsQuery = firestore
        .collectionGroup('posts')
        .where('published', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(LIMIT);

    const posts = (await postsQuery.get()).docs.map(postToJSON);

    return {
        props: { posts },
    };
};

const Page = (props) => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState(props.posts);
    const [postsEnd, setPostsEnd] = useState(false);

    const getMorePosts = async () => {
        setLoading(true);
        const last = posts[posts.length - 1];
        const cursor =
            typeof last.createdAt === 'number'
                ? fromMillis(last.createdAt)
                : last.createdAt;

        const query = firestore
            .collectionGroup('posts')
            .where('published', '==', true)
            .orderBy('createdAt', 'desc')
            .startAfter(cursor)
            .limit(LIMIT);

        const newPosts = (await query.get()).docs.map((doc) => doc.data());

        setPosts(posts.concat(newPosts));
        setPostsEnd(false);

        if (newPosts.length < LIMIT) {
            setPostsEnd(true);
        }
    };

    return (
        <main>
            <MetaTags
                title="admin page"
                description="This is admin page"
            ></MetaTags>
            <PostFeed posts={posts}></PostFeed>
            {!loading && !postsEnd && (
                <button onClick={getMorePosts}>Load more</button>
            )}

            <Loader show={loading}></Loader>

            {postsEnd && 'You have reached the end!'}
        </main>
    );
};

export default Page;
