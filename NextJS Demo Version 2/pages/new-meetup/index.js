import React from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';

const AddMeetUp = () => {
    const router = useRouter();
    const AddHandler = async (AddingData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(AddingData),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        console.log(data);
        router.push('/');
    };
    return <NewMeetupForm onAddMeetup={AddHandler}></NewMeetupForm>;
};

export default AddMeetUp;
