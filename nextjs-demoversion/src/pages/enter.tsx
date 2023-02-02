import { auth, googleAuthProvider } from '@/lib/firebase';
import Image from 'next/image';
import GoogleImage from 'public/img/google.png';
import { UserContext } from '@/lib/context';
import { useContext } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { firestore } from '@/lib/firebase';
import debounce from 'lodash.debounce';

const Page = () => {
    const { user, username } = useContext(UserContext);

    return (
        <main>
            {user ? (
                !username ? (
                    <UsernameForm></UsernameForm>
                ) : (
                    <SignOutButton></SignOutButton>
                )
            ) : (
                <SignInButton></SignInButton>
            )}
        </main>
    );
};

const UsernameForm = () => {
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    const onSubmit = async (event) => {
        event.preventDefault();

        const userDoc = firestore.doc(`users/${user.uid}`);
        const usernameDoc = firestore.doc(`usernames/${formValue}`);

        const batch = firestore.batch();
        batch.set(userDoc, {
            username: formValue,
            photoURL: user.photoURL,
            displayName: user.displayName,
        });
        batch.set(usernameDoc, { uid: user.uid });

        await batch.commit();
    };

    const onChange = (event) => {
        const val = event.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        // Only set form value if length is < 3 OR it passes regex
        if (val.length < 3) {
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }

        if (re.test(val)) {
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    };

    useEffect(() => {
        checkUsername(formValue);
    }, [formValue]);

    const checkUsername = useCallback(
        debounce(async (username: string) => {
            if (username.length >= 3) {
                const ref = firestore.doc(`usernames/${username}`);
                const { exists } = await ref.get();
                console.log('Firestore read executed!');
                setIsValid(!exists);
                setLoading(false);
            }
        }, 500),
        []
    );
    return (
        !username && (
            <section>
                <h3>Choose Username</h3>
                <form onSubmit={onSubmit}>
                    <input
                        name="username"
                        placeholder="myname"
                        value={formValue}
                        onChange={onChange}
                    />
                    <UsernameMessage
                        username={formValue}
                        isValid={isValid}
                        loading={loading}
                    />
                    <button
                        type="submit"
                        className="btn-green"
                        disabled={!isValid}
                    >
                        Choose
                    </button>

                    <h3>Debug State</h3>
                    <div>
                        Username: {formValue}
                        <br />
                        Loading: {loading.toString()}
                        <br />
                        Username Valid: {isValid.toString()}
                    </div>
                </form>
            </section>
        )
    );
};

function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
        return <p>Checking...</p>;
    } else if (isValid) {
        return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
        return <p className="text-danger">That username is taken!</p>;
    } else {
        return <p></p>;
    }
}

const SignOutButton = () => {
    const SignOutWithGoogle = () => {
        auth.signOut();
    };

    return (
        <button onClick={SignOutWithGoogle} className="btn-google">
            Sign Out
        </button>
    );
};

const SignInButton = () => {
    const SignInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    };

    return (
        <button className="btn-google" onClick={SignInWithGoogle}>
            <Image
                src={GoogleImage}
                alt="this is google image"
                width={30}
                height={30}
            ></Image>{' '}
            Sign In With Google
        </button>
    );
};

export default Page;
