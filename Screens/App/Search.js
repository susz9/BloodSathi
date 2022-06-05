import React, { useState, useEffect } from 'react';
import {
  ButtonText,
  InnerContainer,
  Line,
  MsgBox,
  StyledButton,
  StyledContainer,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  PageTitle,
} from '../../Components/Styles';

import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';

import { Picker } from '@react-native-picker/picker';

//icons
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { Colors } from '../../Components/Styles';

//formik
import { Formik } from 'formik';

//location from expo
import * as Location from 'expo-location';

//API client
import axios from 'axios';

import { bloodGroupList, distanceList } from '../../Components/PickerData';

//colors
const { primary, secondary, tertiary, brand, darkLight } = Colors;

const Search = ({ navigation }) => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('Blood Group');
  const [selectedDistance, setSelectedDistance] = useState('Gender');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  const [message, setMessage] = useState();

  const [messageType, setMessageType] = useState();
  const [location, setLocation] = useState('');

  useEffect(async () => {
    //checking and asking for location permission
    console.log(longitude + ' ' + latitude);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission not granted',
          'Allow the app to use location service via phone settings for better user experience.',
          [{ text: 'OK' }],
          {
            cancelable: false,
          },
        );
      }
    } catch (ex) {
      Alert.alert(ex);
    }

    //let { coords } = await Location.getCurrentPositionAsync({ accuracy: 6 });
    try {
      let { coords } = await Location.getCurrentPositionAsync({ accuracy: 6 });
      if (coords) {
        const { latitude, longitude } = coords;
        setLongitude(longitude);
        setLatitude(latitude);

        //reverse geocoding (coordinates to adress)
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        //console.log(response);
        for (let item of response) {
          let address = `${item.region}, ${item.city}, ${item.subregion}`;
          setLocation(address);
        }
      }
    } catch {
      let coords = await Location.getLastKnownPositionAsync({ accuracy: 6 });
      if (coords) {
        const { latitude, longitude } = coords;
        setLongitude(longitude);
        setLatitude(latitude);

        //reverse geocoding (coordinates to adress)
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        console.log(response);
        for (let item of response) {
          let address = `${item.region}, ${item.city}, ${item.subregion}`;
          setLocation(address);
        }
      }
    }
  }, []);

  const searchDonors = (credentials, setSubmitting) => {
    handleMessage(null);

    //localhost
    const url = 'http://192.168.10.71:3000/user/donors';

    // console.log('on search donors');
    console.log(credentials);
    // console.log('\n');

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        console.log('axios response');
        console.log(data);

        if (status != 'SUCCESS') {
          alert(message + ' Please try again.');
          handleMessage('Change distance to find donors.');
        } else {
          console.log('success');
          //navigating to search-results and passing server response
          navigation.navigate('SearchResult', { data });
        }

        setSubmitting(false);
      })
      .catch((error) => {
        handleMessage('Please check your network and try again');
        console.log('\n error');
        console.log(error);
        setSubmitting(false);
      });
  };

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <>
      <StyledContainer>
        <InnerContainer style={{ top: 60 }}>
          <Formik
            initialValues={{
              bloodGroup: 'A+',
              distance: '5',
              coordinates: null,
            }}
            onSubmit={(values, { setSubmitting }) => {
              values = { ...values, coordinates: { longitude, latitude } };
              searchDonors(values, setSubmitting);
              handleMessage(null);
              setSubmitting(true);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <Text style={{ top: -20, left: 0, fontSize: 18, fontFamily: 'Medium' }}>{location}</Text>

                <Text style={{ top: 11, left: 9, fontSize: 14, fontFamily: 'Regular' }}>Blood Group</Text>
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

                <Text style={{ top: 11, left: 9, fontSize: 14, fontFamily: 'Regular' }}>Distance</Text>
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
                    selectedValue={selectedDistance}
                    style={{ height: 50, marginLeft: 7 }}
                    onValueChange={(itemValue) => {
                      handleChange('distance')(String(itemValue));
                      setSelectedDistance(itemValue);
                      console.log(itemValue);
                    }}
                    value={values.distance}
                  >
                    {distanceList.map((item) => {
                      return <Picker.Item key={item.value} label={item.label} value={item.value} />;
                    })}
                  </Picker>
                </View>

                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton circle={true} onPress={handleSubmit}>
                    <Ionicons name="search" color={primary} size={60} />
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton circle={true} disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}
              </StyledFormArea>
            )}
          </Formik>
          <Line style={{ marginVertical: 20 }} />

          <StyledButton style={{ width: 300 }} onPress={() => navigation.navigate('Maps')}>
            <ButtonText style={{ fontFamily: 'Regular' }}>Show nearby hospitals</ButtonText>
          </StyledButton>
        </InnerContainer>
      </StyledContainer>
    </>
  );
};

export default Search;
