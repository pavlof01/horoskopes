import React, { Component } from 'react';
import {
  StyleSheet, View, Image, Dimensions, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { fontSize } from '../../utils';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: height / 3,
  },
  title: {
    position: 'absolute',
    top: (height / 3) / 2.5,
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize(3.5, 4, 4, 4.5, 5),
    left: '5%',
  },
});

class Header extends Component {
  render() {
    const { title } = this.props;
    return (
      <View>
        <Image style={styles.image} source={require('../../../assets/img/bg-home-header.png')} />
        <Text style={styles.title}>
          {title}
        </Text>
      </View>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
