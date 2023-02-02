import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';
import useUserData from '@/lib/hooks';
//import { auth } from '@/lib/firebase';

function MyApp({ Component, pageProps }: AppProps) {
    const userData = useUserData();
    return (
        <UserContext.Provider value={userData as any}>
            <NavBar></NavBar>
            <Component {...pageProps} />
            <Toaster></Toaster>
        </UserContext.Provider>
    );
}

export default MyApp;
