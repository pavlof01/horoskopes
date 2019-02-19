import React, { Component } from 'react';
import {
  StyleSheet, View, Dimensions, AsyncStorage, Animated, Easing,
} from 'react-native';
import PropType from 'prop-types';
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
    top: height / 5,
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
      signNameMarginTop: new Animated.Value(30),
      signNameFade: new Animated.Value(0),
    };
  }

  componentWillMount = async () => {
    const sign = await AsyncStorage.getItem('sign');
    this.setState({ sign });
  }

  componentDidMount = () => {
    this._signsAnim();
    this._signNameAnim();
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

  _signNameAnim = () => {
    const { delaySignNameAnim } = this.props;
    Animated.parallel([
      Animated.timing(this.state.signNameMarginTop, {
        toValue: 0,
        duration: 500,
        delay: delaySignNameAnim || 0,
      }),
      Animated.timing(this.state.signNameFade, {
        toValue: 0.7,
        duration: 500,
        delay: delaySignNameAnim || 0,
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
    const { signScale, signNameMarginTop, signNameFade } = this.state;
    const { compatibilitySign } = this.props;
    const { sign } = this.state;
    return (
      <View>
        <Animated.View style={[styles.userSignContainer, { transform: [{ scale: signScale }] }]}>
          <View style={styles.circle} />
          <View style={[styles.circle, styles.two]} />
          {this.userSign()}
        </Animated.View>
        <Animated.Text
          style={[styles.signName, { marginTop: signNameMarginTop, opacity: signNameFade }]}
        >
          {compatibilitySign || sign}
        </Animated.Text>
      </View>
    );
  }
}

UserSignWithCircles.defaultProp = {
  compatibilitySign: null,
  delayAnim: 0,
};

UserSignWithCircles.propTypes = {
  compatibilitySign: PropType.string,
  delayAnim: PropType.number,
  delaySignNameAnim: PropType.number,
};
