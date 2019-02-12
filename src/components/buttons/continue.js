import React, { Component } from 'react';
import {
  Text, StyleSheet, TouchableOpacity, Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width / 1.2,
    height: 50,
    shadowColor: 'rgba(255, 132, 71, 0.39)',
    shadowOffset: { width: 9, height: 0 },
    shadowRadius: 29,
    borderRadius: 51,
    position: 'absolute',
    alignSelf: 'center',
    bottom: height / 30,
  },
  linearGradient: {
    width: width / 1.2,
    height: 50,
    borderRadius: 51,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontSize: height / 30,
  },
});

export default class Continue extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#ffb577', '#ff7e42']}
          style={styles.linearGradient}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
