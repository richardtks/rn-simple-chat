import { createStackNavigator } from 'react-navigation'

import ChatContainer from './ChatContainer'
import RoomContainer from './RoomContainer'
import ContactContainer from '../contact/ContactContainer'

export default createStackNavigator(
  {
    Chat: ChatContainer,
    RoomList: RoomContainer,
    ContactList: ContactContainer,
  },
  {
    initialRouteName: 'RoomList',
    headerMode: 'float',
    mode: 'mode',
    headerTransitionPreset: 'uikit',
  }
)
