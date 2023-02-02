import Link from 'next/link';
//import Image from 'next/image';
import { UserContext } from '@/lib/context';
import { useContext } from 'react';

const NavBar = () => {
    const { user, username } = useContext(UserContext);

    const NameURL = '/' + `${username}`;

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href="/">
                        <button className="btn-logo">FEED</button>
                    </Link>
                </li>
                {username && (
                    <>
                        <li className="push-left">
                            <Link href="/admin">
                                <button className="btn-blue">
                                    Write Posts
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href={NameURL}>
                                <img
                                    src={user?.photoURL}
                                    alt="This is Profile"
                                    width={500}
                                    height={500}
                                ></img>
                            </Link>
                        </li>
                    </>
                )}
                {!username && (
                    <li>
                        <Link href="/enter">
                            <button className="btn-blue">Log In</button>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
