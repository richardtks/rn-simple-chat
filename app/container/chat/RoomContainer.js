import React, { Component } from 'react';
import { connect } from 'react-redux';

import RoomList from '../../components/message/RoomList'
import NewRoomBtn from '../../components/message/NewRoomBtn'

import firebase from '../../api/firebase/firebase'
class RoomContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefresh: false,
    };
  }

  static navigationOptions = ({ navigation, screenProps}) => ({
    title: 'Message List',
    headerRight: (
      <NewRoomBtn handleSelectContact={navigation.getParam('selectContact')}/>
    ),
  })

  componentDidMount() {
    this.props.navigation.setParams({ selectContact: this.handleSelectContact });
    this.handleListenNotification()
  }

  handleListenNotification = () => {
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      console.log('notication listener displayed')
    });

    this.notificationListener = firebase.notifications().onNotification((notification) => {
      // Process your notification as required
      console.log('notication listener')
      console.log(notification)
    });
  }

  handleSelectContact = () => {
    this.props.navigation.navigate('ContactList')
  }

  handleOnRefresh = () => {
    
  }

  handleOnPressItem = (username) => (event) => {
    this.props.navigation.navigate("Chat", {targetUser: username})
  }

  render() {
    return (
      <RoomList 
        isRefresh={this.state.isRefresh}
        handleOnRefresh={this.handleOnRefresh}
        roomListData={this.props.roomList}
        handleOnPressItem={this.handleOnPressItem}
      /> 
    );
  }
}

const mapStateToProps = (state) => {
  const { byTargetUser, allTargetUsers } = state.room
  return ({
    roomList: allTargetUsers.map(targetUser => (byTargetUser[targetUser]))
  })
}

export default connect(mapStateToProps)(RoomContainer)