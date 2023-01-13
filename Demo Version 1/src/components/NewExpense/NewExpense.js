import './NewExpense.css';
import ExpenseForm from './ExpenseForm';
import { useState } from 'react';

const NewExpense = (props) => {
    const callExpenseForm = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString(),
        };
        //console.log(expenseData);
        props.onNewExpense(expenseData);
    };

    const [is_Check, setis_Check] = useState(false);

    const ChangeTrue = () => {
        setis_Check(true);
    };

    const ChangeFalse = () => {
        setis_Check(false);
    };

    return (
        <div className="new-expense">
            {is_Check ? (
                <ExpenseForm
                    Change={ChangeFalse}
                    onExpenseForm={callExpenseForm}
                ></ExpenseForm>
            ) : (
                <button onClick={ChangeTrue}>Add New Expense</button>
            )}
        </div>
    );
};

export default NewExpense;
