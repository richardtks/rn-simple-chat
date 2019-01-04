import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { Icon } from 'react-native-elements'

const NewRoomBtn = (props) => {
  return (
    <View style={{ paddingRight: 15 }}>
      <TouchableWithoutFeedback onPress={props.handleSelectContact}>
        <Icon name="ios-add" size={32} color="black" />
      </TouchableWithoutFeedback>
    </View>
  )
}

export default NewRoomBtn
