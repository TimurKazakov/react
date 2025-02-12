import React from 'react';
import classes from './Auth.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js';
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";




class Auth extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isFormValid:false,
            formControls:{
                email:{
                    value:'',
                    type:'email',
                    label:'Email',
                    errorMessage:'Введите корректный email',
                    valid:false,
                    touched:false,
                    validation:{
                        required:true,
                        email:true,
                    }
                },
                password:{
                    value:'',
                    type:'password',
                    label:'Password',
                    errorMessage:'Введите корректный пароль',
                    valid:false,
                    touched:false,
                    validation:{
                        required:true,
                        minLength:6,
                    }
                },
            }

        };

    }
    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
    }

    registerHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )

    }
    validateControl(value, validations){
        if (!validations){
            return true;
        }

        let isValid = true;

        if (validations.required){
            isValid = value.trim() !=='' && isValid;
        }
        if (validations.email){
            isValid= is.email(value) && isValid;
        }
        if (validations.minLength){
            isValid = value.length >= validations.minLength && isValid;
        }


        return isValid;
    }
    submitHandler =(event)=>{
        event.preventDefault()
    }
    onChangeHandler=(event, controlName)=>{

        const formControls={...this.state.formControls};
        const control = {...formControls[controlName]};
        control.value=event.target.value;
        control.touched=true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid =true;
        Object.keys(formControls).forEach(name=>{
            isFormValid = formControls[name].valid && isFormValid;
        });

        this.setState({
            formControls, isFormValid
        })
    }
    renderInputs(){
        return  Object.keys(this.state.formControls).map((controlName,index)=>{
            const control = this.state.formControls[controlName];
            return (
                <Input key={controlName+index}
                       type={control.type}
                       value={control.value}
                       valid={control.valid}
                       touched={control.touched}
                       label={control.label}
                       errorMessage={control.errorMessage}
                       shouldValidate={!!control.validation}
                       onChange={(event)=>this.onChangeHandler(event, controlName)}
                />
            )
        })


    }
    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}
                        <Button type={'success'} onClick={this.loginHandler} disabled={!this.state.isFormValid}>Войти </Button>
                        <Button type={'primary'} onClick={this.registerHandler} disabled={!this.state.isFormValid}>Зарегистрироваться </Button>

                    </form>
                </div>
            </div>
        );
    }
}



function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default  connect(null,mapDispatchToProps)(Auth);