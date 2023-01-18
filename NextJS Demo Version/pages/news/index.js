import React from 'react';
import Link from 'next/link';
const NewsPage = () => {
    return (
        <React.Fragment>
            <h1>This is News Page</h1>
            <ul>
                <li>
                    <Link href="/news/NextJS Is A Great Framework">
                        NextJS Is A Great Framework
                    </Link>
                </li>
                <li>
                    <Link href="/news/Gazilab is a Best Start Up">
                        Gazilab is a Best Start-Up
                    </Link>
                </li>
            </ul>
        </React.Fragment>
    );
};

export default NewsPage;
