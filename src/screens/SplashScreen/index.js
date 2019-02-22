import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: height / 4,
    height: height / 4,
  },
  name: {
    marginTop: 26,
    fontSize: height / 17,
    color: '#D8D8D8',
    fontWeight: '300',
    fontFamily: 'CeraGR-Thin',
  },
});

export default class SplashScreen extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    /* LOADING IMITATION */
    setTimeout(() => navigation.navigate('PickYourSign'), 150);
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          style={styles.background}
          resizeMode="cover"
          source={require('../../../assets/img/bg-splash-screen.png')}
        >
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../../../assets/icons/logo.png')} />
            <Text style={styles.name}>HOROSKOPES</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
