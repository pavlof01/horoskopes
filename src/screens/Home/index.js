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
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import getZodiacIcon, { setHeightSize, fontSize } from '../../utils';
import SignStat from '../../components/signStatistic';
import YourDayCard from '../../components/horoskopesCard';
import UserSignWithCircles from '../../components/userSignWithCircles';

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
  horoskopeDaysContainer: {
    position: 'absolute',
    zIndex: 999,
    elevation: 3,
    backgroundColor: '#000000',
    paddingTop: 25,
    paddingBottom: 5,
  },
  flatListItem: {
    color: '#c6c7cb',
    opacity: 0.5,
    paddingHorizontal: 15,
    fontFamily: 'Poppins-Medium',
    fontSize: height / 35,
  },
  isCurrentFlatListItem: {
    color: '#fff',
    opacity: 1,
  },
  currentFlatListItem: {
    width: 35,
    height: 1,
    borderColor: '#ff7e42',
    borderStyle: 'solid',
    borderWidth: 2,
    alignSelf: 'center',
  },
  cards: {
    margin: 10,
    marginTop: 100,
    alignItems: 'center',
  },
});

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      sign: null,
      currentHoroskope: 'Today',
      cardExpand: {
        love: false,
        carrer: false,
        helth: false,
      },
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
    this._cardsAnim();
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

  _cardsAnim = () => {
    Animated.sequence([
      Animated.timing(this.state.fadeCards, {
        toValue: 1,
        duration: 150,
        easing: Easing.bezier(0, 0.71, 1, 1),
      }),
      Animated.timing(this.state.topCards, {
        toValue: 0,
        duration: 250,
        easing: Easing.bezier(0, 0.71, 1, 1),
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

  renderItem = ({ item }) => {
    const { currentHoroskope } = this.state;
    const isCurrent = currentHoroskope === item;
    return (
      <TouchableOpacity onPress={() => this.setCurrentHoroskope(item)}>
        <View>
          <Text style={[styles.flatListItem, isCurrent ? styles.isCurrentFlatListItem : null]}>
            {item}
          </Text>
          {!isCurrent || <View style={styles.currentFlatListItem} />}
        </View>
      </TouchableOpacity>
    );
  }

  keyExtractor = item => `${item}`

  render() {
    const {
      headerHeightBackground,
      titlePosition,
      starsBackgroundHeaderPosition,
      userSignSkaleAnim,
      statAndSignNameContainer,
      flatListOfHoroskopesLeft,
      fadeCards,
      topCards,
    } = this.state;
    const { love, carrer, helth } = this.state.cardExpand;
    const topOfHoroskopeDays = this.state.scrollY.interpolate({
      inputRange: [0, setHeightSize(58.5)],
      outputRange: [setHeightSize(58.5), 0],
      extrapolate: 'clamp',
    });
    return (
      <View>
        <Animated.View
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
        </Animated.View>
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
          <Animated.View style={[styles.cards, { opacity: fadeCards, top: topCards }]}>
            <YourDayCard
              title="Your Day"
              isToday
              body="You’se likely to be on the receiving end of new, a gift or invitation and may even
            receive news of achievement regarding one or other of the activies. You’se likely to be
            on the receiving end of new, a gift or invitation ."
              backgroundImage={require('../../../assets/img/today-card.png')}
              backgroundColor="#9553f1"
            />
            <YourDayCard
              title="Your Love"
              body="You’se likely to be on the receiving end of new, a gift or invitation and may even receive news of achievement regarding one or other of the activies. You’se likely to be on the receiving end of new, a gift or invitation ."
              backgroundImage={require('../../../assets/img/your-love-card.png')}
              backgroundColor="#fec2cc"
              circleColor="#fe97a8"
              isExpand={love}
              backgroundColorForSetOpacity="rgba(254, 194, 204, 0.8)"
              onExpand={() => this.expandCard('love')}
            />
            <YourDayCard
              title="Your Career"
              body="You’se likely to be on the receiving end of new, a gift or invitation and may even receive news of achievement regarding one or other of the activies. You’se likely to be on the receiving end of new, a gift or invitation ."
              backgroundImage={require('../../../assets/img/your-carrer-card.png')}
              backgroundColor="#fcdcb2"
              circleColor="#fac47d"
              isExpand={carrer}
              readMoreBtnColor="#f58204"
              backgroundColorForSetOpacity="rgba(252, 220, 178, 0.8)"
              onExpand={() => this.expandCard('carrer')}
            />
            <YourDayCard
              title="Your Helth"
              body="You’se likely to be on the receiving end of new, a gift or invitation and may even receive news of achievement regarding one or other of the activies. You’se likely to be on the receiving end of new, a gift or invitation ."
              backgroundImage={require('../../../assets/img/your-helth-card.png')}
              backgroundColor="#cfbef0"
              circleColor="#ad91e6"
              isExpand={helth}
              readMoreBtnColor="#9553f1"
              backgroundColorForSetOpacity="rgba(207, 190, 240, 0.8)"
              onExpand={() => this.expandCard('helth')}
            />
          </Animated.View>
        </Animated.ScrollView>
      </View>
    );
  }
}
