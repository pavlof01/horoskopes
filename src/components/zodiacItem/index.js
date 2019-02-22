import React, { Component } from 'react';
import {
  Text, StyleSheet, View, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import getZodiacIcon, { setHeightSize } from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backgroundContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  name: {
    textAlign: 'center',
    color: '#fff',
  },
  pickedCheckBox: {
    position: 'absolute',
    width: setHeightSize(4, 3, 3, 3, 3),
    height: setHeightSize(4, 3, 3, 3, 3),
    top: setHeightSize(0, 0, 0, 0, 0),
    right: setHeightSize(1, 2, 1.5, 1.5, 0),
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
    const {
      data, pickSign, active, opacity, touchableOpacity,
    } = this.props;
    const onPress = () => pickSign(data.name);
    const isActive = active === data.name;
    return (
      <TouchableOpacity activeOpacity={touchableOpacity} onPress={onPress} style={styles.container}>
        <View
          style={
            active === null
              ? styles.opacity1
              : isActive
                ? styles.opacity1
                : opacity || styles.opacity05
          }
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

ZodiacItem.defaultProps = {
  pickSign: () => {},
  touchableOpacity: 0.2,
  opacity: 1,
  active: null,
};

ZodiacItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  pickSign: PropTypes.func,
  active: PropTypes.string,
  opacity: PropTypes.number,
  touchableOpacity: PropTypes.number,
};
