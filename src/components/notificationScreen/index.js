import React, { Component } from 'react';
import {
  Text, StyleSheet, View, Image, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Header from '../header';
import Button from '../buttons';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
  },
  backgrundStars: {
    position: 'absolute',
    width: '100%',
    height: height / 1.2,
    top: '30%',
    alignSelf: 'center',
  },
  image: {
    width: height / 4,
    height: height / 4,
    alignSelf: 'center',
    marginTop: -(height / 4) / 2,

  },
  title: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: height / 25,
    paddingHorizontal: '15%',
    marginVertical: 15,

  },
  subTitle: {
    color: '#fff',
    opacity: 0.5,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontSize: height / 45,
    paddingHorizontal: '15%',
    marginBottom: 30,
  },
});

export default class NotificationScreen extends Component {
  render() {
    const {
      icon, title, subTitle, btnText,
    } = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.backgrundStars} source={require('../../../assets/img/bg-stars.png')} />
        <Header noBackArrow />
        <Image style={styles.image} source={icon} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <View>
          <Button onPress={() => { }} text={btnText} />
        </View>
      </View>
    );
  }
}

NotificationScreen.propTypes = {
  icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
};
