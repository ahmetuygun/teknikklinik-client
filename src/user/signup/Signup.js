import React, {Component} from 'react';
import {checkEmailAvailability, checkUsernameAvailability, signup} from '../../util/APIUtils';
import './Signup.css';
import {Link} from 'react-router-dom';
import {
    EMAIL_MAX_LENGTH,
    NAME_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PHONE_MAX_LENGTH
} from '../../constants';
import {cities} from './Cities';


import {Button, Form, Input, notification, Select} from 'antd';
import {Grid} from "semantic-ui-react";

const Option = Select.Option;
const FormItem = Form.Item;

class Signup extends Component {
    constructor(props) {
        super(props);
        if(this.props.signupRequest.email){
            this.state = {
                name: {
                    value: this.props.signupRequest.name,
                    validateStatus : 'success'
                },
                username: {
                    value: this.props.signupRequest.username
                },
                email: {
                    value: this.props.signupRequest.email,
                    validateStatus : 'success'
                },
                password: {
                    value: this.props.signupRequest.password,
                    validateStatus :  'success'
                },
                city: {
                    value: this.props.signupRequest.city
                },
                district: {
                    value: this.props.signupRequest.district
                },
                selectedCity: cities[0],
                phone: {
                    value: this.props.signupRequest.phone
                },
                addressText: {
                    value: this.props.signupRequest.address,
                    validateStatus : 'success'
                }

            }
        }else{
            this.state = {
                name: {
                    value: ''
                },
                username: {
                    value: ''
                },
                email: {
                    value: ''
                },
                password: {
                    value: ''
                },
                city: {
                    value: cities[0].il,
                },
                district: {
                    value: cities[0].ilceleri[0],
                },
                selectedCity: cities[0],
                phone: {
                    value: 5
                },
                addressText: {
                    value: ''
                }

            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleProvinceChange = this.handleProvinceChange.bind(this);

        this.props.nextButtonVisible(false);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }



    handleSubmit(event) {
        event.preventDefault();

        const signupRequest = {
            name: this.state.name.value,
            email: this.state.email.value,
            username: 'defaultValue',
            password: this.state.password.value,
            address: this.state.addressText.value,
            phone: this.state.phone.value,
            city: this.state.city.value,
            district: this.state.district.value
        };

        this.props.getAllState(signupRequest)
        this.props.nextButtonVisible(true);

    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success' && this.state.addressText.validateStatus === 'success'
        );
    }

    handleProvinceChange = (value) => {
        this.setState({
            selectedCity: cities.filter(city =>
                city.il === value
            )[0],
            city: {value: value},
            district: {
                value: cities.filter(city =>
                    city.il === value
                )[0].ilceleri[0]
            }
        });
    }

    onSecondCityChange = (value) => {
        this.setState({
            district: {value: value}
        });
    }


    render() {
        const { TextArea } = Input;

        return (

            <Form onSubmit={this.handleSubmit} className="signup-form">
                <Grid container columns={2} relaxed stackable>
                    <Grid.Column>
                        <FormItem
                            label="Ad-Soyad"
                            validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg}>
                            <Input
                                size="large"
                                name="name"
                                autoComplete="off"
                                value={this.state.name.value}
                                onChange={(event) => this.handleInputChange(event, this.validateName)}/>
                        </FormItem>

                        <FormItem
                            label="Telefon"
                            hasFeedback
                            validateStatus={this.state.phone.validateStatus}
                            help={this.state.phone.errorMsg}>
                            <Input
                                size="large"
                                name="phone"
                                type="tel"
                                autoComplete="off"
                                value={this.state.phone.value}
                                onChange={(event) => this.handleInputChange(event, this.validatePhone)}/>
                        </FormItem>

                        <FormItem
                            label="İl/İlçe">
                            <div className="displayBlock">
                                <Select
                                    size="middle"
                                    defaultValue={cities[0].il}
                                    value={this.state.city.value}
                                    onChange={this.handleProvinceChange}>
                                    {cities.map(city => <Option value={city.il} key={city.il}>{city.il}</Option>)}
                                </Select>

                                &nbsp;&nbsp;&nbsp;
                                <Select
                                    size="middle"
                                    value={this.state.district.value}
                                    onChange={this.onSecondCityChange}>
                                    {this.state.selectedCity.ilceleri.map(district => <Option
                                        key={district}>{district}</Option>)}
                                </Select>
                            </div>

                        </FormItem>

                        <FormItem
                            label="Adres"
                            validateStatus={this.state.addressText.validateStatus}
                            help={this.state.addressText.errorMsg}>
                            <TextArea
                                size="large"
                                rows={5}
                                name="addressText"
                                autoComplete="off"
                                value={this.state.addressText.value}
                                onChange={(event) => this.handleInputChange(event, this.validateAddress)}/>
                        </FormItem>
                    </Grid.Column>

                    <Grid.Column>

                        <FormItem
                            label="Email"
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input
                                size="large"
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder="e-mail adresiniz"
                                value={this.state.email.value}
                                onBlur={this.validateEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)}/>
                        </FormItem>
                        <FormItem
                            label="Şifre"
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <Input
                                size="large"
                                name="password"
                                type="password"
                                autoComplete="off"
                                placeholder="en az 6, en çok 20 karakter"
                                value={this.state.password.value}
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)}/>
                        </FormItem>
                        <FormItem>
                            <div className="signup-form-button-div">
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="signup-form-button"
                                    disabled={this.isFormInvalid()}>Kaydet</Button>

                            </div>
                        </FormItem>
                    </Grid.Column>
                </Grid>

            </Form>


        );
    }

    // Validation Functions

    validateAddress = (address) => {
        if (address.length < 10) {
            return {
                validateStatus: 'error',
                errorMsg: `Adres metni en az 10 karakter olmalıdır.`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateName = (name) => {
        if (name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Çok kısa  en az ${NAME_MIN_LENGTH} karakter olmalı.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateEmail = (email) => {
        if (!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email alanı boş olamaz.'
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Lütfen geçerli bir email adresi girin.'
            }
        }

        if (email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Çok uzun, en fazla ${EMAIL_MAX_LENGTH} karakter olmalı.`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validatePhone = (phone) => {
        if (!phone) {
            return {
                validateStatus: 'error',
                errorMsg: 'Lütfen telefon numarası girin'
            }
        }

        const PHONE_REGEX = RegExp('^[1-9]{1}[0-9]{9}$');
        if (!PHONE_REGEX.test(phone)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Lütfen, başına 0 koymadan 10 haneli olarak girin'
            }
        }

        if (phone.length > PHONE_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Lütfen, maksimum ${PHONE_MAX_LENGTH} 10 haneli olarak girin)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }


    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if (usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
            .then(response => {
                if (response.available) {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'error',
                            errorMsg: 'This username is already taken'
                        }
                    });
                }
            }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if (emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
            .then(response => {
                if (response.available) {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'error',
                            errorMsg: 'daha önce bu email adresi ile kullanıcı oluşturuldu. '
                        }
                    });
                }
            }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validatePassword = (password) => {
        if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Şifre en az ${PASSWORD_MIN_LENGTH} karakter olmalı`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Şifre en çok ${PASSWORD_MAX_LENGTH} karakter olmalıdır.`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

}

export default Signup;
