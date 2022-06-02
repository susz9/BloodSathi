import React, { useState, useEffect } from 'react';
import {
  InnerContainer,
  FeedContainer,
  StyledButton,
  ButtonText,
  StyledRequest,
  Line,
  Profile,
  StyledFormArea,
  StyledContainer,
  UserCardContainer,
  Greet,
  UserIcon,
  Name,
  StyledRow,
  ProfileContainer,
} from '../../Components/Styles';

import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';

import { Picker } from '@react-native-picker/picker';

//icons
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../Components/Styles';

//formik
import { Formik } from 'formik';

//colors
const { primary, secondary, tertiary, brand, darkLight, green } = Colors;

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

const response = [
  {
    id: 1,
    name: 'Isha Dahal',
    photoUrl: 'https://gravatar.com/avatar/d4c16847a9408df50103b6c9537967bd?s=400&d=retro&r=x',
    address: 'Biratchowk',
    bloodGroup: 'A+',
    sex: 'Female',
    age: 19,
    distance: 2,
  },
  {
    id: 2,
    name: 'Kusum Prasain',
    photoUrl: '',
    address: 'Salakpur',
    bloodGroup: 'A+',
    sex: 'Female',
    age: 23,
    distance: 1,
  },
];

const SearchResult = ({ navigation, route }) => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('Blood Group');
  const [selectedDistance, setSelectedDistance] = useState('Gender');
  const [selectedDistrict, setSelectedDistrict] = useState('District');

  //console.log(route.params.Dresponse);
  const [data, setData] = useState(route.params.data);

  const donors = data.map((user) => {
    return (
      <UserCardContainer
        key={user._id}
        onPress={() => {
          navigation.navigate('MyProfile');
        }}
        style={{ left: 8, elevation: 2, height: 110, marginVertical: 8 }}
      >
        <UserIcon
          style={{ left: 16, top: 16, height: 70, width: 70 }}
          resizeMode="cover"
          source={{ uri: user.avatar } || require('../../assets/Illustrations/avatar.png')}
        />

        <ProfileContainer>
          <Name style={{ left: 0, top: 10, fontSize: 16 }}>{user.fullName}</Name>
          <Text style={{ left: 0, top: 5 }}>{user.address}</Text>
          <StyledRow style={{ left: 0 }}>
            <Text style={{ top: 5 }}>
              {response[1].age} Y/O {'\t'}
            </Text>
            <Text style={{ top: 5 }}>{user.sex}</Text>
          </StyledRow>
          <Text style={{ left: 0, top: 5 }}>{response[1].distance} KM</Text>
        </ProfileContainer>

        <Ionicons
          style={{ position: 'absolute', right: 15, top: 32 }}
          name="chatbubble-ellipses-outline"
          size={36}
          color={brand}
        />
      </UserCardContainer>
    );
  });

  // const avatar = response[0].photoUrl
  //   ? { uri: response[0].photoUrl }
  //   : require('./../../assets/Illustrations/avatar.png');

  return (
    <>
      <StyledContainer home={true}>
        <Text style={{ top: 15, left: 0, fontSize: 20, fontFamily: 'Medium' }}>Available donors</Text>
        <InnerContainer style={{ top: 0, left: 16 }}>
          <Formik
            initialValues={{
              bloodGroup: '',
              distance: '',
              coordinates: null,
            }}
            onSubmit={(values, { setSubmitting }) => {
              values = { ...values, coordinates: { longitude, latitude } };
              if (values.selectedBloodGroup == '' || values.selectedDistance == '') {
                handleMessage('Please select blood group and distance.');
                setSubmitting(false);
              } else {
                //searchDonors(values, setSubmitting);
                handleMessage(null);
                navigation.navigate('SearchResult');
                setSubmitting(false);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <StyledRow>
                  <View
                    style={{
                      marginVertical: 0,
                      marginHorizontal: 5,
                      height: 40,
                      backgroundColor: tertiary,
                      borderRadius: 8,
                      justifyContent: 'center',
                      elevation: 3,
                    }}
                  >
                    <Picker
                      selectedValue={selectedBloodGroup}
                      style={{ height: 50, width: 90 }}
                      onValueChange={(itemValue) => {
                        setSelectedBloodGroup(itemValue);
                        console.log(itemValue);
                      }}
                      onBlur={handleBlur('bloodGroup')}
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
                      marginVertical: 0,
                      marginHorizontal: 5,
                      height: 40,
                      backgroundColor: tertiary,
                      borderRadius: 8,
                      justifyContent: 'center',
                      elevation: 3,
                    }}
                  >
                    <Picker
                      selectedValue={selectedDistance}
                      style={{ height: 50, width: 120 }}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelectedDistance(itemValue);
                        console.log(itemValue);
                      }}
                      value={values.distance}
                    >
                      <Picker.Item label="Distance (5 KM)" value="5" />
                      <Picker.Item label="10 KM" value="10" />
                      <Picker.Item label="25 KM" value="25" />
                      <Picker.Item label="50 KM" value="50" />
                      <Picker.Item label="100 KM" value="100" />
                      <Picker.Item label="200 KM" value="200" />
                    </Picker>
                  </View>
                  <View
                    style={{
                      marginVertical: 0,
                      marginHorizontal: 5,
                      height: 40,
                      backgroundColor: tertiary,
                      borderRadius: 8,
                      justifyContent: 'center',
                      elevation: 3,
                    }}
                  >
                    <Picker
                      selectedValue={selectedDistrict}
                      style={{ width: 140, left: 0 }}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelectedDistrict(itemValue);
                        console.log(itemValue);
                      }}
                      onBlur={handleBlur('district')}
                      value={values.distric}
                    >
                      <Picker.Item label="District" value={''} />
                      {districts.map((district, index) => (
                        <Picker.Item key={index} label={district.toUpperCase()} value={district.toUpperCase()} />
                      ))}
                    </Picker>
                  </View>
                </StyledRow>

                {/* test */}
                <ScrollView style={{ margin: 0, top: 15, right: 50, width: 400 }}>{donors}</ScrollView>
                {/* test */}
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </>
  );
};

export default SearchResult;
