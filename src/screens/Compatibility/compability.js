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
    fontSize: height / 20,
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
    // right: 20,
    left: height / 3,
    // alignSelf: 'center',
    width: height / 15,
    height: 2,
    backgroundColor: '#856740',
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
            {/* <View style={styles.leftLine} /> */}
            <CircularProgress percent={66} />
            {/* <View style={styles.leftLine} /> */}
            <UserSignWithCircles />
          </View>
          <Text style={[styles.title]}>Compatibility</Text>
          <Text style={styles.subTitle}>Copatibilites matters</Text>
          <TouchableOpacity style={styles.settingsIconContainer}>
            <Image
              style={styles.settingsIcon}
              source={require('../../../assets/icons/settings.png')}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
