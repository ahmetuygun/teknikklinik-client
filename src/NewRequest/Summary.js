import React, {Component} from 'react';


import TextField from '@material-ui/core/TextField';

import {Grid, Header, List, Radio, Segment,Form} from 'semantic-ui-react'
import './NewRequestForm.css';


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
                            <Grid container columns={4} relaxed stackable>
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
                                        id="standard-read-only-input38"
                                        label="Telefon"
                                        defaultValue="İletişim"
                                        value={this.props.userInfo.phone}
                                        margin="normal"
                                        className="textFieldMetarial"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <TextField
                                        id="standard-read-only-input385"
                                        label="E-mail"
                                        defaultValue="İletişim"
                                        value={ this.props.userInfo.email}
                                        margin="normal"
                                        className="textFieldMetarial"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid.Column>

                                <Grid.Column>
                                    <TextField
                                        id="standard-read-only-input2"
                                        label="İl/İlçe"
                                        defaultValue="İl/İlçe"
                                        value={this.props.userInfo.city + '/' + this.props.userInfo.district}
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
                                        value={this.props.userInfo.address}
                                        margin="normal"
                                        multiline
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid.Column>

                                <Grid.Column>
                                    <Form className="formpadding">
                                        <Form.Field>
                                            <Radio
                                                label='Kurye(İstanbul içi)'
                                                name='radioGroup'
                                                value='this'
                                                readOnly
                                                checked={this.props.deliveryType === 1}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Radio
                                                label='Kargo'
                                                name='radioGroup'
                                                value='that'
                                                readOnly
                                                checked={this.props.deliveryType === 2}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                    </Form>
                                </Grid.Column>

                            </Grid>



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
