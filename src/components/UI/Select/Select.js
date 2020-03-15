import React from 'react';
import { uniqueId } from 'lodash';
import classes from './Select.module.css';

const Select = props => {
    const htmlFor = `${props.label}--${uniqueId()}`
    return (
        <div className={classes.Select}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
                { props.options.map((option) => {
                    return (
                        <option
                            value={ option.value }
                            key={ uniqueId() }
                        >
                            { option.text }
                        </option>
                    )
                }) }
            </select>
        </div>
    );
};

export default Select;