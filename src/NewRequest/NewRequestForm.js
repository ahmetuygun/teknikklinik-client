import React, {Component} from 'react';
import {Input, Steps, Switch} from 'antd';

import {Button, Divider, Form, Grid, Header, List, Segment, Step,Icon,Message} from 'semantic-ui-react'
import {phones} from "../HomePage/PhoneList";
import {defects} from "../HomePage/DefectList";

import {connect} from 'react-redux';
import './NewRequestForm.css';
import {fetchOffers} from '../util/APIUtils';


class NewRequestForm extends Component {


    constructor() {
        super();
        this.state = {
            selectedPhone: '',
            selectedPhoneId : '',
            offerList: [],
            total: 0
        };
    }



    getOffer(device,defect){
        let offers;

        if(this.state.offerList.filter(item => item.defectId == defect ).length == 0)
            offers =   fetchOffers( device,defect )
            if(offers) {
                offers.then(response => {
                    if(response.ofers[0] && response.ofers[0].id)
                    this.setState({
                        offerList: [...this.state.offerList, response.ofers[0]],
                        total : this.state.total  + response.ofers[0].price
                    })

                });
            }






    }
    removeOffer(id){

        this.setState({
            offerList: this.state.offerList.filter( elem => elem.id !== id)
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

    render() {
        const Step = Steps.Step;

        return (

            <div>
                <div class="stepscss" >
                    <Steps current={0}>
                        <Step title="Arıza Tanımı" description="Cihazının arızasını tanımlayın"/>
                        <Step title="Adres" description="Size ulaşabileceğimiz iletişim bilgilerinizi tanımlayın"/>
                        <Step title="Ödeme" description="Ödeme detaylarını girin"/>
                    </Steps>
                </div>
                <Grid container columns={2} relaxed stackable>
                    <Grid.Column width={11}>
                        <Form>
                            <Form.Field>
                                <Header as='h3' attached='top' block color='blue'>
                                    Marka/Model
                                </Header>
                                <Segment attached>
                                    {this.state.selectedPhone.label}
                                </Segment>
                            </Form.Field>
                            <Divider/>
                            <Form.Field>

                                <Header as='h3' attached='top' block color='blue'>
                                    Arıza Tanımı
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

                                <Input  rows={4} />
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
                                        <label> {offer.price} TL</label>
                                    </List.Content>
                                    <List.Content>{offer.defectName}</List.Content>
                                </List.Item>

                            )}


                            <List.Item>
                                <div className="totalSection">

                                <List.Content floated='right'>
                                    <label class="boldtext"> {this.state.total} TL</label>
                                </List.Content>
                                <List.Content>
                                    <label className="boldtext"> Toplam</label>
                                </List.Content>
                                </div>

                            </List.Item>
                        </List>
                        <Message
                            icon='credit card outline' color='orange'
                            content='Arıza tespit edilmeden ve size danışılmadan hiç bir işlem yapılmaz ve sizden ücret talep edilmez'
                        />


                    </Grid.Column>
                </Grid>

                <Divider/>


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

