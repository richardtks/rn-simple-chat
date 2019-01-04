import React, { Component } from 'react'
import { 
  StyleSheet, 
  KeyboardAvoidingView, 
  ScrollView, 
  TouchableOpacity, 
  View } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'

export default class Register extends Component {
  render() {
    const { 
      email,
      password,
      confirmPassword,
      displayName,
      handleEmailOnChangeText,
      handleDisplayNameOnChangeText,
      handlePWOnChangeText,
      handleConfirmPWOnChangeText,
      handleSubmit,
      errorMessage,
      handleNavigateGoBack
    } = this.props
    return (
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="never">
        <KeyboardAvoidingView behavior="position">
        <Text h1>Register</Text>
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
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            labelStyle={styles.inputLabel}
            ref="emailInput"
          />
           <Input
            label="Username"
            placeholder="Enter your username"
            keyboardAppearance="light"
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            blurOnSubmit={false}
            value={displayName}
            onChangeText={handleDisplayNameOnChangeText}
            onSubmitEditing={() => {
              this.refs.passwordInput.focus()
            }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            labelStyle={styles.inputLabel}
            ref="usernameInput"
          />
           <Input
            label="Password"
            placeholder="Enter your password"
            keyboardAppearance="light"
            keyboardType="default"
            returnKeyType="next"
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
           <Input
            label="Confirm password"
            placeholder="Enter your password again"
            keyboardAppearance="light"
            keyboardType="default"
            returnKeyType="go"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            blurOnSubmit={false}
            value={confirmPassword}
            onChangeText={handleConfirmPWOnChangeText}
            errorMessage={errorMessage}
            onSubmitEditing={handleSubmit}
            containerStyle={styles.inputContainer}
            labelStyle={styles.inputLabel}
            ref="passwordConfirmInput"
          />
           <Button
            title="Submit"
            loading={false}
            loadingProps={{ size: 'large', color: 'rgba(111, 202, 186, 1)' }}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={styles.submit}
            containerStyle={{ marginTop: 10 }}
            onPress={handleSubmit}
          />
          <View style={styles.backSection}>
            <TouchableOpacity onPress={handleNavigateGoBack}>
              <Text style={styles.backText}>Go back</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
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
  inputContainer: {
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
  backSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6d70c6',
  }
})

