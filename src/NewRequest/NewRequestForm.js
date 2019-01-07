import React, {Component} from 'react';
import {Steps,Input } from 'antd';

import {Button, Divider, Form, Grid, Header, List, Segment, Step, Checkbox} from 'semantic-ui-react'
import {phones} from "../HomePage/PhoneList";
import {connect} from 'react-redux';
import './NewRequestForm.css';


class NewRequestForm extends Component {


    constructor() {
        super();
        this.state = {
            selectedPhone: '',
        };
    }

    componentDidMount() {

        const {match} = this.props;

        this.setState(
            {
                selectedPhone: phones.filter(lang =>
                    lang.id === match.params.id
                )[0]
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
                    </Steps>,
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
                                        <List.Item>
                                            <List.Content floated='right'>
                                                <Button basic color='blue'>Ekle</Button>
                                            </List.Content>
                                            <List.Content>Ekran kırık/çatlak</List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content floated='right'>
                                                <Button basic color='blue'>Ekle</Button>
                                            </List.Content>
                                            <List.Content>Arka kamera çalışmıyor</List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content floated='right'>
                                                <Button basic color='blue'>Ekle</Button>
                                            </List.Content>
                                            <List.Content>Karşıya ses gitmiyor</List.Content>
                                        </List.Item>
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
                            <Checkbox />
                            </Form.Field>


                        </Form>
                    </Grid.Column>
                    <Grid.Column width={5}>

                        <h2>Hesap Özeti</h2>

                        <List divided verticalAlign='middle'>
                            <List.Item>
                                <List.Content floated='right'>
                                    <label> 500.00 TL</label>

                                </List.Content>
                                <List.Content>Ekran Değişimi</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content floated='right'>
                                    <label> 500.00 TL</label>
                                </List.Content>
                                <List.Content>Toplam</List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                </Grid>

                <Divider/>


            </div>
        );
    }
}

NewRequestForm.propTypes = {};


const mapDispacthToProps = {}

const mapStateToProps = ({selectPhoneId}) => {
    return {
        selectPhoneId

    }
};

export default connect(mapStateToProps, mapDispacthToProps)(NewRequestForm);

