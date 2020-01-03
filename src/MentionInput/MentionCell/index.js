import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'

import colors from '../../constants/colors'

export const CELL_HEIGHT = 40

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginVertical: 2,
    height: CELL_HEIGHT,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 4,
    borderTopColor: colors.lightGray,
    borderBottomColor: colors.lightGray,
    alignItems: 'center'
  },
  imageContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: colors.lightestGray1
  },
  text: {
    paddingHorizontal: 10
  }
})

class MentionCell extends React.Component {

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={this.props.image} />
        </View>
        <Text style={styles.text}>{this.props.name}</Text>
      </View>
    )
  }
}

export default MentionCell
