require('es6-promise').polyfill();
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class TopicChooser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
            ],
            inputText: "",
            selectedTopic: {}
        };

        axios.get('./data.json').then((response) => {
            this.state.list = response.data;
            this.setState(this.state);
        }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        var list = this.state.list.map(a => <li key={a.link}>{a.title}</li>);
        return (
            <div>
                <h1>Topic Chooser</h1>
                <img src="logo.png" width="256" height="256" />
                <p>Choose one topic randomly from <a target="_blank" href="http://iteslj.org/questions/">http://iteslj.org/questions/</a></p>
                <p><button onClick={this.buttonPushed.bind(this)} className="button-large">PUSH TO SELECT!</button></p>
                <p className={this.state.selectedTopic.className}><a target="_blank" href={'http://iteslj.org/questions/' + this.state.selectedTopic.link}>{this.state.selectedTopic.title}</a></p>
            </div>
        );
    }
    buttonPushed(e) {
        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        let selectedTopic = null;
        let id = setInterval(()=>{
            let index = getRandomIntInclusive(0, this.state.list.length-1);
            selectedTopic = this.state.list[index];
            selectedTopic.className = null;
            this.state.selectedTopic = selectedTopic;
            this.setState(this.state);
        }, 10);
        setTimeout(()=>{
            clearInterval(id);
            selectedTopic.className = "selected-topic"
            this.setState(this.state);
        }, 1500)
    }
    changeText(e) {
        this.state.inputText = e.target.value;
        this.setState(this.state);
    }
}

class App extends React.Component {
    render() {
        return (
            <TopicChooser>
            </TopicChooser>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

