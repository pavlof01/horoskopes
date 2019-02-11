import React, { Component } from 'react';
import {
  Text, StyleSheet, View, Image, Dimensions,
} from 'react-native';

const AIR = require('../../../assets/img/air.png');
const EARTH = require('../../../assets/img/earth.png');
const FIRE = require('../../../assets/img/fire.png');
const WATER = require('../../../assets/img/water.png');

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backgroundContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: height / 8,
    height: height / 8,
  },
  icon: {
    width: height / 16,
    height: height / 16,
    position: 'absolute',
  },
  name: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default class index extends Component {
  getZodiacBackground = (type) => {
    switch (type) {
      case 'air':
        return <Image style={styles.image} source={AIR} />;
      case 'water':
        return <Image style={styles.image} source={WATER} />;
      case 'fire':
        return <Image style={styles.image} source={FIRE} />;
      case 'earth':
        return <Image style={styles.image} source={EARTH} />;
      default:
        return null;
    }
  }

  getZodiacIcon = (name) => {
    // switch (name) {
    //   case 'air':
    //     return <Image style={styles.image} source={AIR} />;
    //   case 'water':
    //     return <Image style={styles.image} source={WATER} />;
    //   case 'fire':
    //     return <Image style={styles.image} source={FIRE} />;
    //   case 'earth':
    //     return <Image style={styles.image} source={EARTH} />;
    //   default:
    //     return null;
    // }
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          {this.getZodiacBackground(data.type)}
          <Image style={styles.icon} source={require('../../../assets/icons/pisces.png')} />
        </View>
        <Text style={styles.name}>{data.name}</Text>
      </View>
    );
  }
}
