import React from 'react';
import LoginScreen from './Login';
import NoteComposeView from './NoteWriter';
import NoteListView from './NoteList';
import api from './api';
import { formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';
import { login, save, reset, load } from './reducer';

export const Notepad = props => {
    const {
	user,
	username,
	password,
	isLoggedIn,
	userLoggedIn,
	noteTitle,
	noteContent,
	note,
	noteSaved,
	newNote,
	noteToLoad,
	noteData,
	notesLoaded,
	loadedNote,
	setNoteTitle,
	setNoteContent
    } = props;

    const handleLogin = async () => {
	let resLogin = await api.login(username, password);
	// console.log( 'resLogin:\n', resLogin);
	if ( !resLogin.id ) {
	    window.alert( resLogin.error ?
			  resLogin.error
			  :  'User/Pass not found!');
	} else {
	    let noteJson = await api.load( resLogin.id );
	    notesLoaded( noteJson );
	    userLoggedIn( resLogin );
	}
    }

    const handleRegister = async () => {
	let resRegister = await api.register(username, password);
	// console.log( 'resRegister:\n', resRegister);
	if ( !resRegister.id ) {
	    window.alert( resRegister.error ?
			  resRegister.error
			  : 'Something went wrong, please try another username!');
	} else {
	    userLoggedIn( resRegister );
	}
    }

    const handleSave = async () => {
	//If the note has been saved or loaded, update on save
	if ( note && note.id ) {
	    await updateNote();
	} else {
	    await saveNote();
	}
	
	let noteJson = await api.load( user.id );
	notesLoaded( noteJson );
    }

    const updateNote = async () => {
	let updateRes = await api.update( note.id, noteTitle, noteContent );
	if ( !updateRes.updated ) {
	    window.alert( updateRes.error ?
			  updateRes.error
			  : 'An error occured while updating, please try again'
			);
	} else {
	    window.alert( `${noteTitle} updated successfully` );
	}
    }

    const handleLoad = () => {
	console.log( 'Clicked Load for:\n',  noteToLoad );
	const noteForLoad = noteData.find( (noteItem) => {
	    console.log( `Checking ${noteItem.id} === ${noteToLoad}` );
	    const bReturn = parseInt( noteItem.id, 10 ) === parseInt( noteToLoad, 10); 
	    console.log( 'Returning: ', bReturn);
	    return bReturn;
	});

	setNoteTitle( noteForLoad.title );
	setNoteContent( noteForLoad.content );
	noteSaved( noteForLoad );
    }
    
    const saveNote = async () => {
	let saveRes = await api.save( user.id, noteTitle, noteContent );
	if ( !saveRes.id ) {
	    window.alert( saveRes.error ?
			  saveRes.error
			  : 'An error occured whild saving, please try again');
	} else {
	    noteSaved( saveRes );
	    window.alert( `${noteTitle} saved successfully` );
	}
    }

    return (
	    <div>
	    <LoginScreen
	onLogin={ handleLogin }
	onRegister={ handleRegister }
	isLoggedIn={ isLoggedIn }
	    />
	    <NoteComposeView
	onNew={ newNote }
	onSave={ handleSave }
	isLoggedIn={ isLoggedIn }
	noteToLoad={ loadedNote }
	    />
	    <NoteListView
	data={ noteData }
	isLoggedIn={ isLoggedIn }
	onLoad={ handleLoad }
	/>
	    </div>
    );
}

const loginFormSelector = formValueSelector( 'login' );
const noteWriterFormSelector = formValueSelector( 'notewriter' );
const noteListFormSelector = formValueSelector( 'notelist' );
const mapStateToProps = state => ({
    username: loginFormSelector( state, 'userName' ),
    password: loginFormSelector( state, 'password' ),
    noteTitle: noteWriterFormSelector( state, 'noteTitle' ),
    noteToLoad: noteListFormSelector( state, 'savedNotes' ),
    noteContent: noteWriterFormSelector( state, 'noteContent' ),
    isLoggedIn: state.login.isLoggedIn,
    user: state.login.user,
    note: state.noteWriter.note,
    noteData: state.noteWriter.noteData,
    loadedNote: state.noteWriter.loadedNote
});

const mapDispatchToProps = dispatch => (
    {
	userLoggedIn: user => { dispatch( login(user) ) },
	noteSaved: note => { dispatch( save(note) ) },
	newNote: () => { dispatch( reset() ) },
	notesLoaded: notes => { dispatch( load( notes ) ) },
	setNoteTitle: title => { dispatch(
	    change( 'notewriter', 'noteTitle', title ) ) },
	setNoteContent: content => { dispatch(
	    change( 'notewriter', 'noteContent', content ) ) }
    }
)

export default connect( mapStateToProps, mapDispatchToProps )( Notepad );
