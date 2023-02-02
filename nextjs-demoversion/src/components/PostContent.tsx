import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

const PostContent = ({ post }) => {
    const createdAt =
        typeof post?.createdAt === 'number'
            ? new Date(post.createdAt)
            : post.createdAt.toDate();

    return (
        <div className="card">
            <h1>{post?.title}</h1>
            <span className="text-sm">
                Written by{' '}
                <Link href={`/${post.username}/`}>
                    <b className="text-info">@{post.username}</b>
                </Link>{' '}
                on {createdAt.toISOString()}
            </span>

            <ReactMarkdown>{post?.content}</ReactMarkdown>
        </div>
    );
};

export default PostContent;
