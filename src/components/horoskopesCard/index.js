import React, { Component } from 'react';
import {
  Text, StyleSheet, View, Dimensions, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { setHeightSize, fontSize } from '../../utils';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width / 1.1,
    height: setHeightSize(60, 60, 60, 60, 50),
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  text: {
    color: '#fff',
  },
  bodyCard: {
    padding: setHeightSize(5, 5, 5, 5, 4),
    position: 'relative',
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
  },
  blackText: {
    color: '#0d0644',
  },
  notExpand: {
    height: setHeightSize(60, 60, 60, 60, 50),
  },
  expand: {
    height: setHeightSize(60, 60, 60, 60, 50),
  },
  readMoreContainer: {
    marginLeft: height / 15,
    position: 'absolute',
    bottom: -10,
    height: height / 15,
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
      isExpand,
      readMoreBtnColor,
      backgroundColorForSetOpacity,
      onExpand,
    } = this.props;
    return (
      <View style={[styles.container, isExpand || isToday ? styles.expand : styles.notExpand]}>
        <Image style={styles.imageBackground} resizeMode="contain" source={backgroundImage} />
        <View
          style={[styles.bodyCard, isExpand || isToday ? null : { paddingBottom: height / 50 }]}
        >
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
              <TouchableOpacity onPress={() => onExpand()}>
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
};

Day.propTypes = {
  body: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isToday: PropTypes.bool,
  backgroundImage: PropTypes.number.isRequired,
  isExpand: PropTypes.bool,
  readMoreBtnColor: PropTypes.string,
  backgroundColorForSetOpacity: PropTypes.string,
  onExpand: PropTypes.func,
};
