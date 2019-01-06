import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'react-native-elements';

import Main from './app/main'
import ConfigureStore from './app/redux/store'
import NavigationService from './app/redux/navigationservice'
import { AuthProvider } from './app/context/auth'
import RequestToken from './app/api/firebase/requestToken'
const store = ConfigureStore()

export default class App extends Component {

  componentDidMount() {
    RequestToken()
  }
  render() {
    return (
      <ThemeProvider>
        <AuthProvider>
          <Provider store={store}>
            <Main
              ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef)
              }}
            />
          </Provider>
        </AuthProvider>
      </ThemeProvider>
    )
  }
}
