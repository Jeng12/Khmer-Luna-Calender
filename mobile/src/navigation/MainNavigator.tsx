/**
 * MainNavigator — Bottom Tab navigator (authenticated shell).
 *
 * Tabs:
 *   🏠 ទំព័រដើម  → HomeStack
 *   📅 ប្រតិទិន  → CalendarStack   (core feature)
 *   🔍 រកមើល    → ExploreStack
 *   👤 គណនី     → ProfileStack
 *
 * Design reference: docs/roadmap/RNRoadmap.jsx (Main Navigator section)
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../theme/tokens';

export type MainTabParamList = {
  HomeStack:    undefined;
  CalendarStack: undefined;
  ExploreStack: undefined;
  ProfileStack: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor:   Colors.deep,
          borderTopColor:    Colors.border,
          paddingBottom:     18,
          paddingTop:        6,
          height:            72,
        },
        tabBarActiveTintColor:   Colors.gold,
        tabBarInactiveTintColor: Colors.dim,
      }}
    >
      {/* TODO: register stack screens
      <Tab.Screen name="HomeStack"     component={HomeStack}     options={{ title: 'ទំព័រដើម' }} />
      <Tab.Screen name="CalendarStack" component={CalendarStack} options={{ title: 'ប្រតិទិន' }} />
      <Tab.Screen name="ExploreStack"  component={ExploreStack}  options={{ title: 'រកមើល' }} />
      <Tab.Screen name="ProfileStack"  component={ProfileStack}  options={{ title: 'គណនី' }} />
      */}
    </Tab.Navigator>
  );
}
