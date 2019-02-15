import React, { Component } from 'react';
import {
  StyleSheet, View, Dimensions, AsyncStorage,
} from 'react-native';
import getZodiacIcon from '../../utils';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  userSignContainer: {
    marginHorizontal: height / 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ffb165',
    borderRadius: height / 8,
    padding: 10,
    /* take height of sign icon and devide to 2 and minus padding (vertical center)  */
    // bottom: -(height / 8) / 2 - 10,
    transform: [{ scale: 0.8 }],
  },
  circle: {
    position: 'absolute',
    alignSelf: 'center',
    width: height / 5,
    height: height / 5,
    borderWidth: 1,
    borderColor: '#22163c',
    borderRadius: height / 5,
    top: -(height / 5) / 10,
  },
  two: {
    width: height / 4,
    height: height / 4,
    borderRadius: height / 4,
    top: -(height / 4) / 6,
  },
});

export default class UserSignWithCircles extends Component {
  constructor() {
    super();
    this.state = {
      sign: null,
    };
  }

  componentWillMount = async () => {
    const sign = await AsyncStorage.getItem('sign');
    this.setState({ sign });
  }

  userSign = () => {
    const { sign } = this.state;
    if (sign) {
      return getZodiacIcon(sign);
    }
    return null;
  }

  render() {
    return (
      <View style={[styles.userSignContainer]}>
        <View style={styles.circle} />
        <View style={[styles.circle, styles.two]} />
        {this.userSign()}
      </View>
    );
  }
}
