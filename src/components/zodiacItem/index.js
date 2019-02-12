import React, { Component } from 'react';
import {
  Text, StyleSheet, View, Image, Dimensions, TouchableOpacity,
} from 'react-native';

const AIR = require('../../../assets/img/air.png');
const EARTH = require('../../../assets/img/earth.png');
const FIRE = require('../../../assets/img/fire.png');
const WATER = require('../../../assets/img/water.png');

const AQURIUS = require('../../../assets/icons/aquarius.png');
const ARIES = require('../../../assets/icons/aries.png');
const CANCER = require('../../../assets/icons/cancer.png');
const CAPRICORN = require('../../../assets/icons/capricorn.png');
const GEMINI = require('../../../assets/icons/gemini.png');
const LEO = require('../../../assets/icons/leo.png');
const LIBRA = require('../../../assets/icons/libra.png');
const SAGITTARIUS = require('../../../assets/icons/sagittarius.png');
const SCORPIO = require('../../../assets/icons/scorpio.png');
const TAURUS = require('../../../assets/icons/taurus.png');
const VIRGO = require('../../../assets/icons/virgo.png');
const PISCES = require('../../../assets/icons/pisces.png');

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
  bigWidthIcon: {
    width: height / 11,
  },
  name: {
    textAlign: 'center',
    color: '#fff',
  },
  pickedCheckBox: {
    position: 'absolute',
    width: height / 18,
    height: height / 18,
    top: 0,
    right: 0,
  },
  opacity1: {
    opacity: 1,
  },
  opacity05: {
    opacity: 0.5,
  },
});

export default class ZodiacItem extends Component {
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
    switch (name) {
      case 'Aquarius':
        return <Image style={styles.icon} source={AQURIUS} />;
      case 'Aries':
        return <Image style={[styles.icon, styles.bigWidthIcon]} source={ARIES} />;
      case 'Cancer':
        return <Image style={styles.icon} source={CANCER} />;
      case 'Capricorn':
        return <Image style={styles.icon} source={CAPRICORN} />;
      case 'Gemini':
        return <Image style={styles.icon} source={GEMINI} />;
      case 'Leo':
        return <Image style={styles.icon} source={LEO} />;
      case 'Libra':
        return <Image style={styles.icon} source={LIBRA} />;
      case 'Sagittarius':
        return <Image style={styles.icon} source={SAGITTARIUS} />;
      case 'Scorpio':
        return <Image style={styles.icon} source={SCORPIO} />;
      case 'Taurus':
        return <Image style={[styles.icon, styles.bigWidthIcon]} source={TAURUS} />;
      case 'Virgo':
        return <Image style={styles.icon} source={VIRGO} />;
      case 'Pisces':
        return <Image style={styles.icon} source={PISCES} />;
      default:
        return null;
    }
  }

  render() {
    const { data, pickSign, active } = this.props;
    const onPress = () => pickSign(data.name);
    const isActive = active === data.name;
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View
          style={active === null ? styles.opacity1 : isActive ? styles.opacity1 : styles.opacity05}
        >
          <View style={styles.backgroundContainer}>
            {this.getZodiacBackground(data.type)}
            {this.getZodiacIcon(data.name)}
            {isActive ? (
              <Image
                style={styles.pickedCheckBox}
                source={require('../../../assets/icons/picked_sign.png')}
              />
            ) : null}
          </View>
          <Text style={styles.name}>{data.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
