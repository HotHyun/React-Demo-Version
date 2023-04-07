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
            <div className="bg-slate-400 py-20 px-10 grid gap-10 min-h-screen">
                <div className="bg-white p-10 rounded-3xl shadow-xl">
                    <span className="font-bold text-2xl">Select Item</span>
                    <div className="flex justify-between my-2">
                        <span className="text-gray-500">Gray Chair</span>
                        <span className="font-bold">$19</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Gray Chair</span>
                        <span className="font-bold">$19</span>
                    </div>
                    <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed font-bold">
                        <span>Total</span>
                        <span>$38</span>
                    </div>
                    <button
                        className="flex justify-center w-2/4 mt-5 mx-auto bg-blue-500
              rounded-2xl p-3 text-white
              hover:bg-blue-400  active:bg-teal-500  disabled:bg-blue-200"
                        type="button"
                    >
                        Checkout
                    </button>
                </div>
            </div>
            {postsEnd && 'You have reached the end!'}
        </main>
    );
};

export default Page;
