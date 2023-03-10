import AuthCheck from '@/components/AuthCheck';

import styles from '../../styles/Admin.module.css';
import PostFeed from '../../components/PostFeed';
import { UserContext } from '../../lib/context';
import { firestore, auth } from '../../lib/firebase';

import { serverTimestamp } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';

const AdminPage = () => {
    return (
        <main>
            <AuthCheck>
                <PostList></PostList>
                <CreateNewPost></CreateNewPost>
            </AuthCheck>
        </main>
    );
};

const PostList = () => {
    const ref = firestore
        .collection('users')
        .doc(auth.currentUser.uid)
        .collection('posts');
    const query = ref.orderBy('createdAt');
    const [querySnapshot] = useCollection(query);

    const posts = querySnapshot?.docs.map((doc) => doc.data());

    return (
        <>
            <h1>Manage your Posts</h1>
            <PostFeed posts={posts}></PostFeed>
        </>
    );
};

const CreateNewPost = () => {
    const router = useRouter();
    const { username } = useContext(UserContext);
    const [title, setTitle] = useState('');

    const slug = encodeURI(kebabCase(title));

    const isValid = title.length > 3 && title.length < 100;

    const createPost = async (event) => {
        event.preventDefault();
        const uid = auth.currentUser.uid;
        const ref = firestore
            .collection('users')
            .doc(uid)
            .collection('posts')
            .doc(slug);

        const data = {
            title,
            slug,
            uid,
            username,
            published: false,
            content: '# hello world!',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            heartCount: 0,
        };

        await ref.set(data);

        toast.success('Post Created!');

        router.push(`/admin/${slug}`);
    };

    return (
        <form onSubmit={createPost}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Awesome Ariticle!"
                className={styles.input}
            ></input>
            <p>
                <strong>Slug:</strong> {slug}
            </p>
            <button type="submit" disabled={!isValid} className="btn-blue">
                Create New Post
            </button>
        </form>
    );
};

export default AdminPage;
