import React from 'react';
import { uniqueId } from 'lodash';
import classes from './Input.module.css';

const isInvalid = ({ valid, shouldValidate, touched }) => !valid && shouldValidate && touched;

const Input = props => {
    const inputType = props.type || 'text';
    const invalid = isInvalid(props) ? classes.invalid : null;
    const cls = [classes.Input, invalid];
    const htmlFor = `${inputType}-${uniqueId()}`;
    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{ props.label }</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />

            { isInvalid(props)
                ? <span>{props.errorMessage}</span>
                : null
            }
        </div>
    );
};

export default Input;
