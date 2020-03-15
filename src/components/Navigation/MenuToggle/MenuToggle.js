import React from "react";
import classes from './MenuToggle.module.css';

const MenuToggle = ({ onToggle, isOpen }) => {
    const menuState = isOpen ? `fa-times ${classes.open}` : 'fa-bars';
    const cls = [classes.MenuToggle, 'fa', menuState];
    return (
        <i
            className={cls.join(' ')}
            onClick={onToggle}
        />
    )
};

export default MenuToggle;