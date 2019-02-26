import React, { Component } from 'react';
import {
  Text, StyleSheet, View, ScrollView, Image, Dimensions, AsyncStorage,
} from 'react-native';
import ProptTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import zodiacs from '../../../zodiacs.json';
import Header from '../../components/header';
import ZodiacItem from '../../components/zodiacItem';
import {
  getZodiacSign, setWidthSize, fontSize,
} from '../../utils';
import Button from '../../components/buttons';

const { height, width } = Dimensions.get('window');
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#000000',
  },
  backgrundStars: {
    position: 'absolute',
    width: '100%',
    height: height / 1.2,
    top: '30%',
    alignSelf: 'center',
  },
  carouselContainer: {
    marginTop: 20,
  },
  title: {
    opacity: 0.7,
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    fontSize: fontSize(2.5),
    marginBottom: 20,
  },
  renderMonthItem: {
    color: '#fff',
    textAlign: 'center',
    fontSize: height / 40,
  },
  btnContainer: {
    marginTop: 30,
    height: 80,
  },
  borderForActiveItem: {
    position: 'absolute',
    borderColor: '#ff7e42',
    borderRadius: 8,
    borderWidth: 2,
    alignSelf: 'center',
    bottom: -(height / 40) / 2 + 2,
  },
  month: {
    width: setWidthSize(30, 35, 35, 35, 35),
    height: height / 20,
  },
  date: {
    width: width / 10,
    height: height / 20,
  },
});

export default class PickSignByDate extends Component {
  constructor() {
    super();
    this.state = {
      currentMonth: 1,
      currentDate: 1,
      currentSign: 'Capricorn',
    };
  }

  renderZodiacItem = ({ item }) => (
    <ZodiacItem opacity={1} touchableOpacity={1} data={item} />
  )

  renderMonthItem = ({ item }) => (
    <Text style={styles.renderMonthItem}>{item.toUpperCase()}</Text>
  )

  renderDaysOfMonthItem = ({ item }) => <Text style={styles.renderMonthItem}>{item}</Text>

  getDaysOfMonth = (month) => {
    const daysInMonth = new Date(2019, month, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i += 1) {
      days.push(i);
    }
    return days;
  }

  getZodiacSignByDate = () => {
    const { currentMonth, currentDate } = this.state;
    const signId = getZodiacSign(currentDate, currentMonth).id;
    const sign = getZodiacSign(currentDate, currentMonth).name;
    this._carousel.snapToItem(signId);
    this.setState({ currentSign: sign });
  }

  goNext = () => {
    AsyncStorage.setItem('sign', this.state.currentSign);
    this.props.navigation.navigate('Home');
  }

  render() {
    const { currentMonth } = this.state;
    const detectSign = () => this.getZodiacSignByDate();
    const onContinue = () => this.goNext();
    return (
      <ScrollView style={styles.scrollView}>
        <Image style={styles.backgrundStars} source={require('../../../assets/img/bg-stars.png')} />
        <Header title={'Choose sign\nby date'} />
        <View style={styles.carouselContainer}>
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            loop
            scrollEnabled={false}
            data={zodiacs}
            renderItem={this.renderZodiacItem}
            sliderWidth={width}
            itemWidth={setWidthSize(30)}
            inactiveSlideOpacity={0.4}
          />
        </View>
        <View style={styles.carouselContainer}>
          <View style={[styles.borderForActiveItem, styles.month]} />
          <Text style={styles.title}>Select Month</Text>
          <Carousel
            loop
            data={MONTHS}
            renderItem={this.renderMonthItem}
            sliderWidth={width}
            itemWidth={height / 6}
            inactiveSlideOpacity={0.4}
            onSnapToItem={index => this.setState({ currentMonth: index + 1 }, () => detectSign())}
          />
        </View>
        <View style={styles.carouselContainer}>
          <View style={[styles.borderForActiveItem, styles.date]} />
          <Text style={styles.title}>Select Date</Text>
          <Carousel
            loop
            data={this.getDaysOfMonth(currentMonth)}
            renderItem={this.renderDaysOfMonthItem}
            sliderWidth={width}
            itemWidth={height / 12}
            inactiveSlideOpacity={0.4}
            onSnapToItem={index => this.setState({ currentDate: index + 1 }, () => detectSign())}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button onPress={onContinue} text="Continue" />
        </View>
      </ScrollView>
    );
  }
}

PickSignByDate.propTypes = {
  navigation: ProptTypes.shape({
    navigate: ProptTypes.func,
  }).isRequired,
};
