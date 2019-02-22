import React, { Component } from 'react';
import {
  Text, StyleSheet, View, Image, Dimensions, TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { setHeightSize, fontSize } from '../../utils';

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
    height: setHeightSize(3, 3, 3, 3, 2.5),
    width: setHeightSize(2, 2, 2, 1.5, 1.5),
  },
  backText: {
    color: '#ff7e42',
    fontFamily: 'Montserrat-Medium',
    fontSize: fontSize(2),
    marginLeft: 7,
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
    const { title, navigation, noBackArrow } = this.props;
    const goBack = () => navigation.goBack();
    return (
      <View>
        <Image style={styles.image} source={require('../../../assets/img/bg-home-header.png')} />
        {noBackArrow || (
        <TouchableOpacity onPress={goBack} style={styles.backContainer}>
          <Image style={styles.arrow} source={require('../../../assets/icons/arrow-left.png')} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        )}
        <Text style={styles.title}>
          {title}
        </Text>
      </View>
    );
  }
}

Header.defaultProps = {
  title: null,
  noBackArrow: false,
};

Header.propTypes = {
  title: PropTypes.string,
  noBackArrow: PropTypes.bool,
  navigation: PropTypes.object.isRequired, // eslint-disable-line
};

export default withNavigation(Header);
