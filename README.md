# React Native Mention 🚀

Facebook like mention input. Thanks to `react-native-parsed-text`

![Demo](https://github.com/kusalshrestha/react-native-mention/blob/master/demo.gif)

## Installation

```
npm install --save react-native-mention
```
```
yarn add react-native-mention
```

## Usage
```js
import SegmentContorl from 'react-native-mention';

render() {
  return (
    <View style={styles.mainContainer}>
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
    </View>
  )
}
```

## Properties

| Prop | Type | Description |
|---|---|---|
|**`placeholder`**|`String`|Placeholder text.|
|**`mentionData`**|`Array(Object)`|Array of object. Basically suggestions to be mentioned.|
|**`onChangeText`**|`function`|On text change callback.|
|**`mentioningChangeText`**|`function`|on mention text callback.|
|**`renderMentionCell`**|`Element`|Element to show on mention suggestions.|

## License

MIT