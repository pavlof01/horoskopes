import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import getZodiacIcon from '../../utils';
import SignStat from '../../components/signStatistic';
import YourDayCard from '../../components/horoskopesCard';

const DAYS_HOROSKOPES = ['Yesterday', 'Today', 'Tomorrow', 'Weekly', 'Monthly', 'Yearly'];

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#000000',
  },
  header: {
    height: height / 3,
    justifyContent: 'center',
  },
  headerBackground: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: '#2b2172',
    fontSize: height / 12,
    position: 'absolute',
    fontFamily: 'Poppins-Bold',
    paddingLeft: 20,
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
    borderWidth: 1,
    borderColor: '#ffb165',
    borderRadius: height / 8,
    padding: 10,
    /* take height of sign icon and devide to 2 and minus padding (vertical center)  */
    bottom: -(height / 8) / 2 - 10,
  },
  circle: {
    position: 'absolute',
    alignSelf: 'center',
    width: height / 5,
    height: height / 5,
    borderWidth: 1,
    borderColor: '#22163c',
    borderRadius: height / 5,
    bottom: -(height / 5) / 2,
  },
  two: {
    width: height / 4,
    height: height / 4,
    borderRadius: height / 4,
    bottom: -(height / 4) / 2,
  },
  signUserContainer: {
    marginTop: height / 7,
  },
  userSignName: {
    color: '#ff7e42',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: height / 15,
    textAlign: 'center',
    marginBottom: 10,
  },
  signStatistic: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flatList: {
    marginTop: 30,
    height: 50,
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

  setCurrentHoroskope = item => this.setState({ currentHoroskope: item })

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
    const { sign } = this.state;
    const { love, carrer, helth } = this.state.cardExpand;
    return (
      <ScrollView style={styles.safeAreaView}>
        <View style={styles.header}>
          <Image
            style={styles.headerBackground}
            resizeMode="stretch"
            source={require('../../../assets/img/bg-home-header.png')}
          />
          <View style={styles.userSignContainer}>{this.userSign()}</View>
          <View style={styles.circle} />
          <View style={[styles.circle, styles.two]} />
          <Text style={styles.title}>My Board</Text>
          <TouchableOpacity style={styles.settingsIconContainer}>
            <Image
              style={styles.settingsIcon}
              source={require('../../../assets/icons/settings.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.signUserContainer}>
          <Text style={styles.userSignName}>{sign}</Text>
          <View style={styles.signStatistic}>
            <SignStat rate={2} color="#f5c970" text="Love" />
            <SignStat rate={3} color="#52e092" text="Health" />
            <SignStat rate={0} color="#ff637e" text="Career" />
          </View>
        </View>
        <FlatList
          style={styles.flatList}
          keyExtractor={this.keyExtractor}
          data={DAYS_HOROSKOPES}
          renderItem={this.renderItem}
          horizontal
        />
        <View style={styles.cards}>
          <YourDayCard
            title="Your Day"
            isToday
            body="You’se likely to be on the receiving end of new, a gift or invitation and may even
            receive news of achievement regarding one or other of the activies. You’se likely to be
            on the receiving end of new, a gift or invitation ."
            backgroundImage={require('../../../assets/img/bg-your-day-card.png')}
          />
          <YourDayCard
            title="Your Love"
            body="You’se likely to be on the receiving end of new, a gift or invitation and may even receive news of achievement regarding one or other of the activies. You’se likely to be on the receiving end of new, a gift or invitation ."
            backgroundImage={require('../../../assets/img/bg-your-love-card.png')}
            isExpand={love}
            backgroundColorForSetOpacity="rgba(254, 194, 204, 0.8)"
          />
          <YourDayCard
            title="Your Career"
            body="You’se likely to be on the receiving end of new, a gift or invitation and may even receive news of achievement regarding one or other of the activies. You’se likely to be on the receiving end of new, a gift or invitation ."
            backgroundImage={require('../../../assets/img/bg-your-carrer-card.png')}
            isExpand={carrer}
            readMoreBtnColor="#f58204"
            backgroundColorForSetOpacity="rgba(252, 220, 178, 0.8)"
          />
          <YourDayCard
            title="Your Helth"
            body="You’se likely to be on the receiving end of new, a gift or invitation and may even receive news of achievement regarding one or other of the activies. You’se likely to be on the receiving end of new, a gift or invitation ."
            backgroundImage={require('../../../assets/img/bg-your-helth-card.png')}
            isExpand={helth}
            readMoreBtnColor="#9553f1"
            backgroundColorForSetOpacity="rgba(207, 190, 240, 0.8)"
          />
        </View>
      </ScrollView>
    );
  }
}
