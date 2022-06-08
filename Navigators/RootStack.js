import React from 'react';

//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import PasswordLess from '../Screens/LoginSignup/PasswordLess';
import OTPVerification from '../Screens/LoginSignup/OTPVerification';
import WithCreds from './../Screens/LoginSignup/WithCreds';
import SignupCreds from './../Screens/LoginSignup/SignupCreds';
import CompleteProfile from '../Screens/LoginSignup/CompleteProfile';
import Welcome from '../Screens/App/Welcome';
import Main from '../Screens/App/Main';
import MyProfile from '../Screens/App/MyProfile';
import UserVerification from '../Screens/App/UserVerification';

//colors
import { Colors } from './../Components/Styles';
const { darkLight, brand, primary, tertiary, secondary } = Colors;

// credentials context
import { CredentialsContext } from './../Components/CredentialsContext';
import SearchResult from '../Screens/App/SearchResult';
import AddRequest from '../Screens/App/AddRequest';
const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTintColor: secondary,
              headerTransparent: true,
              headerTitle: '',
              headerLeftContainerStyle: {
                paddingLeft: 20,
              },
            }}
            initialRouteName="Login"
          >
            {storedCredentials ? (
              <>
                <Stack.Screen
                  options={{ headerTintColor: primary, title: 'Blood Sathi' }}
                  name="Welcome"
                  component={Welcome}
                />
                <Stack.Screen options={{ headerTintColor: primary, title: '' }} name="Main" component={Main} />
                <Stack.Screen
                  options={{ headerTintColor: primary, title: '' }}
                  name="SearchResult"
                  component={SearchResult}
                />
                <Stack.Screen
                  options={{ headerTintColor: primary, title: '' }}
                  name="MyProfile"
                  component={MyProfile}
                />
                <Stack.Screen
                  options={{ headerTintColor: primary, title: '' }}
                  name="AddRequest"
                  component={AddRequest}
                />
                <Stack.Screen
                  options={{ headerTintColor: primary, title: '' }}
                  name="UserVerification"
                  component={UserVerification}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="PasswordLess" component={PasswordLess} />
                <Stack.Screen name="OTPVerification" component={OTPVerification} />
                <Stack.Screen name="WithCreds" component={WithCreds} />
                <Stack.Screen name="SignupCreds" component={SignupCreds} options={{ title: 'Account Sign up' }} />
                <Stack.Screen
                  name="CompleteProfile"
                  component={CompleteProfile}
                  options={{ title: 'Complete Profile' }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
