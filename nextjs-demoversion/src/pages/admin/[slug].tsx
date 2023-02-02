import styles from '../../styles/Admin.module.css';
import AuthCheck from '../../components/AuthCheck';
import { firestore, auth, postToJSON } from '../../lib/firebase';
import { serverTimestamp } from 'firebase/firestore';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import toast from 'react-hot-toast';

const AdminEditPage = () => {
    return (
        <AuthCheck>
            <PostManager></PostManager>
        </AuthCheck>
    );
};

const PostManager = () => {
    const [preview, setPreview] = useState(false);

    const router = useRouter();
    const { slug } = router.query;

    const postRef = firestore
        .collection('users')
        .doc(auth.currentUser.uid)
        .collection('posts')
        .doc(slug as string);

    const [post] = useDocumentData(postRef);

    return (
        <main className={styles.container}>
            {post && (
                <>
                    <section>
                        <h1>{post.title}</h1>
                        <p>ID: {post.slug}</p>

                        <PostForm
                            postRef={postRef}
                            defaultValues={post}
                            preview={preview}
                        ></PostForm>
                    </section>

                    <aside>
                        <h3>Tools</h3>
                        <button onClick={() => setPreview(!preview)}>{}</button>
                        <Link href={`/${post.username}/${post.slug}`}>
                            <button className="btn-blue">Live view</button>
                        </Link>
                    </aside>
                </>
            )}
        </main>
    );
};

const PostForm = ({ defaultValues, postRef, preview }) => {
    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues,
        mode: 'onChange',
    });

    const updatePost = async ({ content, published }) => {
        await postRef.update({
            content,
            published,
            updatedAt: serverTimestamp(),
        });

        reset({ content, published });

        toast.success('Post Updated Successfully!');
    };

    return (
        <form onSubmit={handleSubmit(updatePost)}>
            {preview && (
                <div className="card">
                    <ReactMarkdown>{watch('content')}</ReactMarkdown>
                </div>
            )}
            <div className={preview ? styles.hidden : styles.controls}>
                <textarea name="content" ref={register}></textarea>

                <fieldset>
                    <input
                        className={styles.checkbox}
                        name="published"
                        type="checkbox"
                        ref={register}
                    ></input>
                    <label>Published</label>
                </fieldset>

                <button type="submit" className="btn-blue">
                    Save Changes
                </button>
            </div>
        </form>
    );
};

export default AdminEditPage;
