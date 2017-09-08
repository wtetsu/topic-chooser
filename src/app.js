import React from 'react';
import ReactDOM from 'react-dom';
import TopicChooser from './topic_chooser';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false
        };
        axios.get('./data.json').then((response) => {
            this.topics = response.data;
            this.setState({isReady:true});
        }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        if (!this.state.isReady) {
            return <div><img src="loading.gif" width="64" height="64" /></div>;
        } else {
            return <TopicChooser topics={this.topics}></TopicChooser>;
        }
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
