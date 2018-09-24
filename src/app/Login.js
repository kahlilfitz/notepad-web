import React from 'react';
import { Field, reduxForm } from 'redux-form';

export const Login = props => {
    const { onLogin, onRegister, isLoggedIn } = props;

    if ( isLoggedIn ) { return null };
    
    return (
	<form>
	    <div>
	    <label>Username</label>
	    <div>
	    <Field
	name="userName"
	component="input"
	type="text"
	placeholder="username"
	    />
	    </div>
	    </div>
	    <div>
	    <label>Password</label>
	    <div>
	    <Field
	name="password"
	component="input"
	type="password"
        placeholder="password"
	    />
	    </div>
	    </div>
	    <div>
	    <button type="button" onClick={ onLogin }>
	    Login
	</button>
	    <button type="button" onClick={ onRegister }>
	    Register
	</button>
	    </div>
	    </form>
    );
}

export default reduxForm({
    form: 'login'
})(Login);

