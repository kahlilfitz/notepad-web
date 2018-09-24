import React from 'react';
import { Field, reduxForm } from 'redux-form';

export const NoteList = props => {
    const { isLoggedIn, data, onLoad } = props;
    if ( !isLoggedIn || !data) { return null };
    console.log( 'data:\n', data);
    return (
	    <form key='uniqueFormKey'>
	    <div>
	    <label>Saved Notes</label>
	    <div>
	    <Field name="savedNotes" component="select">
	    <option value="">Select a note...</option>
	{
	    
		data && data.map && data.map( noteData => (
			<option value={ noteData.id } key={ noteData.id }>
			{ noteData.title }
		    </option>
		))
	}
	</Field>
	    </div>
	    </div>
	    <div>
	    <button type="button" onClick={ onLoad }>
	    Load
	</button>
	    </div>
	    </form>
    )
}

export default reduxForm({
    form: 'notelist'
})(NoteList);
