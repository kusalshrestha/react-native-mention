import { StyleSheet } from 'react-native'

import colors from '../constants/colors'
import { getWidthRatio } from '../utils/ui'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  subContainer: {
    flex: 1,
    padding: 8,
    marginTop: 80
  },
  inputFieldContainer: {
    flex: 1,
    // backgroundColor: 'blue'
  },
  inputField: {
    // backgroundColor: 'red'
    // color: colors.transparent
  },
  overlappingButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: colors.transparent
  },
  // Action Buttons
  actionButtonContainer: {
    justifyContent: 'flex-end'
  },
  actionButton: {
    height: 44,
    flexDirection: 'row',
    marginVertical: 2,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: colors.lightestGray
  },
  actionButtonIcon: {
    tintColor: colors.black,
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  inputMocText: {
    color: 'blue',
    paddingTop: 2,
    position: 'absolute',
    zIndex: -1
  },
  username: {
    color: colors.iosBlue,
    fontWeight: 'bold'
  },
  hashTag: {
    color: colors.iosBlue,
    fontWeight: 'bold'
  },
})

export default styles
