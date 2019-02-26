import React from 'react';
import { Easing, StyleSheet, Animated } from 'react-native';
import YourDayCard from '../../../components/horoskopesCard';

export default class today extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      cardExpand: {
        love: false,
        carrer: false,
        helth: false,
      },
      fadeCards: new Animated.Value(0),
      topCards: new Animated.Value(50),
      scrollY: new Animated.Value(0),
    };
  }

  componentDidMount = () => {
    this._cardsAnim();
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

  render() {
    const { love, carrer, helth } = this.state.cardExpand;
    const { fadeCards, topCards } = this.state;
    return (
      <Animated.View style={[styles.cards, { opacity: fadeCards, top: topCards }]}>
        <YourDayCard
          title="Your Day"
          isToday
          body="You’se likely to be on the receiving end of new, a gift or invitation and may even
            receive news of achievement regarding one or other of the activies. You’se likely to be
            on the receiving end of new, a gift or invitation ."
          backgroundImage={require('../../../../assets/img/today-card.png')}
          backgroundColor="#9553f1"
        />
        <YourDayCard
          title="Your Love"
          body="You’se likely to be on the receiving end of new, a gift or invitation and may even receive news of achievement regarding one or other of the activies. You’se likely to be on the receiving end of new, a gift or invitation ."
          backgroundImage={require('../../../../assets/img/your-love-card.png')}
          backgroundColor="#fec2cc"
          circleColor="#fe97a8"
          isExpand={love}
          backgroundColorForSetOpacity="rgba(254, 194, 204, 0.8)"
          onExpand={() => this.expandCard('love')}
        />
        <YourDayCard
          title="Your Career"
          body="You’se likely to be on the receiving end of new, a gift or invitation and may even receive news of achievement regarding one or other of the activies. You’se likely to be on the receiving end of new, a gift or invitation ."
          backgroundImage={require('../../../../assets/img/your-carrer-card.png')}
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
          backgroundImage={require('../../../../assets/img/your-helth-card.png')}
          backgroundColor="#cfbef0"
          circleColor="#ad91e6"
          isExpand={helth}
          readMoreBtnColor="#9553f1"
          backgroundColorForSetOpacity="rgba(207, 190, 240, 0.8)"
          onExpand={() => this.expandCard('helth')}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({});
