import React, {Component} from 'react';

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
            <div>
                { this.props.location.state.trackingId  }
            </div>
    );
    }
    }

    export default Final;
