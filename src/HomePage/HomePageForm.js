import React, {Component} from 'react';
import {AutoComplete, Icon, Input} from 'antd';
import './HomePageCss.css';
import {phones} from './PhoneList';
import { Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

const Option = AutoComplete.Option;

class HomePageForm extends Component {

    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: [],
            selectedPhoneLabel: '',
            selectedPhoneId: '',
            dataSource: [],

        };
    }


    handleSearch = (value) => {

        const inputValue = value.trim().toLowerCase();

        this.setState({
            dataSource: !inputValue ? [] : phones.filter(lang =>
                lang.label.toLowerCase().includes(inputValue)
            ).slice(0, 5)
        });
    }

    renderOption(item) {
        return (
            <Option key={item.id} text={item.label}>
                {item.label}
            </Option>
        );
    }

    onChange = (event, {newValue}) => {
        this.setState({
            value: newValue
        });
    };



    onSelect = (value ) => {
        this.setState({
            selectedPhoneId: value
        });
    };

    render() {
        return (
            /*{<Button primary as={Link} to={"/newRequestForm/" + this.state.selectedPhoneId} >Fiyatları Gör</Button>}*/
            <div className="global-search-wrapper">
                <AutoComplete
                    className="global-search"
                    size="large"
                    dataSource={this.state.dataSource.map(this.renderOption)}
                    onSelect={this.onSelect}
                    onSearch={this.handleSearch}
                    placeholder="Örnek Samsung Note 8"
                    optionLabelProp="text"
                >
                    <Input
                        suffix={(
                            <Button primary as={Link} to={"/newRequestForm/" + this.state.selectedPhoneId} >Fiyatları Gör</Button>
                        )}
                    />
                </AutoComplete>

            </div>

        );
    }
}

HomePageForm.propTypes = {};

export default HomePageForm;
