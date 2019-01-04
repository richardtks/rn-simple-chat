import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';
import { ListItem } from 'react-native-elements'
import PropTypes from 'prop-types';

export default class RoomList extends PureComponent { 
  renderItem = ({item}) => {
    const { name, lastmessage } = item;

    return (
      <ListItem
        title={name}
        titleStyle={{fontWeight: 'bold'}}
        titleProps={{numberOfLines: 1, }}
        rightTitle='today'
        subtitle={lastmessage}
        subtitleProps={{numberOfLines: 1, }}
        chevron
        bottomDivider
        leftAvatar={{size: 'medium', title: name[0], rounded: true}}
        onPress={this.props.handleOnPressItem(name)}
      />)
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          refreshing={this.props.isRefresh}
          onRefresh={this.props.handleOnRefresh} 
          keyExtractor={(item) => item.name}
          data={this.props.roomListData}
          renderItem={this.renderItem} />
      </View>
    );
  }
}

RoomList.propTypes = {
  isRefresh: PropTypes.bool.isRequired,
  handleOnRefresh: PropTypes.func.isRequired,
  roomListData: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

