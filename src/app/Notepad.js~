import React from 'react';
import LoginScreen from './Login';
import api from './api';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

export const Notepad = props => {
    const { user, password } = props;
    
    const handleLogin = () => {
	api.login(user, password);
    }

    const handleRegister = () => {
	api.register(user, password);
    }
    
    return (
	    <div>
	    <LoginScreen onLogin={ handleLogin }  onRegister={ handleRegister }/>
	    </div>
    );
}

const loginFormSelector = formValueSelector( 'login' );

const mapStateToProps = state => ({
    user: loginFormSelector( state, 'userName' ),
    password: loginFormSelector( state, 'password' )
});

export default connect( mapStateToProps )( Notepad );
