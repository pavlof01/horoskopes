import React, { Component } from 'react';
import {
  StyleSheet, View, Dimensions, AsyncStorage, Animated, Easing,
} from 'react-native';
import PropType from 'prop-types';
import getZodiacIcon, { setHeightSize } from '../../utils';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  userSignContainer: {
    marginHorizontal: height / 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ffb165',
    borderRadius: height / 8,
    padding: 10,
    transform: [{ scale: 0.8 }],
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    alignSelf: 'center',
    width: setHeightSize(22, 20),
    height: setHeightSize(22, 20),
    borderWidth: 1,
    borderColor: '#22163c',
    borderRadius: setHeightSize(22 / 2, 20 / 2),
  },
  two: {
    width: setHeightSize(26, 26),
    height: setHeightSize(26, 26),
    borderRadius: setHeightSize(26 / 2, 26 / 2),
  },
  signName: {
    position: 'absolute',
    color: '#ffffff',
    opacity: 0.7,
    fontSize: height / 30,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    top: setHeightSize(22, 18, 18, 19, 17),
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
    const { delayAnim, scale } = this.props;
    Animated.sequence([
      Animated.timing(this.state.signScale, {
        toValue: 1,
        duration: 250,
        delay: delayAnim || 0,
      }),
      Animated.timing(this.state.signScale, {
        toValue: scale || setHeightSize(0.15, 0.11, 0.12, 0.11, 0.08),
        duration: 250,
        easing: Easing.bezier(0, 0.71, 0.67, 0.47),
      }),
    ]).start();
  }

  _signNameAnim = () => {
    const { delaySignNameAnim, endOpactity } = this.props;
    Animated.parallel([
      Animated.timing(this.state.signNameMarginTop, {
        toValue: 0,
        duration: 500,
        delay: delaySignNameAnim || 0,
      }),
      Animated.timing(this.state.signNameFade, {
        toValue: endOpactity || 0.7,
        duration: 500,
        delay: delaySignNameAnim || 0,
      }),
    ]).start();
  }

  userSign = () => {
    const { sign } = this.state;
    const { compatibilitySign } = this.props;
    return getZodiacIcon(compatibilitySign || sign);
  }

  render() {
    const { signScale, signNameMarginTop, signNameFade } = this.state;
    const { compatibilitySign, signTextStyles, noAnim } = this.props;
    const { sign } = this.state;
    return (
      <View>
        <Animated.View style={[styles.userSignContainer, noAnim ? null : { transform: [{ scale: signScale }] }]}>
          <View style={styles.circle} />
          <View style={[styles.circle, styles.two]} />
          {this.userSign()}
        </Animated.View>
        <Animated.Text
          style={[
            styles.signName,
            signTextStyles,
            { marginTop: signNameMarginTop, opacity: signNameFade },
          ]}
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
  endOpactity: null,
  scale: null,
  signTextStyles: null,
  noAnim: false,
};

UserSignWithCircles.propTypes = {
  compatibilitySign: PropType.string,
  delayAnim: PropType.number,
  delaySignNameAnim: PropType.number,
  endOpactity: PropType.number,
  scale: PropType.number,
  noAnim: PropType.bool,
  signTextStyles: PropType.object, //eslint-disable-line
};
