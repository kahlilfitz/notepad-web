import React from 'react';

const api = {
    login: async ( user, password ) => {
	console.log( 'Clicked Login', user, password );
	try {
	    const res = await fetch(
		'https://notepad-rest.appspot.com'
	    );

	    console.log( 'Response came back', res );
	} catch( err ) {
	    console.log( 'Error: ', err );
	}
	// Check for user in db
	// Check if password matches
    },
    register: async ( user, password ) => {
	console.log( 'Clicked Register', user, password );
	// Check if username already exists
	// Insert new user into DB
    }
}

export default api;
