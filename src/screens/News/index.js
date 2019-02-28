import React, { Component } from 'react';
import {
  Text, StyleSheet, View, ScrollView, Image,
} from 'react-native';
import { Tab, Tabs, ScrollableTab } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { fontSize } from '../../utils';
import Header from '../../components/header';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  title: {
    top: '25%',
  },
  tabs: {
    height: 250,
    marginTop: -70,
  },
  containerTab: {
    backgroundColor: 'transparent',
  },
  tabStyle: {
    backgroundColor: 'transparent',
  },
  activeTabStyle: {
    backgroundColor: 'transparent',
  },
  textStyle: {
    color: '#c6c7cb',
    opacity: 0.7,
    paddingHorizontal: 15,
    fontFamily: 'Poppins-Light',
    fontSize: fontSize(2.5),
  },
  activeTextStyle: {
    color: '#fff',
    opacity: 1,
    fontFamily: 'Poppins-Medium',
  },
  scrollView: {
    height: 150,
  },
  scrollItem: {
    height: 150,
    marginTop: 30,
    marginHorizontal: 15,
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 12,
  },
  scrollItemText: {
    position: 'absolute',
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
    fontSize: fontSize(2),
    textAlign: 'center',
    paddingHorizontal: 15,
    alignSelf: 'center',
    bottom: 5,
    zIndex: 10,
  },
  scrollItemLinearGradient: {
    position: 'absolute',
    top: 0,
    width: 250,
    zIndex: 5,
    height: 150,
  },
  recommendContainer: {},
  recommendTitle: {
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
    opacity: 0.8,
    marginLeft: 15,
    fontSize: fontSize(2.2),
    marginBottom: 5,
  },
  recommendItemContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    backgroundColor: '#292b34',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
  },
  recommendImage: {
    width: 80,
    height: 80,
  },
  recommendText: {
    width: 220,
    paddingLeft: 15,
    color: '#ffffff',
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize(2),
  },
});

export default class News extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header title="News" titleStyles={styles.title} imageStyles={{ height: 200 }} />
        <View style={styles.tabs}>
          <Tabs
            style={styles.containerTab}
            locked
            tabBarUnderlineStyle={{ backgroundColor: '#ff7e42' }}
            prerenderingSiblingsNumber={6}
            renderTabBar={() => (
              <ScrollableTab style={{ borderWidth: 0, backgroundColor: 'transparent' }} />
            )}
          >
            {/* TODO:! NEED REFACTORING TABS */}
            <Tab
              style={styles.containerTab}
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              textStyle={styles.textStyle}
              activeTextStyle={styles.activeTextStyle}
              heading="Latest"
            >
              <ScrollView horizontal style={styles.scrollView}>
                <View style={styles.scrollItem}>
                  <LinearGradient
                    colors={['rgba(0,0,0, 0.3)', 'rgba(0,0,0,1)']}
                    style={styles.scrollItemLinearGradient}
                  />
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{ uri: 'https://picsum.photos/300/300' }}
                  />
                  <Text style={styles.scrollItemText}>
                    Happiness is the result of a well lived life
                  </Text>
                </View>
                <View style={styles.scrollItem}>
                  <LinearGradient
                    colors={['rgba(0,0,0, 0.1)', 'rgba(0,0,0,1)']}
                    style={styles.scrollItemLinearGradient}
                  />
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{ uri: 'https://picsum.photos/400/300' }}
                  />
                  <Text style={styles.scrollItemText}>
                    Happiness is the result of a well lived life
                  </Text>
                </View>
                <View style={styles.scrollItem}>
                  <LinearGradient
                    colors={['rgba(0,0,0, 0.1)', 'rgba(0,0,0,0.5)']}
                    style={styles.scrollItemLinearGradient}
                  />
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{ uri: 'https://picsum.photos/400/300' }}
                  />
                  <Text style={styles.scrollItemText}>
                    Happiness is the result of a well lived life
                  </Text>
                </View>
              </ScrollView>
            </Tab>
            <Tab
              style={styles.containerTab}
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              textStyle={styles.textStyle}
              activeTextStyle={styles.activeTextStyle}
              heading="Hottest"
            >
              <ScrollView horizontal style={styles.scrollView}>
                <View style={styles.scrollItem}>
                  <LinearGradient
                    colors={['rgba(0,0,0, 0.1)', 'rgba(0,0,0,0.5)']}
                    style={styles.scrollItemLinearGradient}
                  />
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{ uri: 'https://picsum.photos/400/300' }}
                  />
                  <Text style={styles.scrollItemText}>
                    Happiness is the result of a well lived life
                  </Text>
                </View>
                <View style={styles.scrollItem}>
                  <LinearGradient
                    colors={['rgba(0,0,0, 0.1)', 'rgba(0,0,0,0.5)']}
                    style={styles.scrollItemLinearGradient}
                  />
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{ uri: 'https://picsum.photos/400/300' }}
                  />
                  <Text style={styles.scrollItemText}>
                    Happiness is the result of a well lived life
                  </Text>
                </View>
                <View style={styles.scrollItem}>
                  <LinearGradient
                    colors={['rgba(0,0,0, 0.1)', 'rgba(0,0,0,0.5)']}
                    style={styles.scrollItemLinearGradient}
                  />
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{ uri: 'https://picsum.photos/400/300' }}
                  />
                  <Text style={styles.scrollItemText}>
                    Happiness is the result of a well lived life
                  </Text>
                </View>
              </ScrollView>
            </Tab>
            <Tab
              style={styles.containerTab}
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              textStyle={styles.textStyle}
              activeTextStyle={styles.activeTextStyle}
              heading="Editors Pic"
            >
              {/* <Today /> */}
            </Tab>
            <Tab
              style={styles.containerTab}
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              textStyle={styles.textStyle}
              activeTextStyle={styles.activeTextStyle}
              heading="Monthly"
            >
              {/* <Today /> */}
            </Tab>
            <Tab
              style={styles.containerTab}
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              textStyle={styles.textStyle}
              activeTextStyle={styles.activeTextStyle}
              heading="Yearly"
            >
              {/* <Today /> */}
            </Tab>
          </Tabs>
        </View>
        <View style={styles.recommendContainer}>
          <Text style={styles.recommendTitle}>Recommend</Text>
          <ScrollView>
            <View style={styles.recommendItemContainer}>
              <Image
                resizeMode="cover"
                style={styles.recommendImage}
                source={{ uri: 'https://picsum.photos/400/300' }}
              />
              <Text style={styles.recommendText}>
                Starbucks releases chart that matches their drinks to your zodiac sign
              </Text>
            </View>
            <View style={styles.recommendItemContainer}>
              <Image
                resizeMode="cover"
                style={styles.recommendImage}
                source={{ uri: 'https://picsum.photos/400/300' }}
              />
              <Text style={styles.recommendText}>
                Starbucks releases chart that matches their drinks to your zodiac sign
              </Text>
            </View>
            <View style={styles.recommendItemContainer}>
              <Image
                resizeMode="cover"
                style={styles.recommendImage}
                source={{ uri: 'https://picsum.photos/400/300' }}
              />
              <Text style={styles.recommendText}>
                Starbucks releases chart that matches their drinks to your zodiac sign
              </Text>
            </View>
            <View style={styles.recommendItemContainer}>
              <Image
                resizeMode="cover"
                style={styles.recommendImage}
                source={{ uri: 'https://picsum.photos/400/300' }}
              />
              <Text style={styles.recommendText}>
                Starbucks releases chart that matches their drinks to your zodiac sign
              </Text>
            </View>
            <View style={styles.recommendItemContainer}>
              <Image
                resizeMode="cover"
                style={styles.recommendImage}
                source={{ uri: 'https://picsum.photos/400/300' }}
              />
              <Text style={styles.recommendText}>
                Starbucks releases chart that matches their drinks to your zodiac sign
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
