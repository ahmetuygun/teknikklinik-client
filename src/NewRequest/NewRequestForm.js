import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Divider, Icon, Step, Table, Form, Label,Segment} from 'semantic-ui-react'
import {phones} from "../HomePage/PhoneList";


class NewRequestForm extends Component {

    constructor() {
        super();
        this.state = {
            selectedPhone : '',
        };
    }

    componentDidMount() {

        const {match} = this.props;

        this.setState(
            {
                selectedPhone : phones.filter(lang =>
                    lang.id === match.params.id
                )[0]
            }
        )

    }

    render() {
        return (
            <div>

                <Step.Group>
                    <Step>
                        <Icon name='cart arrow down' />
                        <Step.Content>
                            <Step.Title>Arıza Tanımı</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                        <Icon name='address card outline' />
                        <Step.Content>
                            <Step.Title>Adres</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                        <Icon name='payment' />
                        <Step.Content>
                            <Step.Title>Fatura</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>


                <Form>



                    <Form.Field>
                        <h2> Marka/Model:</h2>

                        <Label color='blue' size='huge'>
                            {this.state.selectedPhone.label}
                        </Label>
                    </Form.Field>
                    <Divider/>

                    <Form.Field>
                        <h2> Arıza tanımı:</h2>

                        <Table celled>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Ekranım kırık yada çatlak</Table.Cell>
                                    <Table.Cell selectable positive>
                                        <a href='#'>
                                            <Icon circular name='add'/>
                                        </a>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Kamera çalışmıyor</Table.Cell>
                                    <Table.Cell selectable positive>
                                        <a href='#'>+</a>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Ses karşı tarafa gitmiyor</Table.Cell>
                                    <Table.Cell selectable positive>
                                        <a href='#'>+</a>
                                    </Table.Cell>
                                </Table.Row>

                            </Table.Body>
                        </Table>
                    </Form.Field>
                </Form>

                <Divider/>


            </div>
        );
    }
}

NewRequestForm.propTypes = {};


const mapDispacthToProps = {

}

const mapStateToProps = ({selectPhoneId}) => {
    return {
        selectPhoneId

    }
};

export default connect(mapStateToProps, mapDispacthToProps)(NewRequestForm);

