import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  AsyncStorage,
  FlatList,
  Platform,
} from 'react-native';
import ProptTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import zodiacs from '../../../zodiacs.json';
import Header from '../../components/header';
import ZodiacItem from '../../components/zodiacItem';
import { getZodiacSign, setWidthSize, fontSize } from '../../utils';
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
    width: 120,
  },
  renderDateItem: {
    color: '#fff',
    textAlign: 'center',
    fontSize: height / 40,
    width: 50,
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
    bottom: -(height / 80) / 3 + 2,
  },
  month: {
    width: 120, // setWidthSize(30, 35, 35, 35, 35),
    height: height / 20,
  },
  date: {
    width: width / 10,
    height: height / 20,
  },
  item: {
    color: '#fff',
    // paddingHorizontal: 15,
    // paddingVertical: 15,
    borderColor: 'red',
    borderWidth: 1,
    width: 100,
    textAlign: 'center',
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

  renderZodiacItem = ({ item }) => <ZodiacItem opacity={1} touchableOpacity={1} data={item} />

  renderMonthItem = ({ item }) => <Text style={styles.renderMonthItem}>{item.toUpperCase()}</Text>

  renderDaysOfMonthItem = ({ item }) => <Text style={styles.renderDateItem}>{item}</Text>

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

  /**
   * TODO:! NEED REFACTORING!!!!
   */

  _scrollFix = (e) => {
    let x = 0;
    const h = 120; // itemHeight;
    if (e.nativeEvent.contentOffset) {
      x = e.nativeEvent.contentOffset.x;
    }
    const selectedIndex = Math.round(x / h);
    const _y = selectedIndex * h;
    if (_y !== x) {
      if (Platform.OS === 'ios') {
        this.isScrollTo = true;
      }
      this.month.scrollToIndex({ index: selectedIndex, viewPosition: 0.5 });
      this.setState({ currentMonth: selectedIndex + 1 }, () => this.getZodiacSignByDate());
    }
    if (this.state.currentMonth === selectedIndex) {
      return null;
    }
    return null;
  }

  _onScrollBeginDrag = () => {
    this.dragStarted = true;
    if (Platform.OS === 'ios') {
      this.isScrollTo = false;
    }
    this.timer && clearTimeout(this.timer);
  }

  _onScrollEndDrag = (e) => {
    this.dragStarted = false;
    const _e = {
      nativeEvent: {
        contentOffset: {
          x: e.nativeEvent.contentOffset.x,
        },
      },
    };
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.momentumStarted && !this.dragStarted) {
        this._scrollFix(_e, 'timeout');
      }
    }, 10);
  }

  _onMomentumScrollBegin = (e) => {
    this.momentumStarted = true;
    this.timer && clearTimeout(this.timer);
  }

  _onMomentumScrollEnd = (e) => {
    this.momentumStarted = false;
    if (!this.isScrollTo && !this.momentumStarted && !this.dragStarted) {
      this._scrollFix(e);
    }
  }

  _scrollFixDate = (e) => {
    let x = 0;
    const h = 50; // itemHeight;
    if (e.nativeEvent.contentOffset) {
      x = e.nativeEvent.contentOffset.x;
    }
    const selectedIndex = Math.round(x / h);
    const _y = selectedIndex * h;
    if (_y !== x) {
      if (Platform.OS === 'ios') {
        this.isScrollToDate = true;
      }
      this.date.scrollToIndex({ index: selectedIndex, viewPosition: 0.5 });
      this.setState({ currentDate: selectedIndex + 1 }, () => this.getZodiacSignByDate());
    }
    if (this.state.currentDate === selectedIndex) {
      return null;
    }
    return null;
  }


  _onScrollBeginDragDate = () => {
    this.dragStartedDate = true;
    if (Platform.OS === 'ios') {
      this.isScrollToDate = false;
    }
    this.timerDate && clearTimeout(this.timerDate);
  }

  _onScrollEndDragDate = (e) => {
    this.dragStartedDate = false;
    const _e = {
      nativeEvent: {
        contentOffset: {
          x: e.nativeEvent.contentOffset.x,
        },
      },
    };
    this.timerDate && clearTimeout(this.timerDate);
    this.timerDate = setTimeout(() => {
      if (!this.momentumStartedDate && !this.dragStartedDate) {
        this._scrollFixDate(_e, 'timeout');
      }
    }, 10);
  }

  _onMomentumScrollBeginDate = (e) => {
    this.momentumStartedDate = true;
    this.timerDate && clearTimeout(this.timerDate);
  }

  _onMomentumScrollEndDate = (e) => {
    this.momentumStartedDate = false;
    if (!this.isScrollToDate && !this.momentumStartedDate && !this.dragStartedDate) {
      this._scrollFixDate(e);
    }
  }

  /* *********** */

  // scrollToIndex = (ind) => {
  //   this.setState({
  //     selectedIndex: ind,
  //   });
  //   // const y = this.itemHeight * ind;
  //   this.sview.scrollToIndex({ index: 3, viewPosition: 0.5 });
  // }

  // getSelected = () => {
  //   const selectedIndex = this.state.selectedIndex;
  //   const selectedValue = this.props.dataSource[selectedIndex];
  //   return selectedValue;
  // }

  render() {
    const { currentMonth } = this.state;
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
          <FlatList
            contentContainerStyle={{ paddingHorizontal: width / 2 - 60 }}
            ref={(month) => {
              this.month = month;
            }}
            data={MONTHS}
            renderItem={this.renderMonthItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={this._onMomentumScrollEnd}
            onMomentumScrollBegin={this._onMomentumScrollBegin}
            onScrollEndDrag={this._onScrollEndDrag}
            onScrollBeginDrag={this._onScrollBeginDrag}
          />
        </View>
        <View style={styles.carouselContainer}>
          <View style={[styles.borderForActiveItem, styles.date]} />
          <Text style={styles.title}>Select Date</Text>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: width / 2 - 25 }}
            ref={(date) => {
              this.date = date;
            }}
            data={this.getDaysOfMonth(currentMonth)}
            renderItem={this.renderDaysOfMonthItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={this._onMomentumScrollEndDate}
            onMomentumScrollBegin={this._onMomentumScrollBeginDate}
            onScrollEndDrag={this._onScrollEndDragDate}
            onScrollBeginDrag={this._onScrollBeginDragDate}
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
