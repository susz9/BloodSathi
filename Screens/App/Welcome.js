import React, { useContext } from 'react';
import {
  InnerContainer,
  StyledFormArea,
  WelcomeContainer,
  MsgBox,
  PageTitle,
  StyledContainer,
  Line,
  StyledButton,
  ButtonText,
  Avatar,
  Illustration,
} from '../../Components/Styles';
import { StatusBar } from 'expo-status-bar';

//async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../../Components/CredentialsContext';

const Welcome = ({ navigation }) => {
  //context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email, photoUrl } = storedCredentials;

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
          style={{ top: 40, height: 200, width: 350 }}
          resizeMode="cover"
          source={require('./../../assets/Illustrations/Welcome.png')}
        />

        <WelcomeContainer>
          <StyledFormArea>
            <Avatar resizeMode="cover" source={avatar} />
            <PageTitle welcome={true}>
              Welcome!{'\n'} {name}
            </PageTitle>
            <StyledButton onPress={() => navigation.navigate('Main')}>
              <ButtonText>Go To Home</ButtonText>
            </StyledButton>

            <Line style={{ marginVertical: 20 }} />
            <StyledButton onPress={clearLogin}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
