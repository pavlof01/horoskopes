import * as React from 'react';
import { Text } from 'react-native';
import TabBarComponent from './TabBar';

export default function createBottomBarOptions(routName, src) {
  return {
    tabBarLabel: routName,
    tabBarIcon: props => <TabBarComponent routName={routName} props={props} src={src} />,
    tabBarOptions: {
      // activeTintColor: PrimaryColor_dim,
      style: {
        backgroundColor: 'rgb(28, 25, 25)',
      },
      showLabel: false,
    },
  };
}
