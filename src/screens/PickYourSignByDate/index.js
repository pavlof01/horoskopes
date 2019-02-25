import React, { Component } from 'react';
import {
  Text, StyleSheet, View, ScrollView, Image, Dimensions, AsyncStorage, FlatList,
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
      isScrollAnimating: false,
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

  detectItem = (e) => {
    const { isScrollAnimating } = this.state;
    const currentScroll = e.nativeEvent.contentOffset.x;
    // if (!isScrollAnimating) {
    if (currentScroll > 0 && currentScroll < 120) {
      return this.myFlatList.scrollToOffset({ offset: 10 });
    } if (currentScroll > 120 && currentScroll < 240) {
      return this.myFlatList.scrollToOffset({ offset: 130 });
    } if (currentScroll > 240 && currentScroll < 360) {
      return this.myFlatList.scrollToOffset({ offset: 250 });
    } if (currentScroll > 360 && currentScroll < 480) {
      return this.myFlatList.scrollToOffset({ offset: 370 });
    } if (currentScroll > 480 && currentScroll < 600) {
      return this.myFlatList.scrollToOffset({ offset: 490 });
    } if (currentScroll > 600 && currentScroll < 720) {
      return this.myFlatList.scrollToOffset({ offset: 610 });
    } if (currentScroll > 720 && currentScroll < 840) {
      return this.myFlatList.scrollToOffset({ offset: 730 });
    } if (currentScroll > 840 && currentScroll < 960) {
      return this.myFlatList.scrollToOffset({ offset: 850 });
    } if (currentScroll > 960 && currentScroll < 1080) {
      return this.myFlatList.scrollToOffset({ offset: 970 });
    } if (currentScroll > 1080 && currentScroll < 1200) {
      return this.myFlatList.scrollToOffset({ offset: 1090 });
    } if (currentScroll > 1200 && currentScroll < 1320) {
      return this.myFlatList.scrollToOffset({ offset: 1210 });
    } if (currentScroll > 1320 && currentScroll < 1440) {
      return this.myFlatList.scrollToOffset({ offset: 1330 });
    }
    // }
    // setTimeout(() => {
    //   if (isScrollAnimating) {
    //     if (currentScroll > 0 && currentScroll < 120) {
    //       return this.myFlatList.scrollToOffset({ offset: 10 });
    //     } if (currentScroll > 120 && currentScroll < 240) {
    //       return this.myFlatList.scrollToOffset({ offset: 130 });
    //     } if (currentScroll > 240 && currentScroll < 360) {
    //       return this.myFlatList.scrollToOffset({ offset: 250 });
    //     } if (currentScroll > 360 && currentScroll < 480) {
    //       return this.myFlatList.scrollToOffset({ offset: 370 });
    //     } if (currentScroll > 480 && currentScroll < 600) {
    //       return this.myFlatList.scrollToOffset({ offset: 490 });
    //     } if (currentScroll > 600 && currentScroll < 720) {
    //       return this.myFlatList.scrollToOffset({ offset: 610 });
    //     } if (currentScroll > 720 && currentScroll < 840) {
    //       return this.myFlatList.scrollToOffset({ offset: 730 });
    //     } if (currentScroll > 840 && currentScroll < 960) {
    //       return this.myFlatList.scrollToOffset({ offset: 850 });
    //     } if (currentScroll > 960 && currentScroll < 1080) {
    //       return this.myFlatList.scrollToOffset({ offset: 970 });
    //     } if (currentScroll > 1080 && currentScroll < 1200) {
    //       return this.myFlatList.scrollToOffset({ offset: 1090 });
    //     } if (currentScroll > 1200 && currentScroll < 1320) {
    //       return this.myFlatList.scrollToOffset({ offset: 1210 });
    //     } if (currentScroll > 1320 && currentScroll < 1440) {
    //       return this.myFlatList.scrollToOffset({ offset: 1330 });
    //     }
    //   }
    // }, 500);

    // console.warn(currentScroll);
    // this.myFlatList.scrollToIndex({ index: 2 });
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
          <FlatList
            contentContainerStyle={{ paddingHorizontal: width / 2 - 50 }}
            ref={list => this.myFlatList = list}
            data={MONTHS}
            // renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
            renderItem={this.renderMonthItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onMomentumScrollEnd={this.detectItem}
            // onMomentumScrollEnd={() => this.setState({ isScrollAnimating: false })}
            // onMomentumScrollBegin={() => this.setState({ isScrollAnimating: true })}
            // onScrollEndDrag={this.detectItem}
            // onScroll={this.detectItem}
            // scrollEventThrottle={200}
          />
          {/* <Carousel
            loop
            data={MONTHS}
            renderItem={this.renderMonthItem}
            sliderWidth={width}
            itemWidth={height / 6}
            inactiveSlideOpacity={0.4}
            onSnapToItem={index => this.setState({ currentMonth: index + 1 }, () => detectSign())}
          /> */}
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
