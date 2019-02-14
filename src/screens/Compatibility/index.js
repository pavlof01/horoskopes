import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   containerCircle: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     flexDirection: 'row',
//   },
//   center: {
//     backgroundColor: '#261919',
//     width: 90,
//     height: 90,
//     position: 'absolute',
//     alignSelf: 'center',
//   },
//   rightHalf: {
//     backgroundColor: '#FF813E',
//     height: '100%',
//     width: '50%',
//     borderTopLeftRadius: 50,
//     borderBottomLeftRadius: 50,
//   },
//   leftHalf: {
//     backgroundColor: '#FF813E',
//     height: '100%',
//     width: '50%',
//     borderTopRightRadius: 50,
//     borderBottomRightRadius: 50,
//   },
// });

export default class Compatibility extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CircularProgress percent={65} />
      </View>
    );
  }
}

const propStyle = (percent, base_degrees) => {
  const rotateBy = base_degrees + (percent * 3.6);
  return {
    transform: [{ rotateZ: `${rotateBy}deg` }],
  };
};

const renderThirdLayer = (percent) => {
  if (percent > 50) {
    return <View style={[styles.secondProgressLayer, propStyle((percent - 50), 45)]} />;
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderWidth: 20,
    borderRadius: 100,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstProgressLayer: {
    width: 200,
    height: 200,
    borderWidth: 20,
    borderRadius: 100,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#3498db',
    borderTopColor: '#3498db',
    transform: [{ rotateZ: '-135deg' }],
  },
  secondProgressLayer: {
    width: 200,
    height: 200,
    position: 'absolute',
    borderWidth: 20,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#3498db',
    borderTopColor: '#3498db',
    transform: [{ rotateZ: '45deg' }],
  },
  offsetLayer: {
    width: 200,
    height: 200,
    position: 'absolute',
    borderWidth: 20,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'grey',
    borderTopColor: 'grey',
    transform: [{ rotateZ: '-135deg' }],
  },
});
