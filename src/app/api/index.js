const postHelper = async ( endpoint, body, method='POST' ) => {
    let res = await fetch(`${URL}/${endpoint}`, {
	method,
	headers: {
	    Accept: 'application/json',
	    'Content-Type': 'application/json'
	},
	body: JSON.stringify( body )
    });
    let resJson = await res.json();
    console.log( `${endpoint} response:\n`, resJson);
    return resJson;
}

const URL = 'https://notepad-rest.appspot.com';

const api = {
    load: async userId => {
	console.log( 'Loading notes for user_id: ', userId);
        try {
	    let res = await fetch(`${URL}/user/${userId}/notes`);
	    let resJson = await res.json();
	    return resJson;
	} catch( err ) {
	    console.log( 'Load err:\n', err );
	    return err
	}
    },
    login: async ( username, password ) => {
	console.log( 'Clicked Login', username, password );
	const body = { username, password };
	try {
	    let resJson = await postHelper( 'session', body )
	    return resJson;
	} catch( err ) {
	    console.log( 'Login err:\n', err );
	    return err;
	}
    },
    register: async ( username, password ) => {
	console.log( 'Clicked Register', username, password );
	// Insert new user into DB
	const body = { username, password };
	try {
	    let resJson = await postHelper( 'user', body );
	    return resJson;
	} catch( err ) {
	    console.log( 'Register error:\n', err);
	    return err;
	}
    },
    save: async ( userId, noteTitle, noteContent ) => {
	console.log( 'Saving:\n', userId, noteTitle, noteContent );
	const body = { userId, noteTitle, noteContent };
	try {
	    let resJson = await postHelper( 'note', body );
	    console.log( 'Save response:\n', resJson);
	    return resJson;
	} catch( err ) {
	    console.log( 'Save error:\n', err);
	    return err;
	}
    },
    update: async ( noteId, noteTitle, noteContent ) => {
	const body = { noteTitle, noteContent };
	try {
	    let resJson = await postHelper( `note/${noteId}`, body, 'PUT' );
	    console.log( 'Update response:\n', resJson);
	    return resJson;
	} catch( err ) {
	    console.log( 'Update error:\n', err);
	    return err;
	}
    }
}

export default api;
