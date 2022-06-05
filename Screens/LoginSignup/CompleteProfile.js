import { React, useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

//formik
import { Formik } from 'formik';

//icons
import { FontAwesome, Ionicons } from '@expo/vector-icons';

//dateTime picker
import DateTimePicker from '@react-native-community/datetimepicker';

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
  StyledRow,
  StyledPicker,
} from './../../Components/Styles';

import { View, TouchableOpacity, ScrollView, Text, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

//API client
import axios from 'axios';

//colors
import { Colors } from './../../Components/Styles';
const { primary, secondary, tertiary, brand, darkLight } = Colors;

//async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../../Components/CredentialsContext';

const CompleteProfile = ({ navigation, route }) => {
  console.log(route.params);
  const email = route.params.email;
  const password = route.params.password;
  const name = route.params.name;
  const avatar = route.params.photoURL;

  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2002, 0, 1));

  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const [selectedBloodGroup, setSelectedBloodGroup] = useState('Blood Group');
  const [selectedGender, setSelectedGender] = useState('Gender');
  const [selectedDistrict, setSelectedDistrict] = useState('District');

  const districts = [
    'achham',
    'arghakhanchi',
    'baglung',
    'baitadi',
    'bajhang',
    'bajura',
    'banke',
    'bara',
    'bardiya',
    'bhaktapur',
    'bhojpur',
    'chitwan',
    'dadeldhura',
    'dailekh',
    'dang deukhuri',
    'darchula',
    'dhading',
    'dhankuta',
    'dhanusa',
    'dholkha',
    'dolpa',
    'doti',
    'gorkha',
    'gulmi',
    'humla',
    'ilam',
    'jajarkot',
    'jhapa',
    'jumla',
    'kailali',
    'kalikot',
    'kanchanpur',
    'kapilvastu',
    'kaski',
    'kathmandu',
    'kavrepalanchok',
    'khotang',
    'lalitpur',
    'lamjung',
    'mahottari',
    'makwanpur',
    'manang',
    'morang',
    'mugu',
    'mustang',
    'myagdi',
    'nawalparasi',
    'nuwakot',
    'okhaldhunga',
    'palpa',
    'panchthar',
    'parbat',
    'parsa',
    'pyuthan',
    'ramechhap',
    'rasuwa',
    'rautahat',
    'rolpa',
    'rukum',
    'rupandehi',
    'salyan',
    'sankhuwasabha',
    'saptari',
    'sarlahi',
    'sindhuli',
    'sindhupalchok',
    'siraha',
    'solukhumbu',
    'sunsari',
    'surkhet',
    'syangja',
    'tanahu',
    'taplejung',
    'terhathum',
    'udayapur',
  ];

  //Actual date of birth to send
  const [dob, setDob] = useState();

  //context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  //date selection
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
    console.log(currentDate);
  };
  //open datepicker modal
  const showDatePicker = () => {
    setShow(true);
  };

  //Form handling
  const handleSignup = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = 'http://192.168.10.71:3000/user/signup';
    // console.log(credentials);
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;

        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          //automatically navigates to main screen using:
          persistLogin({ ...data }, message, status);
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

  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem('bloodSathiCredentials', JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        handleMessage('persist login failed');
      });
  };

  return (
    <ScrollView>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <Illustration resizeMode="cover" source={require('./../../assets/Illustrations/Profile.png')} />
          <PageTitle>Complete Profile</PageTitle>
          <Text style={{ top: -12, fontSize: 14, fontFamily: 'Regular' }}>
            Please enter your legit profile details.
          </Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={false}
              display="default"
              timeZoneOffsetInMinutes={345}
              onChange={onChange}
            />
          )}

          <Formik
            initialValues={{
              fullName: name || '',
              phone: '',
              email: email,
              password: password || '',
              dateOfBirth: '',
              bloodGroup: '',
              sex: '',
              district: '',
              address: '',
              location: {},
            }}
            onSubmit={(values, { setSubmitting }) => {
              values = { ...values, dateOfBirth: dob };
              console.log(values);
              if (
                values.fullName == '' ||
                values.dateOfBirth == '' ||
                values.district == '' ||
                values.address == '' ||
                values.bloodGroup == '' ||
                values.sex == ''
              ) {
                handleMessage('Please fill all required fields');
              } else {
                console.log(values);
                handleSignup(values, setSubmitting);
              }
              setSubmitting(false);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Full name"
                  icon="person-outline"
                  placeholder="Susan Shrestha"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                />

                <MyTextInput
                  label="Date of Birth"
                  icon="calendar-outline"
                  placeholder="MM-DD-YYYY"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('dateOfBirth')}
                  onBlur={handleBlur('dateOfBirth')}
                  value={dob ? dob.toDateString() : ''}
                  isDate={true}
                  editable={false}
                  showDatePicker={showDatePicker}
                />
                <View
                  style={{
                    marginVertical: 8,
                    height: 40,
                    backgroundColor: tertiary,
                    borderRadius: 8,
                    justifyContent: 'center',
                  }}
                >
                  <Picker
                    selectedValue={selectedDistrict}
                    style={{ width: 305, left: 4 }}
                    onValueChange={(itemValue) => {
                      handleChange('district')(String(itemValue));
                      setSelectedDistrict(itemValue);
                    }}
                    value={values.district}
                  >
                    <Picker.Item label="District" value={''} />
                    {districts.map((district, index) => (
                      <Picker.Item key={index} label={district.toUpperCase()} value={district.toUpperCase()} />
                    ))}
                  </Picker>
                </View>

                <MyTextInput
                  label="Address"
                  icon="location-outline"
                  placeholder="Salakpur Bazar"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                />

                <StyledRow style={{ marginVertical: 4 }}>
                  <View
                    style={{
                      right: 8,
                      height: 40,
                      backgroundColor: tertiary,
                      borderRadius: 8,
                      justifyContent: 'center',
                    }}
                  >
                    <Picker
                      style={{
                        left: 4,
                        width: 155,
                        fontSize: 12,
                        fontFamily: 'Light',
                      }}
                      textStyle={{ color: 'yellow' }}
                      selectedValue={selectedBloodGroup}
                      onValueChange={(itemValue) => {
                        handleChange('bloodGroup')(String(itemValue));
                        setSelectedBloodGroup(itemValue);
                      }}
                      value={values.bloodGroup}
                    >
                      <Picker.Item label="Blood Group" value="" />
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

                  <View
                    style={{
                      left: 8,
                      height: 40,
                      backgroundColor: tertiary,
                      borderRadius: 8,
                      justifyContent: 'center',
                    }}
                  >
                    <Picker
                      selectedValue={selectedGender}
                      style={{ width: 136 }}
                      onValueChange={(itemValue) => {
                        handleChange('sex')(String(itemValue));
                        setSelectedGender(itemValue);
                      }}
                      value={values.sex}
                    >
                      <Picker.Item label="Gender" value="" />
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                      <Picker.Item label="Other" value="Other" />
                    </Picker>
                  </View>
                </StyledRow>

                <MsgBox style={{ top: 8 }} type={messageType}>
                  {message}
                </MsgBox>

                {/* <Button title="Finish" onPress={handleSubmit} /> */}

                {!isSubmitting && (
                  <StyledButton style={{ marginVertical: 8 }} onPress={handleSubmit}>
                    <ButtonText>Finish</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton style={{ marginVertical: 8 }} disabled={true}>
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
    <View>
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

export default CompleteProfile;
