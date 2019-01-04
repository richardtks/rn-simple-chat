import React, { Component } from 'react';

//ToDo: REMOVE THE TEST DATA
import { listdata } from './_testdata'
import { connect } from 'react-redux';

import RoomList from '../../components/message/RoomList'
import NewRoomBtn from '../../components/message/NewRoomBtn'

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
  }

  handleSelectContact = () => {
    this.props.navigation.navigate('ContactList')
  }

 
  handleOnRefresh = () => {
    this.setState({isRefresh: true}, this.simulateRefresh)
  }

  //ToDo: PLEASE REMOVE THIS
  simulateRefresh = async () => {
    let temp = []
    for(i=0; i< 10; i++){
      temp.push({username: 'i' + Math.random(), message: 'I hate my life but how, no one going to save you from that'})
    }

    this.setState({isRefresh: false, messagelist: [...this.state.messagelist, ...temp]})
  }

  handleOnPressItem = (username) => (event) => {
    this.props.navigation.replace("Chat", {targetUser: username})
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