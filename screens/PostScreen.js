import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class PostScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Post Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});