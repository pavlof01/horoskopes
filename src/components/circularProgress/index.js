import React from 'react';
import {
  View, StyleSheet, Dimensions, Text,
} from 'react-native';

const { height } = Dimensions.get('window');

const WIDTH = height / 15;
const HEIGHT = height / 15;
const BORDER_RADIUIS = WIDTH / 2;
const BORDER_WIDTH = 5;
const BORDER_COLOR = '#fda929';

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUIS,
    borderColor: '#2b1f1f',
    backgroundColor: '#2b1f1f',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  firstProgressLayer: {
    width: WIDTH,
    height: HEIGHT,
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUIS,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: BORDER_COLOR,
    borderTopColor: BORDER_COLOR,
    transform: [{ rotateZ: '-135deg' }],
  },
  secondProgressLayer: {
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUIS,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: BORDER_COLOR,
    borderTopColor: BORDER_COLOR,
    transform: [{ rotateZ: '45deg' }],
  },
  offsetLayer: {
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUIS,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#2b1f1f',
    borderTopColor: '#2b1f1f',
    transform: [{ rotateZ: '-135deg' }],
  },
  text: {
    fontFamily: 'Poppins-Regular',
    position: 'absolute',
    fontSize: height / 65,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

const propStyle = (percent, base_degrees) => {
  const rotateBy = base_degrees + percent * 3.6;
  return {
    transform: [{ rotateZ: `${rotateBy}deg` }],
  };
};

const renderThirdLayer = (percent) => {
  if (percent > 50) {
    return <View style={[styles.secondProgressLayer, propStyle(percent - 50, 45)]} />;
  }
  return <View style={styles.offsetLayer} />;
};

const CircularProgress = ({ percent }) => {
  let firstProgressLayerStyle;
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.firstProgressLayer, firstProgressLayerStyle]} />
      {renderThirdLayer(percent)}
      <Text style={styles.text}>{`${percent}%`}</Text>
    </View>
  );
};

export default CircularProgress;
