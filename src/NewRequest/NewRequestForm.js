import React, {Component} from 'react';
import {signup,saveDefect } from '../util/APIUtils';

import {Button as ButtonAnt, Input, Steps, Switch, message, Icon as IconAnt, Radio, Form,notification} from 'antd';

import {Button, Divider, Grid, Header, List, Segment, Step,Icon,Message} from 'semantic-ui-react'
import {phones} from "../HomePage/PhoneList";
import {defects} from "../HomePage/DefectList";

import {connect} from 'react-redux';
import './NewRequestForm.css';
import {fetchOffers} from '../util/APIUtils';
import Signup from "../user/signup/Signup";
import Summary from "./Summary";
import {Link} from "react-router-dom";
const FormItem = Form.Item;


class NewRequestForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPhone: '',
            selectedPhoneId : '',
            offerList: [],
            total: 0,
            userId : 0,
            defectDescription :{
              value : ''
            } ,
            deliveryStyle:2,
            iconLoading :false,
            current: 0,
            nextButton : true,
            previousButton : true,
            complateButton : true,
            
            signupRequest :{},
            saveResult : {}


        };
        this.getAllState = this.getAllState.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);


    }


    getOffer(device,defect){
        let offers;

        if(this.state.offerList.filter(item => item.defectId == defect ).length == 0)
            offers =   fetchOffers( device,defect )
            if(offers) {
                const hide = message.loading('Fiyat bilgisi getiriliyor', 0);

                offers.then(response => {
                    console.log(response);
                    if(response.ofers[0] && response.ofers[0].id)
                    this.setState({
                        offerList: [...this.state.offerList, response.ofers[0]],
                        total : this.state.total  + response.ofers[0].price
                    })

                });
                setTimeout(hide, 0);

            }else{

            }
    }

    getTotal(){

        let total = 0;
        this.state.offerList.map(
            a => total = total + a.price
        )
        return total;
    }

    removeOffer(id){

        this.setState({
            offerList: this.state.offerList.filter( elem => elem.id !== id),

        })
    }


    componentDidMount() {
        const {match} = this.props;
        this.setState(
            {
                selectedPhone: phones.filter(lang =>
                    lang.id === match.params.id
                )[0],
                selectedPhoneId : match.params.id
            }
        )
    }


    getAllState(signupRequest){

        this.setState({
            signupRequest :signupRequest,
        })
    }

    next() {

        if(this.state.current ===0) {

        }else if(this.state.current ===1) {

        }else if(this.state.current ===2) {

        }

        const current = this.state.current + 1;
        this.setState({current});

    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current,
            nextButton :true
        });

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

    validateDescription = (desc) => {
        if (desc.length < 20) {
            return {
                validateStatus: 'error',
                errorMsg: `Arıza tanımı en az 20 karakter içermelidir..`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    nextButtonVisible= (e) => {
        this.setState(
            {
                nextButton : e
            }
        );
        if(e==true){
            this.next();
        }
    }

    isDefectFormValid(){

        let defectValidation = this.state.defectDescription.validateStatus;

        if(this.state.offerList.length===0 || defectValidation !== 'success')
            return true
    }


    handleRadioButton = (e) => {
        this.setState({
            deliveryStyle: e.target.value,
        });
    }


    approve= (e) => {

        this.setState({
            iconLoading :true
        })
        signup(this.state.signupRequest)
            .then(response => {
                this.setState(
                    {
                        userId : response,
                        iconLoading :false
                    }
                );
                this.saveDefect_i(response);

            }).catch(error => {
            notification.error({
                message: 'teknikklinik.com',
                description: error.message || 'Birşeyler yanlış gitti.!'
            });
        });

    }

    saveDefect_i(userId){

        if(userId > 0){

            const  saveDefectRequest = {
                userId : this.state.userId,
                offerList :  this.state.offerList,
                total :  this.getTotal(),
                defectDescription :  this.state.defectDescription.value,
                deliveryStyle :  this.state.deliveryStyle
            }

            saveDefect(saveDefectRequest)
                .then(
                    response => {

                        this.setState({
                            saveResult : response
                        })
                        this.setState({
                            iconLoading :false
                        })
                        this.props.history.push("/approve", { trackingId  : response, name : this.state.signupRequest.name });

                    }

                )
                .catch(error => {

                    this.setState({
                        iconLoading :false
                    })
                    notification.error({
                        message: 'teknikklinik.com',
                        description: error.message || 'Birşeyler yanlış gitti.!'
                    });

                })}
    }

    render() {
        const Step = Steps.Step;
        const { current } = this.state;
        const { TextArea } = Input;
        const RadioButton = Radio.Button;
        const RadioGroup = Radio.Group;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };


        const defectForm = (
            <Grid container columns={2} relaxed stackable>
                <Grid.Column width={11}>
                    <Form>

                        <FormItem>

                            <Header as='h3' attached='top' block color='blue'>
                                {this.state.selectedPhone.label}
                                </Header>
                            <Segment attached style={{overflow: 'auto', maxHeight: 200}}>
                                <List divided verticalAlign='middle'>
                                    {defects.map( defect =>
                                        <List.Item key={defect.id}>
                                            <List.Content floated='right'>
                                                <Button basic color='blue'
                                                        onClick={() =>  this.getOffer(this.state.selectedPhoneId ,defect.id)}>
                                                    Ekle
                                                </Button>
                                            </List.Content>
                                            <List.Content>{defect.label}</List.Content>
                                        </List.Item>
                                    )}
                                </List>
                            </Segment>
                        </FormItem>
                        <Divider/>

                        <FormItem
                            hasFeedback
                            validateStatus={this.state.defectDescription.validateStatus}
                            help={this.state.defectDescription.errorMsg}>

                            <h3>Arızayı tarif eder misiniz?</h3>
                            <TextArea
                                rows={3}
                                value={this.state.defectDescription.value}
                                onChange={(event) => this.handleInputChange(event, this.validateDescription)}
                                name="defectDescription"
                            />
                        </FormItem>
                        <Divider/>

                        <FormItem>

                            <div>
                                <RadioGroup  defaultValue={2}
                                             onChange={this.handleRadioButton}
                                             value={this.state.deliveryStyle}>
                                    <RadioButton style={radioStyle}  value={1}>Telefonum adresimden alınsın(İstanbul için)</RadioButton>
                                    <RadioButton style={radioStyle}  value={2}>Kargoyla göndermek istiyorum</RadioButton>
                                </RadioGroup>
                            </div>

                        </FormItem>


                    </Form>
                </Grid.Column>
                <Grid.Column width={5}>

                    <h2>Tahmini ücret</h2>
                    <Divider/>

                    <List divided verticalAlign='middle'>

                        {this.state.offerList.map( offer =>
                            <List.Item key={offer.id}>
                                <List.Content floated='right'>
                                    <Button
                                        icon='minus circle'
                                        basic
                                        size='mini'
                                        onClick={() =>  this.removeOffer(offer.id)}
                                    />
                                </List.Content>
                                <List.Content floated='right'>
                                    { offer.price == 0 ?  <label> - TL</label> :<label> {offer.price } TL</label> }
                                </List.Content>
                                <List.Content>{offer.defectName}</List.Content>
                            </List.Item>

                        )}


                        <List.Item>
                            <div className="totalSection">

                                <List.Content floated='right'>
                                    <label className="boldtext"> {this.getTotal()} TL</label>
                                </List.Content>
                                <List.Content>
                                    <label className="boldtext"> Toplam</label>
                                </List.Content>
                            </div>

                        </List.Item>
                    </List>
                    <Message
                      color='green'
                        content='Kesin arıza tespit edilmeden ve size bildirilmeden hiç bir işlem yapılmaz ve sizden herhangi bir ücret talep edilmez'
                    />

                </Grid.Column>
            </Grid>
        );

        const steps = [{
            title: 'Arıza',
            content: defectForm,
        }, {
            title: 'Adres',
            content: <Signup
                getAllState = {this.getAllState}
                nextButtonVisible = {this.nextButtonVisible}
                signupRequest = {this.state.signupRequest}
            />,
        }, {
            title: 'Onay',
            content: <Summary userInfo = {this.state.signupRequest}
                              offerList = {this.state.offerList}
                              selectedPhone = {this.state.selectedPhone}
                              defectDescription = {this.state.defectDescription.value}
                              total ={this.getTotal()}
                              deliveryType = {this.state.deliveryStyle}
            />
        }];
        return (


            <div className="stepscss">
                <Steps  current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="stepcontentOuter">
                <div className="steps-content">{steps[current].content}</div>
                </div>
                <div className="steps-action">
                    {

                        (current < steps.length - 1 && this.state.nextButton)
                        && <ButtonAnt className="signup-form-button_n"
                                      type="primary"
                                      onClick={() => this.next()} disabled={this.isDefectFormValid()}>
                            İleri <IconAnt type="right" /> </ButtonAnt>
                    }
                    &nbsp;&nbsp;
                    {
                        (current > 0 && this.state.previousButton)
                        && (
                            <ButtonAnt   className="signup-form-button_n"
                                         type="primary" style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                <IconAnt type="left" /> Geri
                            </ButtonAnt>
                        )
                    }
                    &nbsp;&nbsp;
                    {

                        ( current === steps.length - 1 && this.state.complateButton)
                        && <ButtonAnt type="primary"
                                      className="signup-form-button_n"
                                      loading={this.state.iconLoading}
                                      onClick={() => this.approve()}>Onayla</ButtonAnt>
                    }
                </div>
            </div>

        );
    }
}

NewRequestForm.propTypes = {};


const mapDispacthToProps = {
    fetchOffers
}

const mapStateToProps = ({offers}) => {
    return {
        offers

    }
};

export default connect(mapStateToProps, mapDispacthToProps)(NewRequestForm);

