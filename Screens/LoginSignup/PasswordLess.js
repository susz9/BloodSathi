import React, { useState, useContext } from 'react';
import { View, ActivityIndicator, ScrollView, Image, Text } from 'react-native';

//status bar
import { StatusBar } from 'expo-status-bar';

//formik for form handling
import { Formik } from 'formik';

//icons libraries
import { FontAwesome } from '@expo/vector-icons';

//colors
import { Colors, StyledLabel, StyledPhone, StyledRow } from '../../Components/Styles';
const { primary, secondary, tertiary, brand, darkLight } = Colors;

//API client
import axios from 'axios';

//google auth
import * as Google from 'expo-google-app-auth';

//async-storage & credentials context for Login State
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../Components/CredentialsContext';

//styled components
import {
  StyledContainer,
  InnerContainer,
  Illustration,
  PageTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  MsgBox,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from '../../Components/Styles';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';

const PasswordLess = ({ navigation }) => {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  //context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = 'http://192.168.10.71:3000/sendOTP';
    const phone = credentials;

    axios
      .post(url, phone)
      .then((response) => {
        const result = response.data;

        const { status, message, data } = result;

        if (status !== 'SUCCESS') {
          //display failed mssg
          handleMessage(message, status);
        } else {
          //login true
          //automatically navigates to main screen using:
          const num = JSON.stringify(data);
          //console.log(data);
          handleMessage(num, status);

          navigation.navigate('OTPVerification', data);
          //console.log(JSON.stringify(data));
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        handleMessage('Please check your network and try again');
        console.log(JSON.stringify(error));
      });
  };

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  const handleGoogleSignin = () => {
    setGoogleSubmitting(true);
    const config = {
      iosClientId: `788039475474-tevita7l1aeiotlqar2m3pe58heneaoj.apps.googleusercontent.com`,
      androidClientId: `788039475474-6ld4glrmnuei60a3eqpqj4mha1if067o.apps.googleusercontent.com`,
      scopes: ['profile', 'email'],
    };

    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        // console.log(result);
        if (type == 'success') {
          const { email, name, photoUrl } = user;
          const url = 'http://192.168.10.71:3000/user/check';
          axios
            .post(url, user)
            .then((response) => {
              const { data } = response;
              const { message, status } = data;

              if (status !== 'SUCCESS') {
                navigation.navigate('CompleteProfile', { email, name, photoUrl });
              } else {
                // console.log(JSON.stringify(data));
                console.log('axios success');
                persistLogin({ email, name, photoUrl }, 'Google signin successful', 'SUCCESS');
              }
            })
            .catch((error) => {
              handleMessage('An error occured while Login');
              console.log(error);
            });
        } else {
          handleMessage('Google sign in was cancelled');
        }
        setGoogleSubmitting(false);
      })
      .catch((error) => {
        handleMessage('An error occurred. Check your network and try again');
        //console.log(error);
        setGoogleSubmitting(false);
      });
  };

  // Persisting login
  const persistLogin = (credentials, message, status) => {
    // console.log(credentials);

    AsyncStorage.setItem('bloodSathiCredentials', JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        handleMessage('Persist login failed');
        console.log(error);
      });
  };
  return (
    <ScrollView>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <Illustration resizeMode="cover" source={require('./../../assets/Illustrations/Login.png')} />
          <PageTitle>Login</PageTitle>

          <Formik
            initialValues={{ phone: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.phone == '') {
                handleMessage('Please enter the phone number.');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  phone={true}
                  label="Phone Number"
                  placeholder="9819090917"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  keyboardType="number-pad"
                  maxLength={10}
                />
                <MsgBox type={messageType}>{message}</MsgBox>

                {/* test */}
                {/* {!isSubmitting && (
                  <StyledButton onPress={() => navigation.navigate('OTPVerification', { phone: values.phone })}>
                    <ButtonText>Login with OTP</ButtonText>
                  </StyledButton>
                )} */}

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login with OTP</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="small" color={primary} />
                  </StyledButton>
                )}

                <StyledLabel>or</StyledLabel>

                <StyledRow>
                  {!googleSubmitting && (
                    <StyledButton
                      google={true}
                      style={{ backgroundColor: '#E94335', elevation: 2 }}
                      onPress={handleGoogleSignin}
                    >
                      <FontAwesome name="google" color={primary} size={24} />
                    </StyledButton>
                  )}

                  {googleSubmitting && (
                    <StyledButton google={true} disabled={true}>
                      <ActivityIndicator size="small" color={primary}></ActivityIndicator>
                    </StyledButton>
                  )}

                  <StyledButton
                    google={true}
                    style={{ backgroundColor: '#2998FF', elevation: 2 }}
                    onPress={() => navigation.navigate('WithCreds')}
                  >
                    <FontAwesome name="lock" color={primary} size={28} />
                  </StyledButton>
                </StyledRow>

                <ExtraView>
                  <ExtraText>Need an account? </ExtraText>
                  <TextLink>
                    <TextLinkContent onPress={() => navigation.navigate('SignupCreds')}>Sign up</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </ScrollView>
  );
};

const MyTextInput = ({ phone, label, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Image style={{ width: 24, height: 24, top: 5 }} source={require('./../../assets/Icons/Nepal.png')} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledPhone {...props} />
    </View>
  );
};

export default PasswordLess;
