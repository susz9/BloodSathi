import React, { useState } from 'react';

//react navigation stack
import RootStack from './Navigators/RootStack';

//expo app loading
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

//async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './Components/CredentialsContext';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState('');

  let [fontsLoaded, error] = useFonts({
    Light: Poppins_300Light,
    Regular: Poppins_400Regular,
    Medium: Poppins_500Medium,
    Bold: Poppins_600SemiBold,
  });

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('bloodSathiCredentials')
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => console.log(error));
  };

  if (!appReady) {
    return <AppLoading startAsync={checkLoginCredentials} onFinish={() => setAppReady(true)} onError={console.warn} />;
  }
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      <RootStack />
    </CredentialsContext.Provider>
  );
}
