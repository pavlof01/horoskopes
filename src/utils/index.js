import React from 'react';
import {
  Image, StyleSheet, Dimensions, View,
} from 'react-native';

const AIR = require('../../assets/img/air.png');
const EARTH = require('../../assets/img/earth.png');
const FIRE = require('../../assets/img/fire.png');
const WATER = require('../../assets/img/water.png');

const AQURIUS = require('../../assets/icons/aquarius.png');
const ARIES = require('../../assets/icons/aries.png');
const CANCER = require('../../assets/icons/cancer.png');
const CAPRICORN = require('../../assets/icons/capricorn.png');
const GEMINI = require('../../assets/icons/gemini.png');
const LEO = require('../../assets/icons/leo.png');
const LIBRA = require('../../assets/icons/libra.png');
const SAGITTARIUS = require('../../assets/icons/sagittarius.png');
const SCORPIO = require('../../assets/icons/scorpio.png');
const TAURUS = require('../../assets/icons/taurus.png');
const VIRGO = require('../../assets/icons/virgo.png');
const PISCES = require('../../assets/icons/pisces.png');

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  userSignContainer: {
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
});

function ZodiacItem({ icon, type, bigWidth }) {
  return (
    <View style={styles.userSignContainer}>
      {getZodiacBackground(type)}
      <Image style={[styles.icon, bigWidth ? styles.bigWidthIcon : null]} source={icon} />
    </View>
  );
}

export default function getZodiacIcon(name) {
  switch (name) {
    case 'Aquarius':
      return <ZodiacItem type="air" icon={AQURIUS} />;
    case 'Aries':
      return <ZodiacItem bigWidth type="fire" icon={ARIES} />;
    case 'Cancer':
      return <ZodiacItem type="water" icon={CANCER} />;
    case 'Capricorn':
      return <ZodiacItem type="earth" icon={CAPRICORN} />;
    case 'Gemini':
      return <ZodiacItem type="air" icon={GEMINI} />;
    case 'Leo':
      return <ZodiacItem type="fire" icon={LEO} />;
    case 'Libra':
      return <ZodiacItem type="air" icon={LIBRA} />;
    case 'Sagittarius':
      return <ZodiacItem type="fire" icon={SAGITTARIUS} />;
    case 'Scorpio':
      return <ZodiacItem type="water" icon={SCORPIO} />;
    case 'Taurus':
      return <ZodiacItem bigWidth type="earth" icon={TAURUS} />;
    case 'Virgo':
      return <ZodiacItem type="earth" icon={VIRGO} />;
    case 'Pisces':
      return <ZodiacItem type="water" icon={PISCES} />;
    default:
      return null;
  }
}

const getZodiacBackground = (type) => {
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
};
