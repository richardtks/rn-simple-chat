import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'

import { actionCreators } from '../../redux/action' 
import { AuthConsumer } from '../../context/auth'

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        messages: [
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
            }
        ],
    };
  }

  componentWillUnmount() {
    this.createRoomOnUponExit()
  }

  createRoomOnUponExit = () => {
    if(this.props.messageList.length > 0) {
      const { messageList, navigation } = this.props

      this.props.createRoom({
        name: navigation.getParam('targetUser'),
        lastmessage: messageList[messageList.length - 1].text,
        lastsent: messageList[messageList.length - 1].createdAt
      })
    }
  }
  
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('targetUser'),
  })

  handleOnSend = (message) => {
    const targetUser = this.props.navigation.getParam('targetUser')

    this.props.sendMessage({
      targetUser,
      messageList: GiftedChat.append(this.props.messageList, message)
    })
  }

  render() {
    return (
        <View style={styles.container}>
          <AuthConsumer>
            {({uid}) => (
              <GiftedChat
                  messages={this.props.messageList}
                  onSend={this.handleOnSend}
                  user={{
                  _id: uid,
                  name: 'Test',
                  avatar: 'https://placeimg.com/140/140/any',
                  }} 
              />
            )}
          </AuthConsumer>
          {Platform.OS === 'android' && <KeyboardSpacer />}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

const mapStateToProps = (state, props) => {
  const targetUser = props.navigation.getParam('targetUser')

  return ({
    messageList: [...(state.chat[targetUser] || [])]
  })
}

const mapDispatchToProps = dispatch => {
  return ({
    sendMessage: (message) => {      
      dispatch(actionCreators.SEND_MESSAGE(message))
    },
    createRoom: (room) => {
      dispatch(actionCreators.ADD_ROOM(room))
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
  
