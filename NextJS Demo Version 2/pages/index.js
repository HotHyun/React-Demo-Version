import React from 'react';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_ITEMS = [
    {
        id: 'M1',
        title: 'This is First Meeting',
        image: 'img/img1.jpg',
        address: 'England Street 5 12345',
        description: "England Street's landscape",
    },
    {
        id: 'M2',
        title: 'This is Second Meeting',
        image: 'img/img1.jpg',
        address: 'England Street 10 12345',
        description: "England Street's landscape",
    },
];

const HomePage = (props) => {
    return <MeetupList meetups={props.meetups}></MeetupList>;
};

export const getStaticProps = async () => {
    return {
        props: {
            meetups: DUMMY_ITEMS,
        },
        revalidate: 1,
    };
};

/*export const getServerSideProps = async (context) => {
    const req = context.req;
    const res = context.res;

    return {
        props: {
            meetups: DUMMY_ITEMS,
        },
    };
};*/

export default HomePage;
