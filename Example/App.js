import React from 'react'
import {View, Keyboard, TouchableWithoutFeedback} from 'react-native'

import MentionInput from '../src/MentionInput'
import styles from '../src/MentionInput/styles'
import MentionCell from '../src/MentionInput/MentionCell'

/**
 * Uniqueness for Object.
 */
const unique = array => {
  return [...new Set(array.map(s => JSON.stringify(s)))].map(s =>
    JSON.parse(s)
  )
}

/**
 * Dummy data set
 */
const users = [ 
  {id: 1, name: 'spiderman', image: 'https://vignette.wikia.nocookie.net/marvel-contestofchampions/images/a/a9/Spider-Man_%28Stark_Enhanced%29_portrait.png/revision/latest?cb=20170722100121'},
  {id: 3, name: 'ironman', image: 'https://mheroesgb.gcdn.netmarble.com/mheroesgb/DIST/Forum/hero_ironman01_S04.png'},
  {id: 4, name: 'captain_america', image: 'https://pbs.twimg.com/profile_images/685896589362216963/N2j7Rc9E_400x400.png'},
  {id: 5, name: 'wolverine', image: 'https://i.pinimg.com/474x/b3/b6/90/b3b6909a070bb5e7da45f30988646390--wolverine-movie-the-wolverine.jpg'},
  {id: 6, name: 'blackwidow', image: 'https://a.wattpad.com/useravatar/blackwidowisawesome.256.764312.jpg'},
  {id: 7, name: 'batman', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhbPvo9yMCxs2Yzy6TD6ikA_PfFOLNN0ebrpuffqqHSHvCEWkx'}
]

class MainApp extends React.Component {
  state = {
    inputText: '',
    isMentionBoxShown: false,
    isInputFieldActive: false,
    mentionSuggestions: [],
    allUniqueSuggestions: [], // suggestions shown in that instance. Eg first time suggestions shown are [1, 3, 4]
    // Second time shown are [2, 5, 6]. then `allUniquesSuggestions` -> [1, 2, 3, 4, 5, 6]
  }

  /**
   * InputText `onchangeText` callback
   */
  onChangeText = text => {
    this.setState({ inputText: text })
  }

  /**
   * Called by fake button that focuses or dismisses the text field.
   */
  toggleTextField = () => {
    this.setState(
      prevState => ({
        isInputFieldActive: !prevState.isInputFieldActive
      }),
      () => {
        this.state.isInputFieldActive
          ? this.inputField.focus()
          : Keyboard.dismiss()
      }
    )
  }

  searchUser = text => {
    return users.filter(usr => usr.name.search(text))
  }

  /**
   * Text field on change text event callback
   */
  mentioningChangeText = text => {
    const data = users
    const suggestions = data.filter(user => user.name.toUpperCase().includes(text.toUpperCase()))
    // to remove space between name 'Shark James' -> 'SharkJames'
    const transformedSuggestions = suggestions.map(item => ({
      ...item,
      name: item.name.replace(/\s/g, '')
    }))
    const allSuggestions = [...this.state.mentionSuggestions, ...transformedSuggestions]
    const allUniqueSuggestions = unique(allSuggestions)
    this.setState({ mentionSuggestions: transformedSuggestions, allUniqueSuggestions })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <View style={styles.inputFieldContainer}>
            {/* Text Input Field */}
            <MentionInput
              reference={comp => {
                this.inputField = comp
              }}
              placeholder="Post something of worth"
              onChangeText={this.onChangeText}
              mentionData={this.state.mentionSuggestions}
              mentioningChangeText={this.mentioningChangeText}
              renderMentionCell={({ item }) => {
                return <MentionCell name={item.name} image={item.avatar} />
              }}
              style={styles.inputField}
            />
            {/* Below button fakes the focusing of the input field */}
            <View style={{ flex: 1 }}>
              <TouchableWithoutFeedback
                style={styles.overlappingButton}
                onPress={this.toggleTextField}
              >
                <View style={styles.overlappingButton} />
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default MainApp
