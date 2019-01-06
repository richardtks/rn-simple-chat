import React, { Component } from 'react'
import DismissKeyboard from 'dismissKeyboard';

import login from '../api/firebase/login'
import register from '../api/firebase/register'
import NavigationService from '../redux/navigationservice'
import requestToken from '../api/firebase/requestToken'
import setUserToken from '../api/firebase/setUserToken'
import getToken from '../api/firebase/getToken';

const AuthContext = React.createContext()

class AuthProvider extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isAuth: false,
      errorMessage: '',
      isAuthLoading: false,
      email: '',
      displayName: '',
    }
  }

  handleLogin = ({email, password}) => async (event) => {
    let uid = '', errorMessage = ''
    
    DismissKeyboard()

    try{
      this.setState({
        isAuthLoading: true,
      })

      uid = await login(email, password)
      token = await getToken(uid)

      if (!!token) {
        token = await requestToken(uid)
        await setUserToken(token, uid)
      }

      NavigationService.navigate('RoomList')
    } catch (error) {
      errorMessage = error.message
    }

    this.setState({
      uid,
      errorMessage,
      isAuthLoading: false,
      email
    })
  }

  handleRegister = ({email, password, displayName}) => async (event) => {
    await register(email, password, displayName)
  }

  render () {
    return (
      <AuthContext.Provider
        value={{
          ...this.state, 
          handleLogin: this.handleLogin,
          handleRegister: this.handleRegister
        }}>
        { this.props.children }
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer
export { AuthProvider, AuthConsumer }