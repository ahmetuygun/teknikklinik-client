import React, { Component } from 'react';
import PollList from '../../poll/PollList';
import { getUserProfile , getUserInfo,getDefectInfo} from '../../util/APIUtils';
import {Timeline, notification, Tabs} from 'antd';
import { getAvatarColor } from '../../util/Colors';
import { formatDate } from '../../util/Helpers';
import LoadingIndicator  from '../../common/LoadingIndicator';
import './Profile.css';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';
import TextField from '@material-ui/core/TextField';

import {Form, Grid, Header, List, Radio, Segment} from 'semantic-ui-react'

const TabPane = Tabs.TabPane;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false,
            userInfo : {},
            defectInfo : {}
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
        .then(response => {
            this.setState({
                user: response,
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });        
            }
        });        
    }
      
    componentDidMount() {
        const username = this.props.match.params.email;
        this.loadUserProfile(username);
        getUserInfo()
            .then(response => {
                if(response)
                    this.setState({
                        userInfo : response
                    })
                }
            )
            .catch(error => {

            });

        getDefectInfo()
            .then(response => {
                    if(response)
                        this.setState({
                            defectInfo : response
                        })
                }
            )
            .catch(error => {

            });
    }





    componentDidUpdate(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }        
    }

    render() {
        const addressTab = (
            <div className="padding2px">
            <Segment vertical>
                <Segment attached>
                    <Grid container columns={4} relaxed stackable>
                        <Grid.Column>
                            <TextField
                                id="standard-read-only-input1"
                                label="Ad-Soyad"
                                defaultValue="İsim"
                                value={this.state.userInfo.name}
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
                                value={this.state.userInfo.phone}
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
                                value={ this.state.userInfo.email}
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
                                value={this.state.userInfo.city + '/' + this.state.userInfo.district}
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
                                value={this.state.userInfo.adress}
                                margin="normal"
                                multiline
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid.Column>


                    </Grid>
                </Segment>
            </Segment>
            </div>
        )


        const defectTab = (
            <div>
                <Segment vertical>
                    <Segment attached>
                        <Grid container columns={2} relaxed stackable>
                            <Grid.Column width={12} >

                        <Grid container columns={3} relaxed stackable>
                            <Grid.Column>

                                <TextField
                                    id="standard-read-only-input1"
                                    label="Marka/Model"
                                    defaultValue="İsim"
                                    value={this.state.defectInfo.phone}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <TextField
                                    id="standard-read-only-input5"
                                    label="Arıza Açıklaması"
                                    defaultValue="-"
                                    value={this.state.defectInfo.description}
                                    margin="normal"
                                    multiline
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid.Column>

                            <Grid.Column>
                                <TextField
                                    id="standard-read-only-input5"
                                    label="Toplam Ücret"
                                    defaultValue="-"
                                    value={this.state.defectInfo.total}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid.Column>

                            <Grid.Column>
                                <TextField
                                    id="standard-read-only-input5"
                                    label="Kayıt Tarihi"
                                    defaultValue="-"
                                    value={this.state.defectInfo.tDate}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid.Column>

                            <Grid.Column>
                                <TextField
                                    id="standard-read-only-input5"
                                    label="Takip Numarası"
                                    defaultValue="-"
                                    value={this.state.defectInfo.trackId}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid.Column>

                            <Grid.Column>

                            </Grid.Column>

                            <Grid.Column>
                                <Form className="formpadding">
                                    <Form.Field>
                                        <Radio
                                            label='Kurye(İstanbul içi)'
                                            name='radioGroup'
                                            value='this'
                                            readOnly
                                            checked={this.state.defectInfo.deliveryType === 1}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Radio
                                            label='Kargo'
                                            name='radioGroup'
                                            value='that'
                                            readOnly
                                            checked={this.state.defectInfo.deliveryType === 2}
                                        />
                                    </Form.Field>
                                </Form>
                            </Grid.Column>

                            <Grid.Column>
                                <h3>Arıza Maddeleri</h3>

                                <List divided verticalAlign='middle'>
                                    { this.state.defectInfo.offers ? this.state.defectInfo.offers.map(offer =>
                                        <List.Item>
                                            <List.Content floated='right'>
                                                {offer.price === 0 ? <label> - TL</label> :
                                                    <label> {offer.price} TL</label>}
                                            </List.Content>
                                            <List.Content>{offer.defectName}</List.Content>
                                        </List.Item>
                                    ) : null}
                                </List>
                            </Grid.Column>
                        </Grid>
                            </Grid.Column>

                            <Grid.Column  width={4}>
                                <h3>İşlem Durumu</h3>

                                <Timeline>
                                    <Timeline.Item color="green">Talep formu oluştruldu</Timeline.Item>
                                    <Timeline.Item color="blue">Telefon tamir servisine ulaştı</Timeline.Item>
                                    <Timeline.Item color="blue">Tamir için onay alındı</Timeline.Item>
                                    <Timeline.Item color="blue" >Arıza Giderildi</Timeline.Item>
                                    <Timeline.Item color="blue" >Cihaz kargolandı</Timeline.Item>
                                    <Timeline.Item color="blue" >Cihaz teslim edildi</Timeline.Item>
                                    <Timeline.Item color="blue" >:)</Timeline.Item>
                                </Timeline>
                            </Grid.Column>

                        </Grid>
                    </Segment>
                </Segment>

            </div>


        )


        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        const tabBarStyle = {
            textAlign: 'center'
        };

        return (
            <div className="profile">
                { 
                    this.state.user && this.state.userInfo.email ? (
                        <div className="user-profile">
                            <Tabs
                                defaultActiveKey="1"
                                tabPosition="top">
                                <TabPane tab="Arıza Takip" key="1">{defectTab}</TabPane>
                                <TabPane tab="İletişim Detayları" key="2">{addressTab}</TabPane>
                            </Tabs>
                        </div>  
                    ): null               
                }
            </div>
        );
    }
}

export default Profile;
