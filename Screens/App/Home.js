import React, { useState, useContext, useEffect } from 'react';
import { Text, View, ScrollView, SafeAreaView, Pressable } from 'react-native';
//status bar
import { StatusBar } from 'expo-status-bar';
import {
  StyledContainer,
  UserCardContainer,
  Greet,
  UserIcon,
  Name,
  InnerContainer,
  FeedContainer,
  StyledButton,
  ButtonText,
  StyledRequest,
  MessageContainer,
  Line,
  StyledRow,
} from '../../Components/Styles';

import Avatar from '../../assets/Illustrations/avatar.png';
//icons libraries
import { Ionicons } from '@expo/vector-icons';

//colors
import { Colors } from '../../Components/Styles';
const { primary, secondary, tertiary, brand, darkLight, green } = Colors;

//API client
import axios from 'axios';

//credentials context
import { CredentialsContext } from './../../Components/CredentialsContext';
import { Button } from 'react-native-web';

const request = [
  {
    id: 1,
    user: {
      name: 'Susan Shrestha',
      address: 'Salakpur',
    },
    requiredBG: 'B+',
    patientName: 'Hari Karki',
    Message: 'Test request for hari karki of B+ blood group at Apex hospital itahari urgent.',
  },
];

const Home = ({ navigation }) => {
  //context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, photoUrl } = storedCredentials;
  const { _id, fullName, address, isDonor } = storedCredentials;
  const avatar = photoUrl ? { uri: photoUrl } : require('./../../assets/Illustrations/avatar.png');
  //console.log(storedCredentials);
  const [time, setTime] = useState();
  const [requestsData, setRequestsData] = useState([]);

  const handleGreet = () => {
    var today = new Date();
    var curHr = today.getHours();
    var time = null;

    if (curHr < 12) {
      var time = 'Morning';
    } else if (curHr < 18) {
      var time = 'Afternoon';
    } else {
      var time = 'Evening';
    }
    setTime(time);
  };

  const handleRequests = () => {
    axios
      .get('http://192.168.10.71:3000/requests')
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        //console.log(typeof data);
        if (status != 'SUCCESS') {
          //no requests found
          alert(message);
        } else {
          setRequestsData(data);
          console.log('requestsData');
        }
      })
      .catch((error) => {
        console.log('\n error');
        console.log(error);
      });
  };

  const handleDelete = (requestID) => {
    console.log('im pressed');
    const url = `http://192.168.10.71:3000/deleteRequest/${_id}`;
    console.log(requestID);
    axios
      .put(url, requestID)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;

        if (status !== 'SUCCESS') {
        } else {
          console.log('request deleted');
          alert(message);
        }
      })
      .catch((error) => {
        handleMessage('Please check your network and try again');
        console.log(JSON.stringify(error));
      });
  };

  useEffect(() => {
    handleRequests();
    handleGreet();
  }, []);

  const requests = requestsData.map((bloodRequest, index) => {
    return (
      <StyledRequest key={index} style={{ marginVertical: 8, paddingBottom: 20, elevation: 1 }}>
        <UserCardContainer>
          <UserIcon
            resizeMode="cover"
            source={
              { uri: bloodRequest.avatar } || {
                uri: Avatar,
              }
            }
          />
          <View>
            <StyledRow>
              <Name style={{ left: 10, top: 3 }}>{bloodRequest.fullName}</Name>
              {bloodRequest.isDonor && (
                <Ionicons style={{ left: 16, top: 4 }} name="checkmark-circle" size={20} color={green} />
              )}
            </StyledRow>
            <StyledRow style={{ left: 8 }}>
              <Ionicons name="location" size={16} color={brand} />
              <Text style={{ fontFamily: 'Regular' }}>{bloodRequest.address}</Text>
            </StyledRow>
          </View>
          {bloodRequest._id === _id && (
            <Pressable
              style={{
                borderRadius: 100,
                left: 90,
                padding: 9,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => handleDelete({ postId: bloodRequest.requests._id })}
            >
              <Ionicons name="trash" size={30} color="red" />
            </Pressable>
          )}
        </UserCardContainer>

        <Line style={{ width: '90%' }} />

        <MessageContainer>
          <Text style={{ fontSize: 15, fontFamily: 'Regular' }}>
            Required Blood Group: {bloodRequest.requests.bloodGroup}
          </Text>
          <Text style={{ fontSize: 15, fontFamily: 'Regular' }}>Patient Name: {bloodRequest.requests.patientName}</Text>
          <Text style={{ fontSize: 15, fontFamily: 'Regular' }}>
            Hospital Details: {bloodRequest.requests.hospital}
          </Text>
          <Text style={{ fontSize: 15, fontFamily: 'Regular' }}>
            Message:{'\n'}
            {bloodRequest.requests.message}
          </Text>
        </MessageContainer>

        <StyledButton style={{ elevation: 2, width: 320, marginVertical: 8 }}>
          <ButtonText style={{ fontSize: 15, fontFamily: 'Medium' }}>Reply</ButtonText>
        </StyledButton>
      </StyledRequest>
    );
  });

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <StyledContainer home={true}>
      <StatusBar style="dark" />
      <InnerContainer>
        <View
          style={{
            backgroundColor: tertiary,
            height: 300,
            width: 400,
            borderRadius: 80,
            position: 'absolute',
            top: -170,
          }}
        ></View>
        <Greet style={{ left: -100 }}>{`Hi, \nGood ${time}!`}</Greet>

        <UserCardContainer
          onPress={() => {
            navigation.navigate('MyProfile');
          }}
          style={{ top: 10, elevation: 3 }}
        >
          <UserIcon style={{ left: 0, top: 0 }} resizeMode="cover" source={avatar} />
          <View>
            <Name style={{ left: 10, top: 3 }}>{fullName}</Name>
            <StyledRow style={{ left: 8 }}>
              <Ionicons name="location" size={16} color={brand} />
              <Text>{address}</Text>
            </StyledRow>
          </View>
          {isDonor ? (
            <Ionicons
              style={{ position: 'absolute', right: 16, top: 20 }}
              name="checkmark-circle"
              size={28}
              color={green}
            />
          ) : (
            <StyledButton
              onPress={() => navigation.navigate('UserVerification')}
              style={{ borderRadius: 30, position: 'absolute', right: 16, top: 24, height: 26, width: 70 }}
            >
              <ButtonText style={{ fontSize: 12, fontFamily: 'Regular' }}>Verify</ButtonText>
            </StyledButton>
          )}
        </UserCardContainer>

        <FeedContainer style={{ top: 22 }}>
          <StyledRow style={{ alignItems: 'center' }}>
            <Text style={{ left: -92, marginVertical: 10, fontSize: 20, fontFamily: 'Medium' }}>Request Feed</Text>
            <Pressable onPress={handleRequests} style={{ left: -80, top: -5 }}>
              <Ionicons name="refresh-outline" size={28} color={brand} />
            </Pressable>
          </StyledRow>

          <StyledButton onPress={() => navigation.navigate('AddRequest', _id)} style={{ elevation: 3, width: 320 }}>
            <ButtonText style={{ fontSize: 16, fontFamily: 'Medium' }}>Add New Request</ButtonText>
          </StyledButton>
          <ScrollView
            style={{ width: 400, marginVertical: 16, marginBottom: 90 }}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {requestsData.length > 0 ? (
              requests
            ) : (
              <Text style={{ flexWrap: 'wrap', fontSize: 15, fontFamily: 'Regular', width: 300, textAlign: 'center' }}>
                Please check your internet connection and try again.
              </Text>
            )}
          </ScrollView>
        </FeedContainer>
      </InnerContainer>
    </StyledContainer>
    // </SafeAreaView>
  );
};

export default Home;
