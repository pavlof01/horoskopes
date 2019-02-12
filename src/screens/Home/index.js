import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import getZodiacIcon from '../../utils';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#000000',
    flex: 1,
  },
  header: {
    height: height / 3,
    justifyContent: 'center',
  },
  headerBackground: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: '#2b2172',
    fontSize: height / 12,
    position: 'absolute',
    fontFamily: 'Poppins-Bold',
    paddingLeft: 20,
  },
  settingsIconContainer: {
    position: 'absolute',
    top: '10%',
    right: '4%',
  },
  settingsIcon: {
    width: height / 20,
    height: height / 20,
  },
  userSignContainer: {
    position: 'absolute',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ffb165',
    borderRadius: height / 8,
    padding: 10,
    /* take height of sign icon and devide to 2 and minus padding (vertical center)  */
    bottom: -(height / 8) / 2 - 10,
  },
  circle: {
    position: 'absolute',
    alignSelf: 'center',
    width: height / 5,
    height: height / 5,
    borderWidth: 1,
    borderColor: '#22163c',
    borderRadius: height / 5,
    bottom: -(height / 5) / 2,
  },
  one: {

  },
  two: {
    width: height / 4,
    height: height / 4,
    borderRadius: height / 4,
    bottom: -(height / 4) / 2,
  },
});

export default class Home extends Component {
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
      <View style={styles.safeAreaView}>
        <View style={styles.header}>
          <Image
            style={styles.headerBackground}
            resizeMode="stretch"
            source={require('../../../assets/img/bg-home-header.png')}
          />
          <View style={styles.userSignContainer}>{this.userSign()}</View>
          <View style={[styles.circle, styles.one]} />
          <View style={[styles.circle, styles.two]} />
          <Text style={styles.title}>My Board</Text>
          <TouchableOpacity style={styles.settingsIconContainer}>
            <Image
              style={styles.settingsIcon}
              source={require('../../../assets/icons/settings.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
