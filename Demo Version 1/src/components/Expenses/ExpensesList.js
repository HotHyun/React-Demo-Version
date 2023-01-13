import React from 'react';

import ExpenseItem from './ExpenseItem';

import './ExpensesList.css';

const ExpenseList = (props) => {
    if (props.items.length === 0) {
        return <h2 className="expenses-list__fallback">Found No Expenses</h2>;
    }

    return (
        <ul className="expenses-list">
            {props.items.map((num) => (
                <ExpenseItem
                    key={num.id}
                    title={num.title}
                    amount={num.amount}
                    date={num.date}
                />
            ))}
            ;
        </ul>
    );
};

export default ExpenseList;
