import React, {Component} from 'react';
import { Container, Header } from 'semantic-ui-react'

class Final extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trackingId : 0
        }
    }

    componentWillMount() {

    }
    render() {
        return (
           <div className="margintopleft">
               <div className="paddingtopleft">
            <Container text>
                <Header as='h2'>Sayın {this.props.location.state.name}</Header>
                <Header as='h2'>Takip Numarası: { this.props.location.state.trackingId  }</Header>
                <p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                        ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                    </p>
                </p>
            </Container>
           </div>
           </div>
    );
    }
    }

    export default Final;
