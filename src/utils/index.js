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

const { height, width } = Dimensions.get('window');
export const isSmall = height / width <= 1.5;
export const isSemiSmall = height / width > 1.5 && height / width <= 1.6;
export const isMedium = height / width > 1.6 && height / width <= 1.7;
export const isSemiMedium = height / width > 1.7 && height / width <= 1.8;
export const isLarge = height / width > 1.8 && height / width <= 2.2;

/**
 * func for set Height size depending of device resolution
 *
 * @param {Number} small
 * @param {Number} semiSmall
 * @param {Number} medium
 * @param {Number} semiMadium
 * @param {Number} large
 * @param {Number} def default value
 */

export const setHeightSize = (small, semiSmall, medium, semiMadium, large, def) => {
  if (isSmall) return rHeight(small);
  if (isSemiSmall) return rHeight(semiSmall);
  if (isMedium) return rHeight(medium);
  if (isSemiMedium) return rHeight(semiMadium);
  if (isLarge) return rHeight(large);
  return def;
};

/**
 * func for set Width size depending of device resolution
 *
 * @param {Number} small
 * @param {Number} semiSmall
 * @param {Number} medium
 * @param {Number} semiMadium
 * @param {Number} large
 * @param {Number} def default value
 */

export const setWidthSize = (small, semiSmall, medium, semiMadium, large, def) => {
  if (isSmall) return rWidth(small);
  if (isSemiSmall) return rWidth(semiSmall);
  if (isMedium) return rWidth(medium);
  if (isSemiMedium) return rWidth(semiMadium);
  if (isLarge) return rWidth(large);
  return def;
};

export const rHeight = h => height * (h / 100);

export const rWidth = w => width * (w / 100);

export const fontSize = (f) => {
  const tempHeight = (16 / 9) * width;
  return Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(width, 2)) * (f / 100);
};

const styles = StyleSheet.create({
  userSignContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: setHeightSize(13, 10, 10, 10, 10),
    height: setHeightSize(13, 10, 10, 10, 10),
  },
  icon: {
    width: setHeightSize(6, 5, 5, 5, 5),
    height: setHeightSize(6, 5, 5, 5, 5),
    position: 'absolute',
    overflow: 'visible',
  },
});

function ZodiacItem({ icon, type, bigWidth }) {
  return (
    <View style={styles.userSignContainer}>
      {getZodiacBackground(type)}
      <Image style={[styles.icon]} source={icon} />
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
