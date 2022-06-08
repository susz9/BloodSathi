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

import { View, TouchableOpacity, ScrollView, Text, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

//API client
import axios from 'axios';

//colors
import { Colors } from './../../Components/Styles';
const { primary, secondary, tertiary, brand, darkLight } = Colors;

import { bloodGroupList, distanceList } from '../../Components/PickerData';

const AddRequest = ({ navigation, route }) => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('Blood Group');

  const id = route.params;
  console.log(id);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  //Form handling
  const handleRequest = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = `http://192.168.10.71:3000/addRequest/${id}`;
    console.log(credentials);
    axios
      .put(url, credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;

        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          console.log('request added');
          alert(message);
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
              bloodGroup: '',
              patientName: '',
              hospital: '',
              message: '',
              date: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              values = { ...values, date: new Date() };
              if (
                values.patientName == '' ||
                values.bloodGroup == '' ||
                values.message == '' ||
                values.hospital == ''
              ) {
                handleMessage('Please fill all required fields');
                setSubmitting(false);
                console.log(values);
              } else {
                handleRequest(values, setSubmitting);
                console.log(values);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <Text style={{ top: 9, left: 9, fontSize: 13, fontFamily: 'Regular' }}>Blood Group</Text>
                <View
                  style={{
                    elevation: 1,
                    marginVertical: 10,
                    height: 40,
                    backgroundColor: tertiary,
                    borderRadius: 8,
                    justifyContent: 'center',
                    borderWidth: 0.5,
                    borderColor: brand,
                  }}
                >
                  <Picker
                    selectedValue={selectedBloodGroup}
                    style={{ height: 50, marginLeft: 7 }}
                    onValueChange={(itemValue) => {
                      handleChange('bloodGroup')(String(itemValue));
                      setSelectedBloodGroup(itemValue);
                      console.log(itemValue);
                    }}
                    value={values.bloodGroup}
                  >
                    {bloodGroupList.map((item, index) => {
                      return <Picker.Item key={index} label={item} value={item} />;
                    })}
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
                  label="Hospital Location"
                  icon="location-outline"
                  placeholder="Salakpur Bazar"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('hospital')}
                  onBlur={handleBlur('hospital')}
                  value={values.hospital}
                />

                <MyTextInput
                  label="Message"
                  placeholder="Your message..."
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('message')}
                  onBlur={handleBlur('message')}
                  value={values.message}
                  multiline
                  message
                  numberOfLines={4}
                />
                <MsgBox style={{ marginVertical: 0 }} type={messageType}>
                  {message}
                </MsgBox>
                {!isSubmitting && (
                  <StyledButton style={{ marginVertical: 6 }} onPress={handleSubmit}>
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

const MyTextInput = ({ label, icon, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Ionicons name={icon} size={24} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>

      <StyledTextInput {...props} />
    </View>
  );
};

export default AddRequest;
