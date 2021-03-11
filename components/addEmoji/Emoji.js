
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import EmojiInput from './src/EmojiInput';

// type Props = {};

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            currentEmoji: '',
            reset: false,
        }
    }

    handleEmojiSelected = (emoji) => {
        this.setState({ currentEmoji: emoji.char });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{
                    fontSize: 50,
                    textAlign: 'center',
                    margin: 50,
                    color: 'black'
                }}>
                    {this.state.currentEmoji}
                </Text>
                {/* <Text onPress={() => { this._emojiInput.clearFrequentlyUsedEmoji(); }}>
                    Remove Frequently Used Emoji
                </Text>
                <TouchableOpacity onPress={() => {
                    if (this.state.reset) {
                        this.setState({ reset: false })
                    } else {
                        this.setState({ reset: true })
                    }
                }}>
                    <Text>Clear</Text>
                </TouchableOpacity> */}
                <EmojiInput
                    onEmojiSelected={this.handleEmojiSelected}
                    ref={emojiInput => this._emojiInput = emojiInput}
                    resetSearch={this.state.reset}
                    loggingFunction={this.verboseLoggingFunction.bind(this)}
                    verboseLoggingFunction={true}
                />
            </View>
        );
    }

    loggingFunction(text) {
        console.log(text)
    }
    verboseLoggingFunction(text,type) {
        console.log(text,type)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});