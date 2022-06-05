import React, { useState, useContext } from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
//status bar
import { StatusBar } from 'expo-status-bar';
import {
  StyledContainer,
  UserCardContainer,
  Greet,
  UserIcon,
  Name,
  Verified,
  InnerContainer,
  FeedContainer,
  StyledButton,
  ButtonText,
  StyledRequest,
  MessageContainer,
  Line,
  Profile,
} from '../../Components/Styles';

//icons libraries
import { Ionicons } from '@expo/vector-icons';

//colors
import { Colors } from '../../Components/Styles';
const { primary, secondary, tertiary, brand, darkLight, green } = Colors;

//credentials context
import { CredentialsContext } from './../../Components/CredentialsContext';

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

  const avatar = photoUrl ? { uri: photoUrl } : require('./../../assets/Illustrations/Welcome.png');

  return (
    <>
      <StyledContainer home={true}>
        <StatusBar style="dark" />
        <Greet>{`Hi, \nGood Afternoon!`}</Greet>
        <InnerContainer>
          <UserCardContainer
            onPress={() => {
              navigation.navigate('MyProfile');
            }}
            style={{ top: 10, elevation: 3 }}
          >
            <UserIcon style={{ left: 20, top: 14 }} resizeMode="cover" source={avatar} />

            <Name style={{ left: -15, top: 20 }}>{name}</Name>

            <Ionicons style={{ left: 26, top: 20 }} name="checkmark-circle" size={35} color={green} />
          </UserCardContainer>

          <FeedContainer style={{ top: 22 }}>
            <Text style={{ top: 8, left: 20, fontSize: 18, fontFamily: 'Medium' }}>Request Feed</Text>
            <StyledButton onPress={() => navigation.navigate('AddRequest')} style={{ top: 16, left: 16, width: 320 }}>
              <ButtonText style={{ fontSize: 18, fontFamily: 'Regular' }}>Add Request</ButtonText>
            </StyledButton>
            <StyledRequest style={{ top: 30, left: 10, paddingBottom: 40, elevation: 1 }}>
              <UserCardContainer style={{ left: 0, width: 310, backgroundColor: 'White' }}>
                <UserIcon style={{ left: 20, top: 14 }} resizeMode="cover" source={avatar} />
                <Name style={{ left: 16, top: 18, fontSize: 16 }}>{request[0].user.name}</Name>
                <Text style={{ left: -125, top: 40 }}>{request[0].user.address}</Text>
                <Ionicons style={{ right: 65, top: 20 }} name="checkmark-circle" size={20} color={green} />
              </UserCardContainer>

              <Line />

              <MessageContainer style={{ top: 0 }}>
                <Text style={{ top: 8, left: 30, fontSize: 16, fontFamily: 'Regular' }}>
                  Required Blood Group: {request[0].requiredBG}
                  {'\n'}
                </Text>

                <Text style={{ top: 8, left: 30, fontSize: 16, fontFamily: 'Regular' }}>
                  Patient Name: {request[0].patientName}
                  {'\n'}
                </Text>

                <Text style={{ width: 290, top: 8, left: 30, fontSize: 16, fontFamily: 'Regular' }}>
                  Message:{'\n'}
                  {request[0].Message}
                </Text>
              </MessageContainer>

              <StyledButton style={{ top: 16, left: 16, width: 290 }}>
                <ButtonText style={{ fontSize: 18, fontFamily: 'Regular' }}>Reply</ButtonText>
              </StyledButton>
            </StyledRequest>
          </FeedContainer>
        </InnerContainer>
      </StyledContainer>
    </>
  );
};

export default Home;
