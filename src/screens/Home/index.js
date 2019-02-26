import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Animated,
  Easing,
  FlatList,
} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import getZodiacIcon, { setHeightSize, fontSize } from '../../utils';
import SignStat from '../../components/signStatistic';
import UserSignWithCircles from '../../components/userSignWithCircles';
import Today from './TimeLineHoroskopes/today';

const DAYS_HOROSKOPES = ['Yesterday', 'Today', 'Tomorrow', 'Weekly', 'Monthly', 'Yearly'];

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#000000',
  },
  header: {
    height: height / 3,
    marginBottom: setHeightSize(3, 5),
  },
  headerBackground: {
    width: '100%',
    height: '100%',
  },
  headerBackgroundStars: {
    position: 'absolute',
    width: '70%',
    height: '70%',
    alignSelf: 'center',
    top: '10%',
  },
  title: {
    color: '#2b2172',
    fontSize: fontSize(6, 8, 8, 8, 8.3),
    position: 'absolute',
    fontFamily: 'Poppins-Bold',
    left: '5%',
    width: '100%',
    top: '30%',
  },
  settingsIconContainer: {
    position: 'absolute',
    top: '15%',
    right: '4%',
  },
  settingsIcon: {
    width: setHeightSize(5, 4),
    height: setHeightSize(5, 4),
  },
  userSignContainer: {
    position: 'absolute',
    alignSelf: 'center',
    borderColor: '#ffb165',
    borderRadius: height / 8,
    padding: 10,
    /* take height of sign icon and devide to 2 and minus padding (vertical center)  */
    bottom: -(height / 8) / 2 - 10,
    transform: [{ scale: 1 }],
  },
  signUserContainer: {
    marginTop: height / 7,
  },
  userSignName: {
    color: '#ff7e42',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: fontSize(4, 4),
    textAlign: 'center',
    marginBottom: 10,
  },
  signStatistic: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flatListItem: {
    color: '#c6c7cb',
    opacity: 0.7,
    paddingHorizontal: 15,
    fontFamily: 'Poppins-Light',
    fontSize: fontSize(2.5),
  },
  isCurrentFlatListItem: {
    color: '#fff',
    opacity: 1,
    fontFamily: 'Poppins-Medium',
  },
});
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      sign: null,
      currentHoroskope: 'Today',
      index: 0,
      routes: [
        { key: 'Yesterday', title: 'Yesterday' },
        { key: 'Today', title: 'Today' },
        { key: 'Tomorrow', title: 'Tomorrow' },
        { key: 'Weekly', title: 'Weekly' },
        { key: 'Monthly', title: 'Monthly' },
        { key: 'Yearly', title: 'Yearly' },
      ],
      headerHeightBackground: new Animated.Value(0),
      titlePosition: new Animated.Value(0),
      starsBackgroundHeaderPosition: new Animated.Value(50),
      userSignSkaleAnim: new Animated.Value(0.3),
      statAndSignNameContainer: new Animated.Value(300),
      flatListOfHoroskopesLeft: new Animated.Value(-300),
      fadeCards: new Animated.Value(0),
      topCards: new Animated.Value(50),
      scrollY: new Animated.Value(0),
    };
  }

  componentWillMount = async () => {
    const sign = await AsyncStorage.getItem('sign');
    this.setState({ sign });
  }

  componentDidMount = () => {
    this._headerBackgroundAnim();
    this._titleAnim();
    this._starsBackgroundHeaderAnim();
    this._userSignAnim();
    this._userStatsAndSignNameContainerAnim();
    this._flatListOfHoroskopesAnim();
  }

  _headerBackgroundAnim = () => {
    Animated.timing(this.state.headerHeightBackground, {
      toValue: height / 3,
      duration: 500,
    }).start();
  }

  _titleAnim = () => {
    Animated.timing(this.state.titlePosition, {
      toValue: width / 4,
      duration: 500,
    }).start();
  }

  _starsBackgroundHeaderAnim = () => {
    Animated.timing(this.state.starsBackgroundHeaderPosition, {
      toValue: width / 4,
      duration: 500,
    }).start();
  }

  _userSignAnim = () => {
    Animated.sequence([
      Animated.timing(this.state.userSignSkaleAnim, {
        toValue: 1.2,
        duration: 250,
      }),
      Animated.timing(this.state.userSignSkaleAnim, {
        toValue: 1,
        duration: 250,
        easing: Easing.bezier(0, 0.71, 0.67, 0.47),
      }),
    ]).start();
  }

  _userStatsAndSignNameContainerAnim = () => {
    Animated.timing(this.state.statAndSignNameContainer, {
      toValue: 0,
      duration: 500,
      easing: Easing.bezier(0, 0.71, 0.67, 1),
    }).start();
  }

  _flatListOfHoroskopesAnim = () => {
    Animated.parallel([
      Animated.timing(this.state.flatListOfHoroskopesLeft, {
        toValue: 0,
        duration: 400,
        easing: Easing.bezier(0, 0.71, 0.67, 0.7),
      }),
    ]).start();
  }

  userSign = () => {
    const { sign } = this.state;
    if (sign) {
      return getZodiacIcon(sign);
    }
    return null;
  }

  setCurrentHoroskope = item => this.setState({ currentHoroskope: item })

  expandCard = card => this.setState((state) => {
    const newState = state;
    newState.cardExpand[card] = true;
    return newState;
  })

  keyExtractor = item => `${item}`

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'Yesterday':
        return <Today />;
      case 'Today':
        return <Today />;
      case 'Tomorrow':
        return <Today />;
      case 'Weekly':
        return <Today />;
      case 'Monthly':
        return <Today />;
      case 'Yearly':
        return <Today />;
      default:
        return null;
    }
  }

  render() {
    const {
      headerHeightBackground,
      titlePosition,
      starsBackgroundHeaderPosition,
      userSignSkaleAnim,
      statAndSignNameContainer,
      flatListOfHoroskopesLeft,
    } = this.state;
    const topOfHoroskopeDays = this.state.scrollY.interpolate({
      inputRange: [0, setHeightSize(58.5)],
      outputRange: [setHeightSize(58.5), 0],
      extrapolate: 'clamp',
    });
    return (
      <View>
        {/* <Animated.View
          style={[styles.horoskopeDaysContainer, {
            top: topOfHoroskopeDays,
            left: flatListOfHoroskopesLeft,
          }]}
        >
          <FlatList
            keyExtractor={this.keyExtractor}
            data={DAYS_HOROSKOPES}
            renderItem={this.renderItem}
            horizontal
          />
        </Animated.View> */}
        <Animated.ScrollView
          scrollEventThrottle={1}
          bounces={false}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: this.state.scrollY } },
            },
          ])}
          style={styles.safeAreaView}
        >
          <View style={styles.header}>
            <Animated.Image
              style={[styles.headerBackground, { height: headerHeightBackground }]}
              resizeMode="cover"
              source={require('../../../assets/img/bg-home-header.png')}
            />
            <Animated.Image
              style={[styles.headerBackgroundStars, { right: starsBackgroundHeaderPosition }]}
              resizeMode="stretch"
              source={require('../../../assets/img/stars-in-header.png')}
            />
            <Animated.View
              style={[styles.userSignContainer, { transform: [{ scale: userSignSkaleAnim }] }]}
            >
              <UserSignWithCircles
                scale={setHeightSize(0.17, 0.11, 0.12, 0.13, 0.1)}
                endOpactity={1}
                signTextStyles={styles.userSignName}
              />
            </Animated.View>
            <Animated.Text style={[styles.title, { right: titlePosition }]}>My Board</Animated.Text>
            <TouchableOpacity style={styles.settingsIconContainer}>
              <Image
                style={styles.settingsIcon}
                source={require('../../../assets/icons/settings.png')}
              />
            </TouchableOpacity>
          </View>
          <Animated.View style={[styles.signUserContainer, { top: statAndSignNameContainer }]}>
            <View style={styles.signStatistic}>
              <SignStat rate={2} color="#f5c970" text="Love" />
              <SignStat rate={3} color="#52e092" text="Health" />
              <SignStat rate={0} color="#ff637e" text="Career" />
            </View>
          </Animated.View>
          {/* TODO:! NEED REFACTORING AND CHANGE SOME STYLES */}
          <TabView
            navigationState={this.state}
            renderScene={this.renderScene}
            onIndexChange={index => this.setState({ index })}
            style={{ marginTop: 25 }}
            renderTabBar={props => (
              <TabBar
                {...props}
                style={{ backgroundColor: '#000', marginBottom: 25 }}
                indicatorStyle={{
                  backgroundColor: '#ff7e42', height: 3, borderRadius: 5, width: '8.333%', left: '4.16%',
                }}
                contentContainerStyle={{ backgroundColor: 'rgba(0,0,0,0,0)' }}
                scrollEnabled
                renderLabel={({ route, focused, color }) => (
                  <Text style={[styles.flatListItem, focused ? styles.isCurrentFlatListItem : null]}>
                    {route.title}
                  </Text>
                )}
              />
            )
            }
            initialLayout={{ width }}
          />
          {/* --------------- */}
        </Animated.ScrollView>
      </View>
    );
  }
}
