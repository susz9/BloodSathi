import React, { useState, useEffect } from 'react';
import {
  InnerContainer,
  FeedContainer,
  StyledButton,
  ButtonText,
  StyledRequest,
  Line,
  StyledFormArea,
  StyledContainer,
  UserCardContainer,
  Greet,
  UserIcon,
  Name,
  StyledRow,
  ProfileContainer,
} from '../../Components/Styles';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
//icons
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../Components/Styles';
//formik
import { Formik } from 'formik';
//colors
//API client
import axios from 'axios';
const { primary, secondary, tertiary, brand, darkLight, green } = Colors;
import { bloodGroupList, distanceList, districtList } from '../../Components/PickerData';

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
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('A+');
  const [selectedDistance, setSelectedDistance] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();

  //console.log(route.params.Dresponse);
  const [data, setData] = useState(route.params.data);

  const donors = data.map((user) => {
    return (
      <UserCardContainer
        key={user._id}
        onPress={() => {
          navigation.navigate('MyProfile');
        }}
        style={{
          left: 8,
          marginVertical: 8,
          elevation: 2,
        }}
      >
        <UserIcon
          style={{ left: 7, top: 10, height: 70, width: 70 }}
          resizeMode="cover"
          source={{ uri: user.avatar } || require('../../assets/Illustrations/avatar.png')}
        />

        <ProfileContainer>
          <Name>{user.fullName}</Name>
          <Text>{user.address}</Text>
          <StyledRow style={{ left: 0 }}>
            <Text>
              {response[1].age} Y/O {'\t'}
            </Text>
            <Text>{user.sex}</Text>
          </StyledRow>
          <Text>{response[1].distance} KM</Text>
        </ProfileContainer>
        <StyledButton style={{ position: 'absolute', right: 16, top: 38 }}>
          <Ionicons name="chatbubble-ellipses-outline" size={34} color={brand} />
        </StyledButton>
      </UserCardContainer>
    );
  });

  // const avatar = response[0].photoUrl
  //   ? { uri: response[0].photoUrl }
  //   : require('./../../assets/Illustrations/avatar.png');

  //donors by geo-location
  const handleDistance = (credentials) => {
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
        } else {
          console.log('success');
          //navigating to search-results and passing server response
          //navigation.navigate('SearchResult', { data });
          setData(data);
        }
      })
      .catch((error) => {
        console.log('\n error');
        console.log(error);
      });
  };

  //donors by district
  const handleDistrict = (credentials) => {
    console.log(credentials);

    //localhost
    const url = 'http://192.168.10.71:3000/user/donorsByDistrict';

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        console.log('axios response');
        console.log(data);

        if (status != 'SUCCESS') {
          alert(message + ' Please try again.');
        } else {
          console.log('success');
          //navigating to search-results and passing server response
          setData(data);
        }
      })
      .catch((error) => {
        alert('Please check your network and try again');
        console.log('\n error');
        console.log(error);
      });
  };

  return (
    <StyledContainer home={true}>
      <Text style={{ top: 15, left: 0, fontSize: 20, fontFamily: 'Medium' }}>Available donors</Text>
      <InnerContainer style={{ top: 0, left: 0 }}>
        <Formik
          initialValues={{
            bloodGroup: '',
            distance: '',
            district: '',
            coordinates: null,
          }}
          onSubmit={(values, { setSubmitting }) => {
            values = { ...values, coordinates: { longitude, latitude } };
            if (values.selectedBloodGroup == '' || values.selectedDistance == '') {
              handleMessage('Please select blood group and distance.');
              setSubmitting(false);
            } else {
              //searchDonors(values, setSubmitting);
              console.log('hi');
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
            <StyledFormArea>
              <StyledRow style={{}}>
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
                  {/* <Text style={{ top: 11, left: 9, fontSize: 14, fontFamily: 'Regular' }}>Blood Group</Text> */}
                  <Picker
                    selectedValue={selectedBloodGroup}
                    style={{ height: 50, width: 160, marginLeft: 7 }}
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
                  {/* <Text style={{ top: 11, left: 9, fontSize: 14, fontFamily: 'Regular' }}>Distance</Text> */}
                  <Picker
                    selectedValue={selectedDistance}
                    style={{ height: 50, width: 160, marginLeft: 7 }}
                    onValueChange={(itemValue) => {
                      handleChange('distance')(String(itemValue));
                      setSelectedDistance(itemValue);
                      handleDistance({
                        bloodGroup: selectedBloodGroup,
                        distance: itemValue.toString(),
                        coordinates: {
                          longitude: 87.3652256,
                          latitude: 26.6653911,
                        },
                      });
                      console.log(itemValue);
                    }}
                    value={values.distance}
                  >
                    {distanceList.map((item) => {
                      return <Picker.Item key={item.value} label={item.label} value={item.value} />;
                    })}
                  </Picker>
                </View>
              </StyledRow>

              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: brand,
                  marginVertical: 0,
                  marginHorizontal: 5,
                  height: 40,
                  backgroundColor: tertiary,
                  borderRadius: 8,
                  justifyContent: 'center',
                  elevation: 2,
                }}
              >
                <Picker
                  selectedValue={selectedDistrict}
                  style={{ height: 50, marginLeft: 7 }}
                  onValueChange={(itemValue) => {
                    handleChange('district')(String(itemValue));
                    setSelectedDistrict(itemValue);
                    console.log(data);
                    handleDistrict({
                      bloodGroup: selectedBloodGroup,
                      district: itemValue,
                    });
                    console.log(itemValue);
                  }}
                  value={values.district}
                >
                  {districtList.map((district, index) => (
                    <Picker.Item key={index} label={district.toUpperCase()} value={district.toUpperCase()} />
                  ))}
                </Picker>
              </View>
            </StyledFormArea>
          )}
        </Formik>
        {/* display donors list */}
        <ScrollView style={{ width: 400 }}>{donors}</ScrollView>
        {/* test */}
      </InnerContainer>
    </StyledContainer>
  );
};

export default SearchResult;
