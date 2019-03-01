import * as React from 'react';
import TabBarComponent from './TabBar';

export default function createBottomBarOptions(routName, src) {
  return {
    tabBarLabel: routName,
    tabBarIcon: props => <TabBarComponent routName={routName} props={props} src={src} />,
    tabBarOptions: {
      style: {
        backgroundColor: 'rgb(28, 25, 25)',
      },
      showLabel: false,
    },
  };
}
