import Card from '../UI/Card';
import './Expenses.css';
import ExpensesFilter from './ExpensesFilter';
import { useState } from 'react';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';

const Expenses = (props) => {
    const [filteredYear, setFilteredYear] = useState('2020');

    const filtering = props.items.filter((i) => {
        return i.date.getFullYear().toString() === filteredYear;
    });

    const callExpensesFilter = (value) => {
        setFilteredYear(value);
        //console.log(props.items.map((num) => num.title));
    };
    //console.log(numbers);
    //console.log(numbers.map((num) => props.items[num].title));

    return (
        <Card className="expenses">
            <ExpensesFilter
                selected={filteredYear}
                onExpensesFilter={callExpensesFilter}
            ></ExpensesFilter>
            <ExpensesChart expenses={filtering}></ExpensesChart>
            <ExpensesList items={filtering}></ExpensesList>
        </Card>
    );
};

export default Expenses;
