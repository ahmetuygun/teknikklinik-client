import React, {Component} from 'react';
import { Button, Icon } from 'semantic-ui-react'


import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import './HomePageCss.css';
import {languages} from './PhoneList';



const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : languages.filter(lang =>
            lang.label.toLowerCase().includes(inputValue)
        //lang.label.toLowerCase().slice(0, inputLength).includes(inputValue)
    ).slice(0,10);
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.label;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.label}
    </div>
);

class HomePageForm extends Component {

    constructor() {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: '',
            suggestions: [],
            selectedPhoneLabel : '',
            selectedPhoneId : ''
        };
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };


    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

     onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {

         this.setState({
             selectedPhoneLabel: suggestionValue,
             selectedPhoneId : languages.filter(lang =>
                     lang.label === suggestionValue
             )[0].id
         });

     }


    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    render() {

        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Örn. Samsung Note 8',
            value,
            onChange: this.onChange
        };

        return (
            <div class="alignDiv">

                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected ={this.onSuggestionSelected}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
                <Button primary>Fiyatları Gör</Button>


            </div>
        );
    }
}

HomePageForm.propTypes = {};

export default HomePageForm;
