import React from 'react';
import { Field, reduxForm } from 'redux-form';

export const NoteWriter = props => {
    const {
	isLoggedIn,
	reset,
	onSave,
	onNew
    } = props
    if ( !isLoggedIn ) { return null };

    return (
	    <form>
	    <div>
	    <label>Title</label>
	    <div>
	    <Field
	name="noteTitle"
	component="input"
	type="text"
	placeholder="Enter Title"
	    />
	    </div>
	    </div>
	    <div>
	    <label>Note Body</label>
	    <div>
	    <Field
	name="noteContent"
	component="textarea"
	    />
	    </div>
	    </div>
	    <div>
	    <button type="button" onClick={ () => { reset(); onNew(); } }>
	    New
	</button>
	    <button type="button" onClick={ onSave }>
	    Save
	</button>
	    </div>
	    </form>
    );

}

export default reduxForm({
    form: 'notewriter'
})(NoteWriter);
