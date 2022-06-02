import { React, useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

//formik
import { Formik } from 'formik';

//icons
import { Ionicons } from '@expo/vector-icons';

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
  StyledRow,
} from './../../Components/Styles';

import { View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

//API client
import axios from 'axios';

//colors
import { Colors } from './../../Components/Styles';
const { primary, secondary, tertiary, brand, darkLight } = Colors;

const AddRequest = ({ navigation, route }) => {
  //console.log(route.params);
  const [hidePassword, setHidePassword] = useState(true);

  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const [selectedBloodGroup, setSelectedBloodGroup] = useState('Blood Group');
  const [selectedGender, setSelectedGender] = useState('Gender');
  const [selectedDistrict, setSelectedDistrict] = useState('District');

  //Form handling
  const handleRequest = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = 'http://192.168.10.71:3000/user/addRequest';
    console.log(credentials);
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;

        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          console.log('request added');
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

  return (
    <ScrollView>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <Illustration resizeMode="cover" source={require('./../../assets/Illustrations/Profile.png')} />
          <PageTitle style={{ marginVertical: -8 }}>Add Request</PageTitle>

          <Formik
            initialValues={{
              requestBy: '',
              patientName: '',
              bloodGroup: '',
              TMessage: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              values = { ...values };
              if (values.patientName == '' || values.bloodGroup == '' || values.TMessagee) {
                handleMessage('Please fill all required fields');
                setSubmitting(false);
              } else {
                //handleRequest(values, setSubmitting);
                console.log(values);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <View
                  style={{
                    right: 0,
                    height: 40,
                    marginBottom: 12,
                    backgroundColor: tertiary,
                    borderRadius: 8,
                    justifyContent: 'center',
                  }}
                >
                  <Picker
                    style={{
                      left: 8,
                      width: 300,
                      fontSize: 12,
                      fontFamily: 'Light',
                    }}
                    textStyle={{ color: 'yellow' }}
                    selectedValue={selectedBloodGroup}
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectedBloodGroup(itemValue);
                      console.log(itemValue);
                    }}
                    onBlur={handleBlur('bloodGroup')}
                    value={values.bloodGroup}
                  >
                    <Picker.Item label="Select Blood Group" value="" />
                    <Picker.Item label="A+" value="A+" />
                    <Picker.Item label="A-" value="A-" />
                    <Picker.Item label="B+" value="B+" />
                    <Picker.Item label="B-" value="B-" />
                    <Picker.Item label="O+" value="O+" />
                    <Picker.Item label="O-" value="O-" />
                    <Picker.Item label="AB+" value="AB+" />
                    <Picker.Item label="AB-" value="AB-" />
                  </Picker>
                </View>
                <MyTextInput
                  label="Patient name"
                  icon="person-outline"
                  placeholder="Susan Shrestha"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('patientName')}
                  onBlur={handleBlur('patientName')}
                  value={values.patientName}
                />

                <MyTextInput
                  label="Address"
                  icon="location-outline"
                  placeholder="Salakpur Bazar"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                />

                <MyTextInput
                  label="Message"
                  placeholder="Your message..."
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('TMessage')}
                  onBlur={handleBlur('TMessage')}
                  value={values.TMessage}
                  multiline={true}
                  style={{ height: 100, padding: 0 }}
                />

                <MsgBox style={{ top: 8 }} type={messageType}>
                  {message}
                </MsgBox>

                {!isSubmitting && (
                  <StyledButton
                    style={{ marginVertical: 4, width: 300 }}
                    onPress={() => {
                      console.log('Request sent' + ' ' + values);
                    }}
                  >
                    <ButtonText>Submit</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="small" color={primary} />
                  </StyledButton>
                )}
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </ScrollView>
  );
};

const MyTextInput = ({ label, icon, isDate, showDatePicker, ...props }) => {
  return (
    <View style={{ width: 300 }}>
      <LeftIcon>
        <Ionicons name={icon} size={24} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>

      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddRequest;
