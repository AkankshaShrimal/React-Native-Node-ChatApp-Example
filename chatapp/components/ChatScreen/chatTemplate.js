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

        const socket = io.connect('http://192.168.1.8:3000', {jsonp: false, transports: ['websocket'] });
        socket.on("reply", (msg) => {
            console.warn(msg);
        })
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

        // for demo purpose
        this.answerDemo(messages);
    }

    answerDemo(messages) {
        if (messages.length > 0) {
            if ((messages[0].image || messages[0].location) || !this._isAlright) {
                this.setState((previousState) => {
                    return {
                        typingText: 'React Native is typing'
                    };
                });
            }
        }
    }

    onReceive(text) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, {
                    _id: Math.round(Math.random() * 1000000),
                    text: text,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        // avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                }),
            };
        });
    }

    render() {
        return (
            <View style={{ backgroundColor: "#BAF9FD" ,flex: 1 }}>
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







