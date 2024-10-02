
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';

import React from 'react'
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer} from '@react-navigation/native';
import { StakNavigator } from './src/navigator/Stacknavigator';
export const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>      
        <StakNavigator></StakNavigator>
      </PaperProvider>
    </NavigationContainer>
      
  )
}

export default App;