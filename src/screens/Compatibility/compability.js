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
} from 'react-native';
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
  leftLine: {
    position: 'absolute',
    left: '33%',
    width: width / 6,
    height: 2,
    backgroundColor: '#85673f',
    zIndex: 10,
  },
  rightLine: {
    position: 'absolute',
    right: '33%',
    width: width / 6,
    height: 2,
    backgroundColor: '#85673f',
    zIndex: 10,
  },
  leftLineContainer: {
    position: 'absolute',
    left: positionOfLine(),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  rightLineContainer: {
    position: 'absolute',
    right: positionOfLine(),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
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
    };
  }

  componentWillMount = async () => {
    const sign = await AsyncStorage.getItem('sign');
    this.setState({ sign });
  }

  userSign = () => {
    const { sign } = this.state;
    if (sign) {
      return getZodiacIcon(sign);
    }
    return null;
  }

  render() {
    const { navigation } = this.props;
    const goBack = () => navigation.goBack();
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                resizeMode="cover"
                style={styles.arrowBackIcon}
                source={require('../../../assets/icons/arrow-left.png')}
              />
              <Text style={styles.backBtnText}>Back</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.compatibilityResultsContainer}>
            <UserSignWithCircles />
            <View style={styles.leftLineContainer}>
              <View style={styles.leftLine} />
              <View style={styles.circle} />
            </View>
            <CircularProgress percent={66} />
            <View style={styles.rightLineContainer}>
              <View style={styles.rightLine} />
              <View style={styles.circle} />
            </View>
            <UserSignWithCircles compatibilitySign="Libra" />
          </View>
          <Text style={[styles.title]}>Compatibility Score</Text>
          <Text style={styles.subTitle}>Copatibilites matters</Text>
          <TouchableOpacity style={styles.settingsIconContainer}>
            <Image
              style={styles.settingsIcon}
              source={require('../../../assets/icons/settings.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.overview}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.sectionText}>
            You’se likely to be on the receiving end of new, a gift or invitation and may even
            receive news of achievement regarding one or other of the activies. You’se likely to be
            on the receiving end of new, a gift or invitation .
          </Text>
        </View>
        <View style={styles.dating}>
          <View style={styles.datingHeader}>
            <Text style={styles.sectionTitle}>Dating</Text>
            <CircularProgress percent={66} />
          </View>
          <Text style={styles.sectionText}>
            You’se likely to be on the receiving end of new, a gift or invitation and may even
            receive news of achievement regarding one or other of the activies. You’se likely to be
            on the receiving end of new, a gift or invitation .
          </Text>
        </View>
      </ScrollView>
    );
  }
}
