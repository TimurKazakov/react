import React, {Fragment} from 'react';
import classes from './QuizCreator.css'
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from  '../../form/formFramework';
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";

function createOptionControl(number) {
    return createControl({
        label:`Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number,
    },{required: true})
}
function createFormControls() {
    return {
        question:createControl({
            label:'Введите вопрос',
            errorMessage:"Вопрос не может быть пустым",
        }, {required:true}),
        option1:createOptionControl(1),
        option2:createOptionControl(2),
        option3:createOptionControl(3),
        option4:createOptionControl(4),

    }
}


class QuizCreator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            quiz:[],
            isFormValid:false,
            rightAnswerId:1,
            formControls:createFormControls(),

        };

    }

    changeHandler=(value, formControlName)=>{
        const formControls={...this.state.formControls};
        const control = {...formControls[formControlName]};

        control.touched=true;
        control.value=value;
        control.valid = validate(control.value, control.validation);
        formControls[formControlName]= control;
        this.setState({
            formControls,
            isFormValid : validateForm(formControls),
        })

    }

    renderControls(){
        return Object.keys(this.state.formControls).map((formControlName, index)=>{
           let control=this.state.formControls[formControlName];
           return(
               <Fragment key={formControlName+index}>
               <Input

                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={event=>this.changeHandler(event.target.value, formControlName)}
               />
            {index ===0 ? <hr/> : null}
               </Fragment>
           )
        })
    }

    submitHandler(event){

    }
    createQuizHandler=  (event)=>{
        event.preventDefault();

            this.setState({
                quiz:[],
                isFormValid:false,
                rightAnswerId:1,
                formControls:createFormControls(),
            })
            this.props.finishCreateQuiz();



    }
    addQuestionHandler=(event)=>{
        event.preventDefault();

        const quiz= this.state.quiz.concat();
        const {question, option1, option2,option4,option3} = this.state.formControls;
        const questionItem ={
            question:question.value,
            id:this.props.quiz.length+1,
            rightAnswerId: this.state.rightAnswerId,
            answers:[
                {text:option1.value, id:option1.id},
                {text:option2.value, id:option2.id},
                {text:option3.value, id:option3.id},
                {text:option4.value, id:option4.id},
            ]
        };
        this.props.createQuizQuestion(questionItem)
        this.setState({
            quiz,
            isFormValid:false,
            rightAnswerId:1,
            formControls:createFormControls(),
        })


    }
    selectChangeHandler=(event)=>{
        this.setState({rightAnswerId : +event.target.value})
    }
    render() {

        const select = <Select label={'Выберите правильный ответ'}
         value={this.state.rightAnswerId}
                               onChange={this.selectChangeHandler}
                               options={[
                                   {text:1,value:1},
                                   {text:2,value:2},
                                   {text:3,value:3},
                                   {text:4,value:4},
                                   ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}

                        {select}
                        <Button disabled={!this.state.isFormValid} type={'primary'} onClick={this.addQuestionHandler}>Добавить Вопрос</Button>
                        <Button disabled={this.props.quiz.length===0} type={'success'} onClick={this.createQuizHandler}>Создать тест</Button>

                    </form>
                </div>
            </div>
        );
    }
}

QuizCreator.propTypes = {};
function mapStateToProps(state) {
  return {
   quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
   createQuizQuestion : (item) => dispatch(createQuizQuestion(item)),
   finishCreateQuiz : () => dispatch(finishCreateQuiz()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizCreator);