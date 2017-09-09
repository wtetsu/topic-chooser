import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TopicChooser from './topic_chooser';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false
        };
        this.loadData();
    }
    render() {
        if (!this.state.isReady) {
            return <div><img src="loading.gif" width="64" height="64" /></div>;
        } else {
            return <TopicChooser topics={this.topics}></TopicChooser>;
        }
    }
    loadData() {
        axios.get('./data.json').then((response) => {
            this.topics = response.data;
            this.setState({isReady:true});
        }).catch((error) => {
            console.log(error);
        });
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
