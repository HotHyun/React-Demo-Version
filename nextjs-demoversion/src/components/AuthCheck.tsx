import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '@/lib/context';
//import { isPropertySignature } from 'typescript';

const AuthCheck = (props) => {
    const { username } = useContext(UserContext);

    return username
        ? props.children
        : props.fallback || (
              <Link href="/enter">
                  <button className="btn-blue">You Must be Signed</button>
              </Link>
          );
};

export default AuthCheck;
