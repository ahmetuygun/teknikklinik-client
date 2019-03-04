import React, {Component} from 'react';
import {Button as ButtonAnt , Input, Steps, Switch,message, Icon as IconAnt} from 'antd';

import {Button, Divider, Form, Grid, Header, List, Segment, Step,Icon,Message} from 'semantic-ui-react'
import {phones} from "../HomePage/PhoneList";
import {defects} from "../HomePage/DefectList";

import {connect} from 'react-redux';
import './NewRequestForm.css';
import {fetchOffers} from '../util/APIUtils';
import Signup from "../user/signup/Signup";


class NewRequestForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPhone: '',
            selectedPhoneId : '',
            offerList: [],
            total: 0,
            userId : 0,
            defectDescription : '',

            name: '',
            email: '',
            username: '',
            password:  '',
            address: '',
            phone : 0,
            city : '',
            district : '',
            current: 0,
            nextButton : true,
            previousButton : true,
            complateButton : true


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


    getAllState(signupRequest,userid){

        this.setState({
            signupRequest :signupRequest,
            userId : userid,
            name: signupRequest.name,
            email: signupRequest.email,
            username: signupRequest.username,
            password:  signupRequest.password,
            address: signupRequest.address,
            phone : signupRequest.phone,
            city : signupRequest.city,
            district : signupRequest.city
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

    handleInputChange= (e) => {
        this.setState(
            {
                [e.target.name] : e.target.value,

            }
        );
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


    render() {
        const Step = Steps.Step;
        const { current } = this.state;
        const { TextArea } = Input;


        const defectForm = (
            <Grid container columns={2} relaxed stackable>
                <Grid.Column width={11}>
                    <Form>

                        <Form.Field>

                            <Header as='h3' attached='top' block color='blue'>
                                {this.state.selectedPhone.label}
                                </Header>
                            <Segment attached style={{overflow: 'auto', maxHeight: 200}}>
                                <List divided verticalAlign='middle'>
                                    {defects.map( defect =>
                                        <List.Item>
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
                        </Form.Field>
                        <Divider/>

                        <Form.Field>

                            <h3>Arızayı tarif eder misiniz?</h3>

                            <TextArea
                                rows={3} value={this.state.defectDescription}
                                onChange={(event) => this.handleInputChange(event)}
                                name="defectDescription"
                            />
                        </Form.Field>
                        <Divider/>

                        <Form.Field>

                            <h3>Telefonum adresimden alınsın(İstanbul için)</h3>
                            <Switch   />
                        </Form.Field>


                    </Form>
                </Grid.Column>
                <Grid.Column width={5}>

                    <h2>Tahmini ücret</h2>
                    <Divider/>

                    <List divided verticalAlign='middle'>


                        {this.state.offerList.map( offer =>
                            <List.Item>
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
                                    <label class="boldtext"> {this.getTotal()} TL</label>
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
            />,
        }, {
            title: 'Kargo',
            content: <div>Last-content</div>
        }];
        return (


            <div className="stepscss">
                <Steps  current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div  className="stepscss" >
                <div className="steps-content">{steps[current].content}</div>
                </div>
                <div className="steps-action">
                    {

                        (current < steps.length - 1 && this.state.nextButton)
                        && <ButtonAnt type="primary" onClick={() => this.next()}>
                            İleri <IconAnt type="right" /> </ButtonAnt>
                    }
                    {
                        ( current === steps.length - 1 && this.state.previousButton)
                        && <ButtonAnt type="primary" onClick={() => message.success('Processing complete!')}>Bitti</ButtonAnt>
                    }
                    {
                        (current > 0 && this.state.complateButton)
                        && (
                            <ButtonAnt  type="primary" style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                <IconAnt type="left" /> Geri
                            </ButtonAnt>
                        )
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

