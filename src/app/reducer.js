import { createActions, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export const {
    login,
    logout,
    save,
    reset,
    load,
    set
}  = createActions (
    {
	LOGIN: user => ( { user } ),
	LOGOUT: () => ( { } ),
	SAVE: note => ( { note } ),
	RESET: () => ( { } ),
	LOAD: notes => ( { notes} ),
	SET: note => ( { note } )
    }
);

const loginReducer = handleActions (
    {
	[login]: ( state, { payload: { user } } ) => (
	    { ...state,
	      user,
	      isLoggedIn: true
	    }
	),
	[logout]: state => (
	    {	...state,
		user: {},
		isLoggedIn: false
	    }
	)
    },
    {
	    user: {},
	    isLoggedIn: false
    }
);

const noteReducer =  handleActions (
    {
	[save]: ( state, { payload: { note } } ) => (
	    { ...state,
	      note
	    }
	),
	[reset]: state => (
	    { ...state,
	      note: {}
	    }
	),
	[load]: ( state, { payload: { notes } } ) => (
	    { ...state,
	      noteData: notes
	    }
	),
	[set]: ( state, { payload: { note } } ) => (
	    { ...state,
	      loadedNote: note
	    }
	)
    },
    {
	note: {},
	noteData: {}
    }
);

export default combineReducers({
    form: formReducer, 
    login: loginReducer,
    noteWriter: noteReducer
});
