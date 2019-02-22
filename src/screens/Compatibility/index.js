import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import getZodiacIcon, { setHeightSize, fontSize } from '../../utils';
import zodiacs from '../../../zodiacs.json';
import ZodiacItem from '../../components/zodiacItem';
import BaseButton from '../../components/buttons';
import UserSignWithCircles from '../../components/userSignWithCircles';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#000000',
  },
  header: {
    height: height / 3,
    marginBottom: setHeightSize(18),
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
    fontSize: fontSize(5),
    position: 'absolute',
    fontFamily: 'Poppins-Bold',
    paddingLeft: 20,
    top: '30%',
  },
  subTitle: {
    color: '#ffffff',
    fontSize: fontSize(3),
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
  settingsIcon: {
    width: height / 20,
    height: height / 20,
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
  userSignText: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    marginTop: height / 7,
  },
  plusIcon: {
    width: height / 25,
    height: height / 25,
    alignSelf: 'center',
    marginVertical: height / 25,
  },
});

export default class Compability extends Component {
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

  checkCompatibility = async () => {
    // await AsyncStorage.setItem('compability', this._carousel.currentIndex);
    this.props.navigation.navigate('CompatibilityResult');
  }

  renderItem = ({ item }) => <ZodiacItem opacity={1} pickSign={() => {}} active="" data={item} />

  render() {
    const { sign } = this.state;
    return (
      <ScrollView style={styles.safeAreaView}>
        <Image
          style={[styles.backgroundStars]}
          resizeMode="cover"
          source={require('../../../assets/img/bg-stars.png')}
        />
        <View style={styles.header}>
          <Image
            style={[styles.headerBackground]}
            resizeMode="stretch"
            source={require('../../../assets/img/bg-home-header.png')}
          />
          <View style={styles.userSignContainer}>
            <UserSignWithCircles signTextStyles={styles.userSignText} />
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
        <Image style={styles.plusIcon} source={require('../../../assets/icons/plus.png')} />
        <View>
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            loop
            data={zodiacs}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={height / 6}
            inactiveSlideOpacity={0.4}
            // onSnapToItem={index => console.warn(index)}
          />
        </View>
        <View style={{ height: 50 }}>
          <BaseButton onPress={this.checkCompatibility} text="Check Compatibility" />
        </View>
      </ScrollView>
    );
  }
}
