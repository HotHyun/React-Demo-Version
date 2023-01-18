import React from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetailPage = (props) => {
    return (
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        ></MeetupDetail>
    );
};

export const getStaticPaths = async () => {
    return {
        fallback: false,
        paths: [
            {
                params: {
                    meetupId: 'M1',
                },
            },
            {
                params: {
                    meetupId: 'M2',
                },
            },
        ],
    };
};

export const getStaticProps = async (context) => {
    const meetupId = context.params.meetupId;

    console.log(meetupId);

    return {
        props: {
            meetupData: {
                image: 'img/img1.jpg',
                id: meetupId,
                title: 'This is First Meeting',
                address: 'England Street 5 12345',
                description: 'England Street Landscape',
            },
        },
    };
};

export default MeetupDetailPage;
