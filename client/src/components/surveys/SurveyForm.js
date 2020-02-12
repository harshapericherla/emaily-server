import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    {label:"Survey Title",name:'title'},
    {label:"Subject",name:'subject'},
    {label:"Email Body",name:'body'},
    {label:"Recipient List",name:'emails'}
]


class SurveyForm extends Component {

    renderFields = () => {
        let key = 0;
        return _.map(FIELDS, ({label,name}) => {
            return <Field component={SurveyField} type="text" label={label} name={name} key = {key++}/>
        });
    }

    render() {
        return (
            <div>
                <form onSubmit = {this.props.handleSubmit(values => console.log(values))}>
                  {this.renderFields()}
                  <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
                  <button type="submit" className="teal btn-flat right white-text">
                     Next
                     <i className="material-icons right">done</i>
                  </button>
                </form>
            </div>
        )
    }
}

function validate(values){
    const errors = {};
    
    _.each(FIELDS, ({name}) => {
        if(!values[name]){
            errors[name] = `You must provide ${name}`
        }
    })

    errors.emails = validateEmails(values.emails || '');

    return errors;
 }

export default reduxForm({
    validate,
    form:'surveyForm'
})(SurveyForm);
