import { createStackNavigator } from 'react-navigation'

import LoginContainer from './LoginContainer'
import RegisterContainer from './RegisterContainer'

export default createStackNavigator(
  {
    LoginScene: LoginContainer,
    RegisterScene: RegisterContainer,
  },
  {
    initialRouteName: 'LoginScene',
    headerMode: 'float',
    mode: 'mode',
    headerTransitionPreset: 'uikit',
  }
)
