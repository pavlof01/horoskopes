import React, { Component } from 'react';
import {
  Text, StyleSheet, View, Image, Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 5,
  },
  icon: {
    width: height / 40,
    height: height / 40,
    marginBottom: 5,
  },
  title: {
    color: 'rgb(144, 152, 175)',
  },
});

export default class TabBar extends Component {
  render() {
    const { routName, src } = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={src} />
        <Text style={styles.title}>{routName}</Text>
      </View>
    );
  }
}
