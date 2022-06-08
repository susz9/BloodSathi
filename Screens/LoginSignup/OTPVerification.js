import React, { useState, useContext } from 'react';
import { View, ActivityIndicator, ScrollView, Image, Text } from 'react-native';

//status bar
import { StatusBar } from 'expo-status-bar';

//formik for form handling
import { Formik } from 'formik';

//icons libraries
import { FontAwesome, Fontisto, Ionicons } from '@expo/vector-icons';

//colors
import { Colors, StyledLabel, StyledOTP, StyledPhone, StyledRow } from '../../Components/Styles';
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
  RightIcon,
  StyledInputLabel,
  StyledTextInput,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from '../../Components/Styles';

import { Poppins_400Regular } from '@expo-google-fonts/poppins';

const OTPVerification = ({ navigation, route }) => {
  const { phone, fullHash } = route.params;
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  //context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = 'http://192.168.10.71:3000/verifyOTP';
    //console.log(credentials);
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        console.log(result);

        const { status, message, data } = result;

        if (status !== 'SUCCESS') {
          //display failed mssg
          handleMessage(message, status);
        } else {
          //login true
          //automatically navigates to main screen using:
          //persistLogin({ ...data[0] }, message, status);
          alert('user verified');
          const url = 'http://192.168.10.71:3000/user/check';
          axios
            .post(url, phone)
            .then((response) => {
              const { data } = response;
              const { message, status } = data;
              //console.log(data.data[0]);
              if (status !== 'SUCCESS') {
                navigation.navigate('CompleteProfile', { phone });
              } else {
                // console.log(JSON.stringify(data));
                console.log('axios success');
                persistLogin(data.data[0], 'Signin successful with OTP', 'SUCCESS');
              }
            })
            .catch((error) => {
              handleMessage('An error occured while Login');
              console.log(error);
            });
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

  // Persisting login
  const persistLogin = (credentials, message, status) => {
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
          <Illustration resizeMode="cover" source={require('./../../assets/Illustrations/OTP.png')} />
          <PageTitle>OTP Verification</PageTitle>

          <Formik
            initialValues={{ phone: phone, hash: fullHash, otp: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.otp == '') {
                handleMessage('Please enter the OTP Code.');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  phone={phone}
                  label="Enter the 4-Digit number sent to"
                  placeholder="6045"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('otp')}
                  onBlur={handleBlur('otp')}
                  value={values.otp}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                />

                <ExtraView style={{ marginTop: 0 }}>
                  <ExtraText>Didn't receive a code? </ExtraText>
                  <TextLink>
                    <TextLinkContent onPress={() => navigation.navigate('PasswordLess')}>Resend</TextLinkContent>
                  </TextLink>
                </ExtraView>

                <MsgBox type={messageType}>{message}</MsgBox>
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Confirm</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="small" color={primary} />
                  </StyledButton>
                )}

                <ExtraView>
                  <ExtraText>Back to </ExtraText>
                  <TextLink>
                    <TextLinkContent onPress={() => navigation.navigate('PasswordLess')}>Log in</TextLinkContent>
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
      <StyledInputLabel style={{ textAlign: 'center', marginBottom: 12, fontSize: 14 }}>
        {label + '\n' + phone}
      </StyledInputLabel>
      <StyledOTP {...props} />
    </View>
  );
};

export default OTPVerification;
