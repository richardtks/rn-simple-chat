import React, { Component } from 'react';

import Login from '../../components/Login'
import { AuthConsumer } from '../../context/auth'

/*
  User story 
    1: First the submit button is disabled, enable when email and password has value
    2: check email format and then prompt to user if it is not valid
    3. Able to perform authentication 
      3.1 Success login -> navigate to the different page
      3.2 Fail login -> display to user
*/
class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  static navigationOptions = {
    header: null
  }


  handleEmailInput = (email) => {
    this.setState({ email });
  }

  handlePasswordInput = (password) => {
    this.setState({ password });
  }

  handleRegister = () => {
    this.props.navigation.navigate('RegisterScene')
  }

  render() {
    const { email, password } = this.state
    return (
      <AuthConsumer>
        {({handleLogin, errorMessage, isAuthLoading}) => (
          <Login 
            email={this.state.email}
            password={this.state.password}
            handleEmailOnChangeText={this.handleEmailInput}
            handlePWOnChangeText={this.handlePasswordInput}
            handleSubmit={handleLogin({email, password})}
            isAuthLoading={isAuthLoading}
            errorMessage={errorMessage} 
            handleRegister={this.handleRegister}/> )
        }
        </AuthConsumer>
    );
  }
}

export default LoginContainer
