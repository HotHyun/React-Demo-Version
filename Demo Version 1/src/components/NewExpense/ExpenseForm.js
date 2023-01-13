import './ExpenseForm.css';

import React, { useState } from 'react';

const ExpenseForm = (props) => {
    const [O_EventTitle, setO_EventTitle] = useState('');
    const [O_EventAmount, setO_EventAmount] = useState('');
    const [O_EventDate, setO_EventDate] = useState('');
    /*const [O_userInput, setO_userInput] = useState({
       userTitle: '',
       userAmount: '',
       userData: '', 
    });*/

    const EventTitle = (event) => {
        setO_EventTitle(event.target.value);
        /*setO_userInput({
            ...O_userInput,
            userTitle: event.target.value,
        });*/
        console.log(event.target.value);
    };
    const EventAmount = (event) => {
        setO_EventAmount(event.target.value);
        /*setO_userInput({
            ...O_userInput,
            userAmount: event.target.value,
        })*/
        console.log(event.target.value);
    };
    const EventDate = (event) => {
        setO_EventDate(event.target.value);
        /*setO_userInput({
            ...O_userInput,
            userData: event.target.value,
        })*/
        console.log(event.target.value);
    };

    const SubmitHandler = (event) => {
        event.preventDefault();

        const expenseData = {
            title: O_EventTitle,
            amount: +O_EventAmount,
            date: new Date(O_EventDate),
        };
        //console.log(expenseData);
        props.onExpenseForm(expenseData);
        setO_EventTitle('');
        setO_EventAmount('');
        setO_EventDate('');
    };

    return (
        <form onSubmit={SubmitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input
                        type="text"
                        value={O_EventTitle}
                        onChange={EventTitle}
                    ></input>
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={O_EventAmount}
                        onChange={EventAmount}
                    ></input>
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input
                        type="date"
                        min="2019-01-01"
                        max="2022-12-31"
                        value={O_EventDate}
                        onChange={EventDate}
                    ></input>
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="button" onClick={props.Change}>
                    Cancel
                </button>
                <button type="submit">Add Expense</button>
            </div>
        </form>
    );
};

export default ExpenseForm;
