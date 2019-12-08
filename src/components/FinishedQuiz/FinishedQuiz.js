import React from 'react';
import classes from './FinishedQuiz.css'
import Button from "../UI/Button/Button";
import {Link} from 'react-router-dom'

class FinishedQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const successCount=Object.keys(this.props.results).reduce((total, key)=>{
            if (this.props.results[key]==='success'){
                total++;
            }
            return total;
        },0);


        return (
            <div className={classes.FinishedQuiz}>
                <ul>
                {this.props.quiz.map((quizItem, index)=>{
                    const cls = ['fa',
                        this.props.results[quizItem.id]==='error'?'fa-times' :'fa-check',
                    classes[this.props.results[quizItem.id]]
                    ];
                    console.log(classes[this.props.results[quizItem.id]]);

                   return(<li key={index}>
                       <strong>{index+1}</strong>.&nbsp;
                       {quizItem.question}
                       <i className={cls.join(' ')} />
                   </li>)

                })}
                </ul>

                <p>Правильно {successCount} из {this.props.quiz.length}</p>
                <div>
                    <Button onClick={this.props.onRetry} type={'primary'}>Повторить</Button>

                  <Link to={'/'}> <Button onClick={this.props.onRetry} type={'success'}>Перейти в список текстов</Button></Link>
                </div>
            </div>
        );
    }
}

FinishedQuiz.propTypes = {};

export default FinishedQuiz;