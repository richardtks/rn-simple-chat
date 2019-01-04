import { createSwitchNavigator } from 'react-navigation'

import MessageNavi from './container/chat/MessageNavi'
import AuthNavi from './container/auth/AuthNavi'

export default createSwitchNavigator({
  AuthScene: AuthNavi,
  MessageScene: MessageNavi,
})
