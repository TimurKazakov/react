import React, {Fragment} from 'react';
import classes from './Drawer.css'
import BackDrop from "../../UI/BackDrop/BackDrop";

import {NavLink} from 'react-router-dom';





class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    clickHandler=()=>{
        this.props.onClose();
    }
    renderLinks(links){
        return links.map((link, index)=>{
            return <li key={index}>
                <NavLink to={link.to} exact={link.exact} activeClassName={classes.active}
                onClick={this.clickHandler}
                > {link.label}</NavLink>

            </li>
        })

}
    render() {
        const cls=[classes.Drawer];
        if (!this.props.isOpen){
            cls.push(classes.close)
        }

        const links=[
            {to:'/', label:'Список',exact:true},

        ];
        if (this.props.isAuthenticated){
            links.push( {to:'/quiz-creator', label:'Создать тест',exact:false});
            links.push( {to:'/logout', label:'Выйти',exact:false});
        } else {
            links.push( {to:'/auth', label:'Авторизация',exact:false});
        }

        return (
            <Fragment>
            <nav className={cls.join(' ')}>
                <ul>

                    {this.renderLinks(links)}
                </ul>
            </nav>
                {this.props.isOpen? <BackDrop onClick={this.props.onClose} /> :null }
            </Fragment>
        );
    }
}

Drawer.propTypes = {};

export default Drawer;