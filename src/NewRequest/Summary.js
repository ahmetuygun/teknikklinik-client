import React, {Component} from 'react';

import { makeStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import {Card, Divider, Grid, Header, Icon, List, Segment,Checkbox } from 'semantic-ui-react'
import './NewRequestForm.css';
import {Radio} from "antd";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;




class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {}



    }


    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };


        return (
            <div>
                <div>
                    <Segment vertical>
                        <Header as='h3' attached='top' block color='blue'>
                            İletişim Detayları
                        </Header>
                        <Segment attached>

                            <Grid container columns={2} relaxed stackable>
                                <Grid.Column>
                                    <TextField
                                        id="standard-read-only-input1"
                                        label="Ad-Soyad"
                                        defaultValue="İsim"
                                        value={this.props.userInfo.name}
                                        margin="normal"
                                        className="textFieldMetarial"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <TextField
                                        id="standard-read-only-input5"
                                        label="Adres"
                                        className="textFieldMetarial"
                                        defaultValue="-"
                                        value={this.props.userInfo.address
                                        + "\n" + this.props.userInfo.city
                                        +'/' +this.props.userInfo.district
                                        + "\n\nE-mail  : " + this.props.userInfo.email
                                        + "\nTelefon : " +this.props.userInfo.phone }
                                        margin="normal"
                                        multiline
                                        fullWidth
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid.Column>

                            </Grid>

                            <Grid.Column>

                            <Checkbox label='Telefonum adresimden alınsın(İstanbul için)' readOnly checked={this.props.deliveryType === 1 }/>
                            <Checkbox label='Kargoyla göndermek istiyorum' readOnly checked={this.props.deliveryType === 2 }/>
                            </Grid.Column>

                        </Segment>


                    </Segment>
                    <Segment vertical>
                        <Header as='h3' attached='top' block color='blue'>
                            Arıza Detayları
                        </Header>
                        <Segment attached>
                        <Grid container columns={2} relaxed stackable>
                            <Grid.Column>

                                <TextField
                                    id="standard-read-only-input1"
                                    label="Marka/Model"
                                    defaultValue="İsim"
                                    value={this.props.selectedPhone.label}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />

                                <TextField
                                    id="standard-read-only-input5"
                                    label="Arıza Açıklaması"
                                    defaultValue="-"
                                    value={this.props.defectDescription}
                                    margin="normal"
                                    multiline
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <h2>Toplam ücret</h2>

                                <List divided verticalAlign='middle'>

                                    {this.props.offerList.map(offer =>
                                        <List.Item>
                                            <List.Content floated='right'>
                                                {offer.price === 0 ? <label> - TL</label> :
                                                    <label> {offer.price} TL</label>}
                                            </List.Content>
                                            <List.Content>{offer.defectName}</List.Content>
                                        </List.Item>
                                    )}

                                    <List.Item>
                                        <div className="totalSection">
                                            <List.Content floated='right'>
                                                <label className="boldtext"> {this.props.total} TL</label>
                                            </List.Content>
                                            <List.Content>
                                                <label className="boldtext"> Toplam</label>
                                            </List.Content>
                                        </div>

                                    </List.Item>
                                </List>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    </Segment>

                </div>
            </div>
    );
    }
    }


    export default Summary;
