import 'es6-promise/auto';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import utils from './utils';

class TopicChooser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            selectedTopic: {},
            buttonClassName: 'button-large swingimage'
        };

        axios.get('./data.json').then((response) => {
            this.state.list = response.data;
            this.setState(this.state);
        }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        return (
            <div>
                <h1>Topic Chooser</h1>
                <img src="logo.png" width="128" height="128" />
                <p>Choose one topic randomly from <a target="_blank" href="http://iteslj.org/questions/">http://iteslj.org/questions/</a></p>
                <p><button className={this.state.buttonClassName} onClick={this.buttonPushed.bind(this)}>PUSH TO SELECT!</button></p>
                <p className={this.state.selectedTopic.className}><a target="_blank" href={'http://iteslj.org/questions/' + this.state.selectedTopic.link}>{this.state.selectedTopic.title}</a></p>
            </div>
        );
    }
    buttonPushed(e) {
        this.state.buttonClassName = 'button-large';
        let selectedTopic = null;
        let id = setInterval(()=>{
            let index = utils.getRandomValue(0, this.state.list.length-1);
            selectedTopic = this.state.list[index];
            selectedTopic.className = null;
            this.state.selectedTopic = selectedTopic;
            this.setState(this.state);
        }, 10);
        setTimeout(()=>{
            clearInterval(id);
            selectedTopic.className = 'selected-topic';
            this.setState(this.state);
        }, 1500)
    }
}

export default TopicChooser;
