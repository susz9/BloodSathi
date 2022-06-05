import React, { useState, useContext } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';

//status bar
import { StatusBar } from 'expo-status-bar';

//formik for form handling
import { Formik } from 'formik';

//icons libraries
import { Ionicons } from '@expo/vector-icons';

//colors
import { Colors } from '../../Components/Styles';
const { primary, secondary, tertiary, brand, darkLight } = Colors;

//API client
import axios from 'axios';

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
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from '../../Components/Styles';

const WithCreds = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  //context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = 'http://192.168.10.71:3000/user/signin';
    console.log(credentials);
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;

        const { status, message, data } = result;

        if (status !== 'SUCCESS') {
          //display failed mssg
          handleMessage(message, status);
        } else {
          //login true
          //automatically navigates to main screen using:
          persistLogin({ ...data[0] }, message, status);
          //console.log(JSON.stringify(data));
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        handleMessage('Please check your network and try again');
        console.log(error);
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
          <Illustration resizeMode="cover" source={require('./../../assets/Illustrations/Login.png')} />
          <PageTitle>Welcome back</PageTitle>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == '' || values.password == '') {
                handleMessage('Please fill all required fields');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Email Address"
                  icon="mail-outline"
                  placeholder="abc@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label="Password"
                  icon="lock-closed-outline"
                  placeholder="●●●●●●●●"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Sign in</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="small" color={primary} />
                  </StyledButton>
                )}
                <ExtraView>
                  <ExtraText>Need an account? </ExtraText>
                  <TextLink>
                    <TextLinkContent onPress={() => navigation.navigate('SignupCreds')}>Sign up</TextLinkContent>
                  </TextLink>
                </ExtraView>
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

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Ionicons name={icon} size={24} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons name={hidePassword ? 'eye-off-outline' : 'eye-outline'} size={24} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default WithCreds;
