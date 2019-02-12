import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  FlatList,
  Animated,
  AsyncStorage,
} from 'react-native';
import ZodiacItem from '../../components/zodiacItem';
import zodiacs from '../../../zodiacs.json';
import ContinueButton from '../../components/buttons/continue';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  flatList: {
    padding: '5%',
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  headerText: {
    color: '#fff',
    fontSize: height / 22,
    fontFamily: 'Poppins-Medium',
  },
  idkMySign: {
    color: '#ff7e42',
    fontSize: height / 40,
    fontFamily: 'Montserrat-Medium',
  },
});

export default class PickYourSign extends Component {
  constructor() {
    super();
    this.state = {
      active: null,
      bottomBtn: new Animated.Value(-300),
    };
  }

  header = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        Pick your
        {'\n'}
        zodiac sign
      </Text>
      <Text style={styles.idkMySign}>I dont know my sign</Text>
    </View>
  )

  pickSign = async (sign) => {
    this.setState({ active: sign }, () => {
      AsyncStorage.setItem('sign', this.state.active);
    });
    Animated.timing(this.state.bottomBtn, {
      toValue: height / 30,
      duration: 200,
    }).start();
  }

  renderItem = ({ item }) => (
    <ZodiacItem pickSign={this.pickSign} active={this.state.active} data={item} />
  )

  keyExtractor = item => `${item.name}`

  render() {
    const { bottomBtn } = this.state;
    return (
      <SafeAreaView>
        <ImageBackground
          resizeMode="cover"
          source={require('../../../assets/img/bg-pick-your-zodiac.png')}
          style={styles.background}
        >
          <FlatList
            contentContainerStyle={styles.flatList}
            extraData={this.state}
            ListHeaderComponent={this.header}
            keyExtractor={this.keyExtractor}
            data={zodiacs}
            renderItem={this.renderItem}
            numColumns={3}
            columnWrapperStyle={styles.columnWrapperStyle}
          />
          <ContinueButton bottom={bottomBtn} />
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
