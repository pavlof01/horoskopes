import React, { Component } from 'react';
import {
  Text, StyleSheet, View, Image, Dimensions, TouchableOpacity,
} from 'react-native';
import getZodiacIcon from '../../utils';

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
            {getZodiacIcon(data.name)}
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
