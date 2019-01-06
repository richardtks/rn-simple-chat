import React, { Component } from 'react'
import { 
  StyleSheet, 
  KeyboardAvoidingView, 
  ScrollView, 
  View, 
  TouchableOpacity } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import PropTypes from 'prop-types'

/*
  User story 
    1: First the submit button is disabled, enable when email and password has value
    2: check email format and then prompt to user if it is not valid
    3. Able to perform authentication 
      3.1 Success login -> navigate to the different page
      3.2 Fail login -> display to user
*/
export default class Login extends Component {
  render() {
    let {
      email,
      password,
      handleEmailOnChangeText,
      handlePWOnChangeText,
      handleSubmit,
      errorMessage,
      isAuthLoading,
      handleRegister,
    } = this.props

    return (
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="never"
      >
        <Text h1>Login</Text>
        <Input
          label="Email"
          placeholder="Enter your email"
          keyboardAppearance="light"
          keyboardType="email-address"
          returnKeyType="next"
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit={false}
          value={email}
          onChangeText={handleEmailOnChangeText}
          onSubmitEditing={() => {
            this.refs.passwordInput.focus()
          }}
          containerStyle={styles.emailContainer}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
          ref="emailInput"
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          keyboardAppearance="light"
          keyboardType="default"
          returnKeyType="go"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          blurOnSubmit={false}
          value={password}
          onChangeText={handlePWOnChangeText}
          errorMessage={errorMessage}
          onSubmitEditing={handleSubmit}
          containerStyle={styles.inputContainer}
          labelStyle={styles.inputLabel}
          ref="passwordInput"
        />
        <Button
          title="Submit"
          loading={isAuthLoading}
          loadingProps={{ size: 'large', color: '#cdeeaa' }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={styles.submit}
          containerStyle={{ marginTop: 20 }}
          onPress={handleSubmit}
          disabled={email === '' || password === ''}
        />
        <View style={styles.registerSection}>
            <Text style={styles.registerText}>Haven\'t register? Please here to</Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerClickedText}> register</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleEmailOnChangeText: PropTypes.func.isRequired,
  handlePWOnChangeText: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isAuthLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleRegister: PropTypes.func.isRequired
}

Login.defaultProps = {
  email: '',
  password: '',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    paddingLeft: 0,
  },
  emailContainer: {
    paddingBottom: 10,
  },
  inputLabel: {
    color: 'black',
  },
  submit: {
    backgroundColor: '#78281F',
    width: 350,
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 50,
  },
  registerSection: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 18,
  },
  registerClickedText: {
    fontSize: 18,
    color: 'blue',
  }
})
