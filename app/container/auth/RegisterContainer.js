import React, { Component } from 'react'

import Register from '../../components/Register'
import { AuthConsumer } from '../../context/auth'

export default class RegisterContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: '',
    }
  }
  
  static navigationOptions = {
    header: null
  }

  handleEmailInput = (email) => {
    this.setState({email})
  }

  handleDisplayNameInput = (displayName) => {
    this.setState({displayName})
  }

  handlePWInput = (password) => {
    this.setState({password})
  }

  handleConfirmPWInput = (password) => {
    this.setState({confirmPassword: password})
    return password === this.state.password
  }

  handleNavigateGoBack = () => {
    this.props.navigation.goBack()
  }

  render() {

    const {
      email,
      password,
      confirmPassword,
      displayName
    } = this.state

    return (
      <AuthConsumer>
        {({handleRegister, errorMessage}) => (
        <Register 
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          displayName={displayName}
          handleEmailOnChangeText={this.handleEmailInput}
          handleDisplayNameOnChangeText={this.handleDisplayNameInput}
          handlePWOnChangeText={this.handlePWInput}
          handleConfirmPWOnChangeText={this.handleConfirmPWInput}
          handleSubmit={handleRegister({email, password, displayName})}
          errorMessage={errorMessage}
          handleNavigateGoBack={this.handleNavigateGoBack} />
        )}
      </AuthConsumer>
    )
  }
}
