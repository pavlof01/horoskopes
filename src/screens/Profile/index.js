import React, { Component } from 'react';
import NotificationScreen from '../../components/notificationScreen';

export default class Profile extends Component {
  render() {
    return (
      <NotificationScreen
        title="Horoscopes AR needs Camera permison"
        subTitle="Enable access to the camera to turn the magic on"
        icon={require('../../../assets/img/camera-permisson.png')}
        btnText="Allow access to Camera"
      />
    );
  }
}
