import React, { useContext } from 'react';
import { Text, ScrollView } from 'react-native';
import {
  StyledContainer,
  UserCardContainer,
  Greet,
  UserIcon,
  Illustration,
  WelcomeContainer,
  Avatar,
  MsgBox,
  Name,
  Address,
  StyledFormArea,
  InnerContainer,
  FeedContainer,
  StyledButton,
  ButtonText,
  StyledRequest,
  MessageContainer,
  Line,
  Profile,
  StyledRow,
} from '../../Components/Styles';
import { StatusBar } from 'expo-status-bar';

//icons libraries
import { Ionicons } from '@expo/vector-icons';

//colors
import { Colors } from '../../Components/Styles';
const { primary, secondary, tertiary, brand, darkLight, green } = Colors;

//async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../../Components/CredentialsContext';

const response = [
  {
    id: 1,
    name: 'Susan Shrestha',
    address: 'Salakpur, Morang',
    bloodGroup: 'A+',
    dateOfBirth: '24 Dec 2000',
    sex: 'Male',
  },
];

const MyProfile = () => {
  //context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl, bloodGroup, dateOfBirth, sex, address } = storedCredentials;

  const avatar = photoUrl ? { uri: photoUrl } : require('./../../assets/Illustrations/Welcome.png');

  const clearLogin = () => {
    AsyncStorage.removeItem('bloodSathiCredentials')
      .then(() => {
        setStoredCredentials('');
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <Illustration
          style={{ width: '100%', height: 220 }}
          resizeMode="cover"
          source={require('./../../assets/Illustrations/cover.png')}
        />

        <WelcomeContainer style={{ top: -60 }}>
          <Avatar style={{ height: 150, width: 150, top: 10, borderWidth: 3 }} resizeMode="cover" source={avatar} />

          <StyledRow style={{}}>
            <Name style={{ top: 18, fontSize: 24 }}>{response[0].name}</Name>
            <Ionicons style={{ left: 4, top: 26 }} name="checkmark-circle" size={20} color={green} />
          </StyledRow>
          <Text style={{ top: 10, left: 5, fontSize: 50, fontFamily: 'Regular', color: '#F43A6B' }}>
            {response[0].bloodGroup}
          </Text>
          <Text style={{ left: 5, fontSize: 30, fontFamily: 'Regular', color: '#000000' }}>{response[0].sex}</Text>
          <StyledRow style={{}}>
            <Ionicons name={'calendar-outline'} size={26} color={brand} />
            <Text style={{ left: 10, fontSize: 24, fontFamily: 'Regular', color: '#000000' }}>
              {response[0].dateOfBirth}
            </Text>
          </StyledRow>
          <StyledRow>
            <Ionicons style={{ left: 4, top: -2 }} name="location" size={26} color={brand} />
            <Address style={{ left: 10, fontSize: 20, fontFamily: 'Regular' }}>{response[0].address}</Address>
          </StyledRow>

          <StyledFormArea style={{ top: -30 }}>
            <Line style={{ marginVertical: 50 }} />
            <MsgBox style={{ color: '#000000', bottom: 10 }} welcome={true}>
              {email}
            </MsgBox>
            <StyledButton style={{ width: 300 }} onPress={clearLogin}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default MyProfile;
