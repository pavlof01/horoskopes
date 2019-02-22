import React, { Component } from 'react';
import {
  Text, StyleSheet, TouchableOpacity, Dimensions, Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { setHeightSize, fontSize } from '../../utils';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
  },
  touchableOpacity: {
    width: width / 1.2,
    height: setHeightSize(9, 8, 7, 7, 7),
    shadowColor: 'rgba(255, 132, 71, 0.39)',
    shadowOffset: { width: 9, height: 0 },
    shadowRadius: 29,
    borderRadius: 51,
  },
  linearGradient: {
    width: width / 1.2,
    height: setHeightSize(9, 8, 7, 7, 7),
    borderRadius: 51,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize(3),
  },
});

export default class Continue extends Component {
  render() {
    const { bottom, onPress, text } = this.props;
    const goNext = () => onPress();
    return (
      <Animated.View style={[styles.container, { bottom }]}>
        <TouchableOpacity onPress={goNext} style={[styles.touchableOpacity]}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#ffb577', '#ff7e42']}
            style={styles.linearGradient}
          >
            <Text style={styles.buttonText}>{text}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

Continue.propTypes = {
  bottom: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
