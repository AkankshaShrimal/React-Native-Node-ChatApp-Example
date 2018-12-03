import React from 'react';
import { Text, View } from 'react-native';
import { GiftedChat, Actions, Bubble, SystemMessage } from 'react-native-gifted-chat';

const io = require('socket.io-client/dist/socket.io.js');

class ChatTemplate extends React.Component {

    constructor(props) {
        super(props);
        state = {
            messages: [],
        }
        this.renderBubble = this.renderBubble.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onReceive = this.onReceive.bind(this);

        this.socket = io.connect('http://192.168.1.8:3000', { jsonp: false, transports: ['websocket'] });
        this.socket.on("reply",

            this.onReceive
        );

    }


    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                },
            ],
        });


    }


    renderBubble(props) {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: 'black',
                    },
                }}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#5DB7F1',
                    },
                    right: {
                        backgroundColor: '#A5F15D',
                    },
                }}
            />
        );
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))

        this.socket.emit("message", messages[0].text);

    }



    onReceive(messages) {
        console.log(messages);
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));

    }

    render() {
        return (
            <View style={{ backgroundColor: "#BAF9FD", flex: 1 }}>
                <GiftedChat
                    style={{ backgroundColor: 'green' }}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    isAnimated={true}
                    user={{
                        _id: 1,
                    }}

                    renderBubble={this.renderBubble}
                />
            </View>
        )
    }
}



export default ChatTemplate;







