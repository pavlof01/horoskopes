import React, { Component } from 'react';
import {
  Text, StyleSheet, View, Dimensions, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { setHeightSize, setWidthSize, fontSize } from '../../utils';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width / 1.1,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    top: setHeightSize(-12),
    right: setHeightSize(-12),
    width: setHeightSize(30, 30, 30, 28, 26),
    height: setHeightSize(30, 30, 30, 28, 26),
    zIndex: 100,
    borderRadius: setHeightSize(18, 18, 18, 19, 18),
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    height: setHeightSize(10, 20, 20, 10, 10),
    width: setWidthSize(20, 30, 30, 30, 30),
    top: setHeightSize(3, 1, 1, 2, 2),
    right: setWidthSize(11, 5, 5, 7, 7),
    zIndex: 150,
  },
  todayImage: {
    top: 2,
    right: 0,
    height: setHeightSize(20, 20, 20, 20, 20),
    width: setWidthSize(50, 60, 60, 55, 60),
  },
  text: {
    color: '#fff',
  },
  bodyCard: {
    padding: setHeightSize(5, 5, 5, 5, 4),
    borderRadius: 25,
    overflow: 'hidden',
  },
  date: {
    color: '#bfdaf9',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 5,
    fontSize: fontSize(2),
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    marginBottom: setHeightSize(1),
    fontSize: fontSize(3),
  },
  mainText: {
    color: '#ffffff',
    fontFamily: 'Poppins-Light',
    fontSize: fontSize(2, 2, 2, 1.7, 1.8),
    marginTop: 15,
  },
  blackText: {
    color: '#0d0644',
  },
  readMoreContainer: {
    marginLeft: setWidthSize(7.2, 9, 9, 9, 8.5),
    position: 'absolute',
    bottom: 10,
    height: setHeightSize(7.5, 6),
    width: '100%',
    justifyContent: 'flex-end',
  },
  readMore: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: height / 50,
    color: '#000000',
  },
});

export default class Day extends Component {
  render() {
    const {
      body,
      title,
      isToday,
      backgroundImage,
      backgroundColor,
      circleColor,
      isExpand,
      readMoreBtnColor,
      backgroundColorForSetOpacity,
      onExpand,
    } = this.props;
    return (
      <View style={[styles.container]}>
        <View
          style={[styles.bodyCard, { backgroundColor }]}
        >
          {isToday || <View style={[styles.circle, { backgroundColor: circleColor }]} />}
          <Image resizeMode="contain" style={[styles.image, isToday ? styles.todayImage : null]} source={backgroundImage} />
          <Text style={[styles.text, styles.date]}>{isToday ? '8/09/2019' : null}</Text>
          <Text style={[styles.text, styles.title, !isToday ? styles.blackText : null]}>
            {title}
          </Text>
          <Text
            numberOfLines={isExpand || isToday ? null : 3}
            style={[styles.text, styles.mainText, !isToday ? styles.blackText : null]}
          >
            {body}
          </Text>
          {isExpand || isToday ? null : (
            <View
              style={[styles.readMoreContainer, { backgroundColor: backgroundColorForSetOpacity }]}
            >
              <TouchableOpacity onPress={onExpand}>
                <Text style={[styles.readMore, { color: readMoreBtnColor }]}>Read More</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}

Day.defaultProps = {
  backgroundColorForSetOpacity: null,
  isToday: null,
  readMoreBtnColor: null,
  isExpand: null,
  onExpand: null,
  circleColor: null,
};

Day.propTypes = {
  body: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isToday: PropTypes.bool,
  backgroundImage: PropTypes.number.isRequired,
  isExpand: PropTypes.bool,
  readMoreBtnColor: PropTypes.string,
  backgroundColorForSetOpacity: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  circleColor: PropTypes.string,
  onExpand: PropTypes.func,
};
