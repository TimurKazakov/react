import React from 'react';
import classes from './ActiveQuiz.css'
import AnswersList from "../AnswersList/AnswersList";

class ActiveQuiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }



    render() {
        return (
            <div className={classes.ActiveQuiz}>
                <p className={classes.Question}>
                    <span>
                        <strong>{this.props.answerNumber}.</strong>&nbsp;
                        {this.props.question}
                    </span>
                    <small>{this.props.answerNumber} из {this.props.quizLenght}</small>
                </p>

                <AnswersList answers={this.props.answers}
                             onAnswerClick ={this.props.onAnswerClick}
                             state={this.props.state}
                />
            </div>
        );
    }
}

ActiveQuiz.propTypes = {};

export default ActiveQuiz;