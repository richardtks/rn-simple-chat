import React, { Component } from 'react'
import { Text, View, SectionList, StyleSheet, Button } from 'react-native'
import { Header, SearchBar, ListItem } from 'react-native-elements'
import { connect } from 'react-redux';

import { actionCreators } from '../../redux/action'
import getContactList from '../../api/firebase/getContactList'

class ContactContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contactList: []
    }

    this.rawData = {
      contactList: []
    }
  }

  componentDidMount() {
    this.getContactList()
  }

  getContactList = async () => {
    const contactListDB = await getContactList()

    //process the contact list
    const contactListByLetters = contactListDB.reduce((obj, contact) => {
      const firstLetter = contact[0]
      return ({
        ...obj,
        [firstLetter]: [...(obj[firstLetter] || []), contact]
      })
    }, {})

    const contactList = Object.keys(contactListByLetters)
                              .map(letter => ({
                               data: contactListByLetters[letter],
                               title: letter, 
                              }))
    this.rawData = {
      contactList: [...contactList]
    }
    this.setState({contactList})
  }
  
  static navigationOptions = {
    header: null
  }

  handleOnChangeText = (searchValue) => {

    const filteredContactList = 
      this.rawData.contactList.reduce(
      (acc, {title, data}) => {
        const filteredData = data.filter(value => value.indexOf(searchValue) > -1)
        if (filteredData.length > 0) return [...acc, {title, data: filteredData}]

        return acc
      }, 
    [])
    
    this.setState({
      contactList: filteredContactList
    })
    
  }

  /**
   * 
   */
  handleOnPressContact = (targetUser) => {
    //Navigate to the new room 
    this.props.navigation.replace('Chat', {targetUser})
  }

  render() {
    return (
      <View style={styles.container}>
        <Header centerComponent={{ text: 'Contact list', style: { color: '#fff' } }} />
        <View style={styles.header}>
          <SearchBar 
              round
              lightTheme
              onChangeText={this.handleOnChangeText}
              placeholder='Type here'/>
        </View>
        <View style={styles.contact}>
          <Button title="hello world" onPress={getContactList}/>
          <SectionList
            keyExtractor={(item, index) => item + index}
            sections={this.state.contactList}
            renderItem={({item, index}) => (
              <ListItem
                title={item}
                bottomDivider 
                onPress={() => this.handleOnPressContact(item)}/>
            )}
            renderSectionHeader={({section})=>(
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  header: {
    height: 60,
  },
  contact: {
    flex: 1,
  },
  sectionHeader: {
    paddingLeft: 16,
    backgroundColor: '#D3D3D3',
    height: 30,
    fontSize: 20,
    fontWeight: 'bold',
  }
})

const mapDispatchToProps = dispatch => ({
  createRoom: (targetUser)=>{ 
    dispatch(actionCreators.CREATE_ROOM({targetUser, lastMessage: ''}))
  },
})

export default connect(null, mapDispatchToProps)(ContactContainer)

