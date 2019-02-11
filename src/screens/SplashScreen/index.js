import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
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
    fontSize: 55,
    fontWeight: '300',
    color: '#fff',
  },
});

export default class SplashScreen extends Component {
  render() {
    return (
      <SafeAreaView>
        <ImageBackground
          style={styles.background}
          resizeMode="cover"
          source={require('../../../assets/img/bg-splash-screen.png')}
        >
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../../../assets/icons/logo.png')} />
            <Text style={styles.name}>sdfds</Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
