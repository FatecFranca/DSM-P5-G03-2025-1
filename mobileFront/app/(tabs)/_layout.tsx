import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: '#e46827', 
          },
          default: {
            backgroundColor: '#e46827', 
          },
        }),
        tabBarLabelStyle: {
          color: 'black',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Classificar',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color="black" />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="history.fill" color="black" />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="info.fill" color="black" />,
        }}
      />
    </Tabs>
  );
}
