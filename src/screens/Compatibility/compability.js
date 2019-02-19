import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  Dimensions,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import getZodiacIcon from '../../utils';
import UserSignWithCircles from '../../components/userSignWithCircles';
import CircularProgress from '../../components/circularProgress';

const { height, width } = Dimensions.get('window');

/**
 * set consts of device resolution
 */
const isSmall = height / width <= 1.5;
const isSemiSmall = height / width > 1.5 && height / width <= 1.6;
// const isMedium = height / width > 1.6 && height / width <= 1.7;

/**
 * function for detect mobile resolution
 * and set position of line that connect
 * both sign of compatibility
 */

const positionOfLine = () => {
  if (isSmall) {
    return '33.3%';
  }
  if (isSemiSmall) {
    return '33%';
  }
  return '32.5%';
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#000000',
  },
  header: {
    height: height / 3,
  },
  headerBackground: {
    width: '100%',
    height: '100%',
  },
  backgroundStars: {
    position: 'absolute',
    width: '100%',
    height: height / 1.5,
    top: '50%',
    alignSelf: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: height / 25,
    position: 'absolute',
    fontFamily: 'Poppins-Bold',
    paddingLeft: 20,
    top: '30%',
  },
  subTitle: {
    color: '#ffffff',
    fontSize: height / 40,
    position: 'absolute',
    fontFamily: 'Montserrat-Regular',
    paddingLeft: 22,
    opacity: 0.5,
    top: '52%',
  },
  settingsIconContainer: {
    position: 'absolute',
    top: '10%',
    right: '4%',
  },
  backArrowContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: '10%',
    left: '4%',
  },
  bodyBackArrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowBackIcon: {
    width: height / 60,
    height: height / 30,
  },
  backBtnText: {
    fontFamily: 'Montserrat-Medium',
    color: '#ff7e42',
    fontSize: height / 30,
    marginLeft: 10,
  },
  settingsIcon: {
    width: height / 20,
    height: height / 20,
  },
  compatibilityResultsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: -(height / 12),
  },
  circularProgressChildContainer: {
    width: height / 15,
    height: height / 15,
    borderRadius: height / 15 / 2,
    backgroundColor: '#2b1f1f',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 15,
  },
  circularProgressChildText: {
    color: '#ffffff',
    fontSize: height / 60,
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 90,
    top: '30%',
  },
  leftLine: {
    position: 'absolute',
    left: '33%',
    width: width / 6,
    height: 2,
    backgroundColor: '#85673f',
    zIndex: 5,
  },
  rightLine: {
    position: 'absolute',
    right: '33%',
    width: width / 6,
    height: 2,
    backgroundColor: '#85673f',
    zIndex: 5,
  },
  leftLineContainer: {
    position: 'absolute',
    left: positionOfLine(),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  rightLineContainer: {
    position: 'absolute',
    right: positionOfLine(),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  circle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffb165',
    zIndex: 10,
  },
  overview: {
    marginTop: isSemiSmall || isSmall ? '30%' : '35%',
    marginHorizontal: height / 20,
    height: isSemiSmall || isSmall ? 130 : 200,
  },
  sectionTitle: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: height / 25,
    height: 50,
  },
  sectionText: {
    color: '#fff',
    opacity: 0.78,
    fontFamily: 'Poppins-Light',
    fontSize: height / 40,
    height: isSemiSmall || isSmall ? 150 : 220,
  },
  dating: {
    marginTop: isSemiSmall || isSmall ? 60 : 30,
    marginHorizontal: height / 20,
    height: isSemiSmall || isSmall ? 200 : 250,
  },
  datingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default class Compatibility extends Component {
  constructor() {
    super();
    this.state = {
      sign: null,
      backArrowContainerTranslate: new Animated.Value(150),
      headerTitleFade: new Animated.Value(0),
      headerTitleTranslate: new Animated.Value(70),
      headerSubTitleFade: new Animated.Value(0),
      headerSubTitleTranslate: new Animated.Value(70),
      widthOfLeftLine: new Animated.Value(0),
      widthOfRightLine: new Animated.Value(0),
      rightCircleScale: new Animated.Value(0),
      leftCircleScale: new Animated.Value(0),
      overviewTop: new Animated.Value(150),
      overviewFade: new Animated.Value(0),
      datingTop: new Animated.Value(150),
      datingFade: new Animated.Value(0),
      circularProgressFade: new Animated.Value(1),
      circularProgressTop: new Animated.Value(100),
      circularProgressChildContainerScale: new Animated.Value(0),
    };
  }

  componentWillMount = async () => {
    const sign = await AsyncStorage.getItem('sign');
    this.setState({ sign });
  }

  componentDidMount = () => {
    this._backArrowContainerAnim();
    this._headerTitlesAnim();
    this._linesAnim();
    this._circlesAnim();
    this._sectionsAnim();
    this._circularProgressAnim();
  }

  _backArrowContainerAnim = () => {
    Animated.timing(this.state.backArrowContainerTranslate, {
      toValue: 0,
      duration: 500,
    }).start();
  }

  _headerTitlesAnim = () => {
    Animated.parallel([
      Animated.timing(this.state.headerTitleFade, {
        toValue: 1,
        duration: 500,
      }),
      Animated.timing(this.state.headerSubTitleFade, {
        toValue: 1,
        duration: 500,
      }),
      Animated.timing(this.state.headerTitleTranslate, {
        toValue: 0,
        duration: 500,
      }),
      Animated.timing(this.state.headerSubTitleTranslate, {
        toValue: 0,
        duration: 500,
      }),
    ]).start();
  }

  _linesAnim = () => {
    Animated.parallel([
      Animated.timing(this.state.widthOfLeftLine, {
        toValue: width / 6,
        duration: 500,
        delay: 700,
      }),
      Animated.timing(this.state.widthOfRightLine, {
        toValue: width / 6,
        duration: 700,
        delay: 700,
      }),
    ]).start();
  }

  _circlesAnim = () => {
    Animated.parallel([
      Animated.timing(this.state.leftCircleScale, {
        toValue: 1,
        duration: 250,
        delay: 500,
      }),
      Animated.timing(this.state.rightCircleScale, {
        toValue: 1,
        duration: 250,
        delay: 700,
      }),
    ]).start();
  }

  _sectionsAnim = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.overviewTop, {
          toValue: 0,
          duration: 500,
          delay: 250,
        }),
        Animated.timing(this.state.overviewFade, {
          toValue: 1,
          duration: 500,
          delay: 250,
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.state.datingTop, {
          toValue: 0,
          duration: 500,
        }),
        Animated.timing(this.state.datingFade, {
          toValue: 1,
          duration: 500,
        }),
      ]),
    ]).start();
  }

  _circularProgressAnim = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.circularProgressFade, {
          toValue: 1,
          duration: 500,
        }),
        Animated.timing(this.state.circularProgressTop, {
          toValue: 0,
          duration: 500,
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.state.circularProgressChildContainerScale, {
          toValue: 1,
          duration: 500,
        }),
      ]),
    ]).start();
  }

  userSign = () => {
    const { sign } = this.state;
    if (sign) {
      return getZodiacIcon(sign);
    }
    return null;
  }

  render() {
    const {
      backArrowContainerTranslate,
      headerTitleFade,
      headerSubTitleFade,
      headerTitleTranslate,
      headerSubTitleTranslate,
      widthOfLeftLine,
      widthOfRightLine,
      rightCircleScale,
      leftCircleScale,
      overviewTop,
      overviewFade,
      datingTop,
      datingFade,
      circularProgressChildContainerScale,
      circularProgressTop,
      circularProgressFade,
    } = this.state;
    const { navigation } = this.props;
    const goBack = () => navigation.goBack();
    console.disableYellowBox = true;
    return (
      <ScrollView style={styles.safeAreaView}>
        <Image
          style={[styles.backgroundStars]}
          resizeMode="stretch"
          source={require('../../../assets/img/bg-stars.png')}
        />
        <View style={styles.header}>
          <Image
            style={[styles.headerBackground]}
            resizeMode="stretch"
            source={require('../../../assets/img/bg-home-header.png')}
          />
          <TouchableOpacity onPress={goBack} style={styles.backArrowContainer}>
            <Animated.View
              style={[styles.bodyBackArrowContainer, { marginLeft: backArrowContainerTranslate }]}
            >
              <Image
                resizeMode="cover"
                style={styles.arrowBackIcon}
                source={require('../../../assets/icons/arrow-left.png')}
              />
              <Text style={styles.backBtnText}>Back</Text>
            </Animated.View>
          </TouchableOpacity>
          <View style={styles.compatibilityResultsContainer}>
            <UserSignWithCircles />
            <View style={styles.leftLineContainer}>
              <Animated.View style={[styles.leftLine, { width: widthOfLeftLine }]} />
              <Animated.View style={[styles.circle, { transform: [{ scale: leftCircleScale }] }]} />
            </View>
            <Animated.View style={{ opacity: circularProgressFade, top: circularProgressTop, zIndex: 80 }}>
              <CircularProgress
                size={height / 15}
                width={width / 70}
                fill={66}
                tintColor="#fe9635"
                backgroundColor="rgba(43, 31, 31, 0)"
                style={{ zIndex: 50 }}
              >
                {fill => (
                  <View>
                    <Animated.View
                      style={[
                        styles.circularProgressChildContainer,
                        { transform: [{ scale: circularProgressChildContainerScale }] },
                      ]}
                    >
                    </Animated.View>
                    <Text style={styles.circularProgressChildText}>{`${fill.toFixed(0)}%`}</Text>
                  </View>
                )}
              </CircularProgress>
            </Animated.View>
            <View style={styles.rightLineContainer}>
              <Animated.View style={[styles.rightLine, { width: widthOfRightLine }]} />
              <Animated.View
                style={[styles.circle, { transform: [{ scale: rightCircleScale }] }]}
              />
            </View>
            <UserSignWithCircles
              delaySignNameAnim={200}
              delayAnim={200}
              compatibilitySign="Libra"
            />
          </View>
          <Animated.Text
            style={[styles.title, { opacity: headerTitleFade, marginTop: headerTitleTranslate }]}
          >
            Compatibility Score
          </Animated.Text>
          <Animated.Text
            style={[
              styles.subTitle,
              { opacity: headerSubTitleFade, marginTop: headerSubTitleTranslate },
            ]}
          >
            Copatibilites matters
          </Animated.Text>
          <TouchableOpacity style={styles.settingsIconContainer}>
            <Image
              style={styles.settingsIcon}
              source={require('../../../assets/icons/settings.png')}
            />
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.overview, { top: overviewTop, opacity: overviewFade }]}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.sectionText}>
            You’se likely to be on the receiving end of new, a gift or invitation and may even
            receive news of achievement regarding one or other of the activies. You’se likely to be
            on the receiving end of new, a gift or invitation .
          </Text>
        </Animated.View>
        <Animated.View style={[styles.dating, { top: datingTop, opacity: datingFade }]}>
          <View style={styles.datingHeader}>
            <Text style={styles.sectionTitle}>Dating</Text>
            <CircularProgress percent={66} />
          </View>
          <Text style={styles.sectionText}>
            You’se likely to be on the receiving end of new, a gift or invitation and may even
            receive news of achievement regarding one or other of the activies. You’se likely to be
            on the receiving end of new, a gift or invitation .
          </Text>
        </Animated.View>
      </ScrollView>
    );
  }
}

Compatibility.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
