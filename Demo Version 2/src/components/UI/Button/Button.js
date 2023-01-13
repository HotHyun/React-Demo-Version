import React from 'react';

import styles from './Button.module.css';

//import styled from 'styled-components';

const Button = (props) => {
    return (
        <button
            type={props.type}
            className={styles.button}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default Button;
