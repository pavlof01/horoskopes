import React, { Component } from 'react';
import {
  Text, StyleSheet, View, Dimensions,
} from 'react-native';
import { setHeightSize } from '../../utils';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
  },
  rateContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rate: {
    width: setHeightSize(2, 1.5),
    height: setHeightSize(2, 1.5),
    borderRadius: setHeightSize(2 / 2, 1.5 / 2),
    backgroundColor: '#f5c970',
    marginHorizontal: 5,
  },
  empty: {
    backgroundColor: '#40403f',
  },
});

export default class SignStat extends Component {
  render() {
    const { text, color, rate } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{text}</Text>
        <View style={styles.rateContainer}>
          {/* not best dicision render statisctic of sign rate, maybe need rebuild */}
          <View style={[styles.rate, rate >= 1 ? { backgroundColor: color } : styles.empty]} />
          <View style={[styles.rate, rate >= 2 ? { backgroundColor: color } : styles.empty]} />
          <View style={[styles.rate, rate >= 3 ? { backgroundColor: color } : styles.empty]} />
        </View>
      </View>
    );
  }
}
