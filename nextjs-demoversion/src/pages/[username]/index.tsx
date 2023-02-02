import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';
import { getUserWithUsername } from '@/lib/firebase';
import { postToJSON } from '@/lib/firebase';

export const getServerSideProps = async ({ query }) => {
    const { username } = query;

    const userDoc = await getUserWithUsername(username);

    if (!userDoc) {
        return {
            notFound: true,
        };
    }

    let user = null;
    let posts = null;

    if (userDoc) {
        user = userDoc.data();
        const postsQuery = userDoc.ref
            .collection('posts')
            .where('published', '==', true) // 정렬
            .orderBy('createdAt', 'desc') // 정렬
            .limit(5); // 5개까지

        posts = (await postsQuery.get()).docs.map(postToJSON);
    }

    return {
        props: { user, posts },
    };
};

const UserProfilePage = ({ user, posts }) => {
    return (
        <main>
            <UserProfile user={user}></UserProfile>
            <PostFeed posts={posts}></PostFeed>
        </main>
    );
};

export default UserProfilePage;
