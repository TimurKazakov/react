import React from 'react';
import classes from './BackDrop.css';

const BackDrop = props => {
    return (
        <div className={classes.BackDrop} onClick={props.onClick}>

        </div>
    );
}


BackDrop.propTypes = {};

export default BackDrop;