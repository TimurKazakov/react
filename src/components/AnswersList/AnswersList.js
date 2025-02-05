import React from 'react';
import classes from './AnswersList.css'
import AnswerItem from "../AnswerItem/AnswerItem";

const AnswersList = props => {

        return (
            <ul className={classes.AnswersList}>
                {props.answers.map((answer, index)=>{

                    return (<AnswerItem
                        answer={answer}
                        key={index}
                        onAnswerClick={ props.onAnswerClick}
                        state={props.state ? props.state[answer.id]: null}
                    />)
                })}
            </ul>
        );

}

AnswersList.propTypes = {};

export default AnswersList;