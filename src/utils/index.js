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

/**
 * Return zodiac sugn by month and day
 *
 * @param day
 * @param month
 * @return {string | null} name of zodiac sign
 */
export function getZodiacSign(day, month) {
  const zodiacSigns = [
    'Capricorn',
    'Aquarius',
    'Pisces',
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
  ];

  if ((month === 1 && day <= 20) || (month === 12 && day >= 22)) {
    return { name: zodiacSigns[0], id: 0 };
  }
  if ((month === 1 && day >= 21) || (month === 2 && day <= 18)) {
    return { name: zodiacSigns[1], id: 1 };
  }
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return { name: zodiacSigns[2], id: 2 };
  }
  if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) {
    return { name: zodiacSigns[3], id: 3 };
  }
  if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) {
    return { name: zodiacSigns[4], id: 4 };
  }
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return { name: zodiacSigns[5], id: 5 };
  }
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
    return { name: zodiacSigns[6], id: 6 };
  }
  if ((month === 7 && day >= 23) || (month === 8 && day <= 23)) {
    return { name: zodiacSigns[7], id: 7 };
  }
  if ((month === 8 && day >= 24) || (month === 9 && day <= 23)) {
    return { name: zodiacSigns[8], id: 8 };
  }
  if ((month === 9 && day >= 24) || (month === 10 && day <= 23)) {
    return { name: zodiacSigns[9], id: 9 };
  }
  if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) {
    return { name: zodiacSigns[10], id: 10 };
  }
  if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) {
    return { name: zodiacSigns[11], id: 11 };
  }
  return null;
}
