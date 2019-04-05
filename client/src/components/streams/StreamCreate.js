import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
 
class StreamCreate extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }
    
    //Must be arrow function since it is both taking in a function and being called upon
    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;
        
        return (
            <div className={className}>
                <label>{label}</label>
                <input 
                    /* onChange={formProps.input.onChange}
                    value={formProps.input.value} */
                    {...input} autoComplete="off"
                />
                {this.renderError(meta)}
            </div>   
        );
    }

    onSubmit = formValues => {
        //Without Redux
        //event.preventDefault();  
        this.props.createStream(formValues);
    }

    render() {
        return (
            <div>
                <form 
                    onSubmit={this.props.handleSubmit(this.onSubmit)} 
                    className="ui form error"
                >
                    <Field 
                        name="title" 
                        component={this.renderInput} 
                        label="Enter Title" 
                    />
                    <Field 
                        name="description" 
                        component={this.renderInput}  
                        label="Enter Description" 
                    />
                    <button className="ui button positive">Submit</button>
                </form>
            </div>
        );  
    }
    
};

//Validate form values. No empty values!!!
const validate = formValues => {
    const errors = {}

    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
}

const formWrapped =  reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped)