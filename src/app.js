import React from 'react';
import ReactDOM from 'react-dom';
import TopicChooser from './topic_chooser';

class App extends React.Component {
    render() {
        return (
            <TopicChooser>
            </TopicChooser>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
