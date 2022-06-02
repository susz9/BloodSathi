import { React, useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

//formik
import { Formik } from 'formik';

//icons
import { Ionicons } from '@expo/vector-icons';

//colors
import { Colors } from '../../Components/Styles';

//styled components
import {
  StyledContainer,
  Illustration,
  InnerContainer,
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

import { View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

//API client
import axios from 'axios';

//colors
const { primary, secondary, tertiary, brand, darkLight } = Colors;

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  //Form handling
  const handleSignup = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = 'http://192.168.10.71:3000/user/signup';
    setSubmitting(false);
    //to-complete profile page
    navigation.navigate('CompleteProfile', credentials);
  };

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  return (
    <ScrollView>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <Illustration resizeMode="cover" source={require('./../../assets/Illustrations/Profile.png')} />
          <PageTitle>Create an account</PageTitle>

          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              values = { ...values };
              if (values.email == '' || values.password == '') {
                handleMessage('Please fill all required fields');
                setSubmitting(false);
              } else if (!ValidateEmail(values.email)) {
                handleMessage('Invalid email address');
                setSubmitting(false);
              } else if (values.password.length < 8) {
                handleMessage('Not a strong password');
                setSubmitting(false);
              } else if (values.password !== values.confirmPassword) {
                handleMessage('Passwords do not match');
                setSubmitting(false);
              } else {
                handleSignup(values, setSubmitting);
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
                <MyTextInput
                  label="Confirm password"
                  icon="checkmark-outline"
                  placeholder="●●●●●●●●"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Next</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="small" color={primary} />
                  </StyledButton>
                )}
                <ExtraView>
                  <ExtraText>Already have an account? </ExtraText>
                  <TextLink>
                    <TextLinkContent onPress={() => navigation.navigate('WithCreds')}>Sign in</TextLinkContent>
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

export default Signup;
