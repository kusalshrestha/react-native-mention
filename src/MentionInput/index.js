import React, { Fragment } from 'react'
import ParsedText from 'react-native-parsed-text'
import { Keyboard, TextInput, TouchableOpacity } from 'react-native'

import styles from './styles'
import MentionBox, { HEIGHT } from './MentionBox'

class MentionInput extends React.PureComponent {
  constructor(props) {
    super(props)

    this.mainData = []
    this.cursorPostion = {
      start: 0,
      end: 0
    }

    this.state = {
      text: '',
      showMentionBox: false,
      isInputFieldActive: false,
      mentionBoxDimension: {
        top: 0,
        right: 0,
        width: 0,
        height: HEIGHT
      }
    }
  }

  /**
   * Text field on change text event callback
   */
  onChangeText = text => {
    this.setState({ text })
    this.props.onChangeText(text)
    this.mentioningChangeText(text)
  }

  composeData = words => {
    let wordRelativeIndex = 0

    return words.map((word, index) => {
      const hasToMention = word.includes("@")
      const wordAbsoluteIndex = index
      const wordLength = word.length
      if (index > 0) {
        wordRelativeIndex = wordRelativeIndex + words[index - 1].length + 1
      }

      return {
        word,
        wordLength,
        hasToMention,
        wordAbsoluteIndex,
        wordRelativeIndex
      }
    })
  }

  checkIfCursorIsAtTheWord = (word, cursor) =>
    cursor.start >= word.wordRelativeIndex + 1 &&
    cursor.start <= word.wordRelativeIndex + word.wordLength

  mentioningChangeText = text => {
    this.splittedText = text.split(" ")
    this.splittedTextCount = this.splittedText.length
    this.mainData = this.composeData(this.splittedText)

    this.mainData = this.mainData.map(item => {
      return {
        ...item,
        isCursorActive: this.checkIfCursorIsAtTheWord(item, this.cursorPostion)
      }
    })

    const wordAtCursor = this.mainData.find(item => item.isCursorActive)

    if (wordAtCursor && wordAtCursor.hasToMention) {
      this.setState({ showMentionBox: true })
      const words = wordAtCursor.word.split('@')
      this.props.mentioningChangeText(words[words.length - 1])
    } else {
      this.setState({ showMentionBox: false })
    }

    this.lastCursorPosition = this.cursorPostion
  }

  onSelectionChange = ({ nativeEvent }) => {
    this.cursorPostion = nativeEvent.selection
    this.mainData = this.mainData.map(item => {
      return {
        ...item,
        isCursorActive: this.checkIfCursorIsAtTheWord(item, this.cursorPostion)
      }
    })
  }

  onContentSizeChange = ({ nativeEvent }) => {
    this.setState(oldState => ({
      mentionBoxDimension: {
        ...oldState.mentionBoxDimension,
        top: nativeEvent.contentSize.height + 10
      }
    }))
  }

  onCellPress = item => {
    this.setState({ showMentionBox: false })
    this.mainData = this.mainData.map(data => {
      if (data.isCursorActive) {
        const words = data.word.split('@')
        const word = data.word.replace(`@${words[words.length - 1]}`, `@${item.name}`)

        return {
          ...data,
          word
        }
      }

      return data
    })

    let combinedText = ''
    this.mainData.forEach((word, index) => {
      const space = index === 0 ? '' : ' '
      combinedText = combinedText + space + word.word
    })
    this.setState({ text: combinedText })
    this.props.onChangeText(combinedText)
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

  handleNamePress = text => {
    // console.log('------xxxx', text)
  }

  /**
   * On TextInput layout
   */
  onLayout = ({ nativeEvent }) => {
    // console.log('onLayout', nativeEvent)
    this.setState(oldState => ({
      mentionBoxDimension: {
        ...oldState.mentionBoxDimension,
        width: nativeEvent.layout.width
      }
    }))
  }

  renderText(matchingString, matches) {
    let pattern = /@[A-Za-z0-9._-]*/;
    let match = matchingString.match(pattern);
    return `^^${match[1]}^^`;
  }

  render() {
    return (
      <Fragment>
        <Fragment>
          <TextInput
            multiline
            ref={comp => {
              this.inputField = comp
              this.props.reference(comp)
            }}
            onLayout={this.onLayout}
            onChangeText={this.onChangeText}
            placeholder={this.props.placeholder}
            onSelectionChange={this.onSelectionChange}
            onContentSizeChange={this.onContentSizeChange}
            style={[this.props.inputField, styles.inputField]}
          >
            <ParsedText
              style={styles.text}
              parse={[
                {
                  pattern: /@[A-Za-z0-9._-]*/,
                  style: styles.username,
                  onPress: this.handleNamePress
                },
                {
                  pattern: /#(\w+)/,
                  style: styles.hashTag
                }
              ]}
            >
              {this.state.text}
            </ParsedText>
          </TextInput>
        </Fragment>
        {this.state.showMentionBox && (
          <MentionBox
            data={this.props.mentionData}
            style={this.state.mentionBoxDimension}
            renderCell={({ item, index }) => (
              <TouchableOpacity onPress={() => this.onCellPress(item)}>
                {this.props.renderMentionCell({ item, index })}
              </TouchableOpacity>
            )}
          />
        )}
      </Fragment>
    )
  }
}

export default MentionInput 
