import React, { Component } from 'react';
import {
  Text, StyleSheet, View, Image, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: height / 3,
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: '15%',
    left: '5%',
  },
  arrow: {
    height: height / 25,
    width: height / 40,
  },
  backText: {
    color: '#ff7e42',
    fontFamily: 'Montserrat-Medium',
    fontSize: height / 30,
    marginLeft: 7,
  },
  title: {
    position: 'absolute',
    top: (height / 3) / 2.5,
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontSize: height / 20,
    left: '5%',
  },
});

export default class Header extends Component {
  render() {
    const { title } = this.props;
    return (
      <View>
        <Image style={styles.image} source={require('../../../assets/img/bg-home-header.png')} />
        <View style={styles.backContainer}>
          <Image style={styles.arrow} source={require('../../../assets/icons/arrow-left.png')} />
          <Text style={styles.backText}>Back</Text>
        </View>
        <Text style={styles.title}>
          {title}
        </Text>
      </View>
    );
  }
}

Header.defaultProps = {
  title: null,
};

Header.propTypes = {
  title: PropTypes.string,
};
