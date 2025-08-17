import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

// Import screens
import DailyExerciseScreen from '../screens/DailyExercise/DailyExerciseScreen'
import EmergenSeeScreen from '../screens/EmergenSee/EmergenSeeScreen'
import HealingRowScreen from '../screens/HealingRow/HealingRowScreen'
import HeartBankScreen from '../screens/HeartBank/HeartBankScreen'
import LoveMarkItScreen from '../screens/LoveMarkIt/LoveMarkItScreen'
import TogetherNetScreen from '../screens/TogetherNet/TogetherNetScreen'

// Import components
import BankerPresence from '../components/Banker/BankerPresence'

// Types
export type RootStackParamList = {
  HeartBank: undefined
  DailyExercise: undefined
  EmergenSee: undefined
  HealingRow: undefined
  LoveMarkIt: undefined
  TogetherNet: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

export default function AppNavigator() {
  // Force RTL for Hebrew (this will be controlled by language context later)
  React.useEffect(() => {
    // I18nManager.forceRTL(true) // Uncomment when Hebrew is selected
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='HeartBank'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFD700', // Gold theme from Sigalit system
          },
          headerTintColor: '#1A1A1A', // Dark text
          headerTitleStyle: {
            fontWeight: '400',
            textTransform: 'lowercase', // Following design system
          },
          headerShown: true,
        }}
      >
        <Stack.Screen
          name='HeartBank'
          component={HeartBankScreen}
          options={{
            title: 'HeartBank',
            headerRight: () => <BankerPresence />,
          }}
        />
        <Stack.Screen
          name='DailyExercise'
          component={DailyExerciseScreen}
          options={{
            title: 'Daily Exercise',
          }}
        />
        <Stack.Screen
          name='EmergenSee'
          component={EmergenSeeScreen}
          options={{
            title: 'Emergen-See',
            headerStyle: {
              backgroundColor: '#40E0D0', // Turquoise for crisis support
            },
          }}
        />
        <Stack.Screen
          name='HealingRow'
          component={HealingRowScreen}
          options={{
            title: 'HealingRow',
          }}
        />
        <Stack.Screen
          name='LoveMarkIt'
          component={LoveMarkItScreen}
          options={{
            title: 'Love-Mark-It',
          }}
        />
        <Stack.Screen
          name='TogetherNet'
          component={TogetherNetScreen}
          options={{
            title: 'TogetherNet',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
