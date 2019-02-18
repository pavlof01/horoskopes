import React, { Component } from 'react';
import {
  StyleSheet, View, Dimensions, AsyncStorage, Text, Animated, Easing,
} from 'react-native';
import getZodiacIcon from '../../utils';

const { height, width } = Dimensions.get('window');

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
  signName: {
    position: 'absolute',
    color: '#ffffff',
    opacity: 0.7,
    fontSize: height / 30,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    top: '200%',
    textAlign: 'center',
    width: width / 2,
  },
});

export default class UserSignWithCircles extends Component {
  constructor() {
    super();
    this.state = {
      sign: null,
      signScale: new Animated.Value(0),
    };
  }

  componentWillMount = async () => {
    const sign = await AsyncStorage.getItem('sign');
    this.setState({ sign });
  }

  componentDidMount = () => {
    this._signsAnim();
  }


  _signsAnim = () => {
    const { delayAnim } = this.props;
    Animated.sequence([
      Animated.timing(this.state.signScale, {
        toValue: 1,
        duration: 250,
        delay: delayAnim || 0,
      }),
      Animated.timing(this.state.signScale, {
        toValue: 0.8,
        duration: 250,
        easing: Easing.bezier(0, 0.71, 0.67, 0.47),
      }),
    ]).start();
  }

  userSign = () => {
    const { sign } = this.state;
    if (sign) {
      return getZodiacIcon(sign);
    }
    return null;
  }

  render() {
    const { signScale } = this.state;
    const { compatibilitySign } = this.props;
    const { sign } = this.state;
    return (
      <Animated.View style={[styles.userSignContainer, { transform: [{ scale: signScale }] }]}>
        <View style={styles.circle} />
        <View style={[styles.circle, styles.two]} />
        {this.userSign()}
        <Text style={styles.signName}>{compatibilitySign || sign}</Text>
      </Animated.View>
    );
  }
}
