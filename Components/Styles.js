import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

//colors
export const Colors = {
  primary: '#ffffff',
  secondary: '#000000',
  tertiary: '#ffe3eb',
  brand: '#F43A6B',
  darkLight: '#9ca3af',
  green: '#00db0f',
  control: '#f5f5f5',
};

const { primary, secondary, tertiary, brand, darkLight, control } = Colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight}px;
  background-color: ${primary};
  height: 100%;
  ${(props) =>
    props.home == true &&
    `
  background-color: ${control};
    `}
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`;

export const Illustration = styled.Image`
  margin-top: 32px;
  width: 196px;
  height: 196px;
`;

export const PageTitle = styled.Text`
  font-size: 28px;
  text-align: center;
  color: ${secondary};
  padding: 8px;
  font-family: Bold;
`;

export const StyledFormArea = styled.View`
  margin-vertical: 24px;
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${tertiary};
  padding-top: 4px;
  padding-left: 52px;
  border-radius: 8px;
  font-size: 14px;
  height: 44px;
  margin-vertical: 2px;
  margin-bottom: 10px;
  color: ${secondary};
  font-family: Light;
`;

export const StyledPhone = styled.TextInput`
  background-color: ${tertiary};
  padding-top: 4px;
  padding-left: 52px;
  border-radius: 8px;
  font-family: Regular;
  font-size: 16px;
  letter-spacing: 1px;
  height: 50px;
  margin-vertical: 4px;
  margin-bottom: 10px;
  color: ${secondary};
`;

export const StyledOTP = styled.TextInput`
  background-color: ${tertiary};
  padding-top: 4px;
  text-align: center;
  border-radius: 8px;
  font-family: Regular;
  font-size: 20px;
  letter-spacing: 8px;
  height: 50px;
  margin-vertical: 4px;
  margin-bottom: 10px;
  color: ${secondary};
`;

export const StyledInputLabel = styled.Text`
  color: ${secondary};
  font-size: 13px;
  text-align: left;
  font-family: Regular;
  left: 8px;
`;

export const StyledLabel = styled.Text`
  color: ${secondary};
  font-size: 15px;
  text-align: center;
  font-family: Regular;
  margin-top: 12px;
  padding: 20px;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 34px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 32px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  height: 48px;
  margin-vertical: 8px;

  ${(props) =>
    props.google == true &&
    `
    justify-content: center;
    height: 52px; 
    width: 52px; 
    border-radius: 100px;
    margin: 12px;
    
  `}

  ${(props) =>
    props.circle == true &&
    `
    align-self: center;
    height: 130px; 
    width: 130px; 
    border-radius: 100px;
    margin-vertical: 16px;
    `}
`;

export const StyledRow = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 15px;
  font-family: Medium;
  ${(props) =>
    props.google == true &&
    `
    padding: 12px;
  `}
`;

export const MsgBox = styled.Text`
  font-family: Regular;
  text-align: center;
  font-size: 14px;
  margin-top: -4px;
  margin-bottom: 4px;
  color: ${(props) => (props.status == 'SUCCESS' ? 'green' : 'red')};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  margin-vertical: 4px;
  background-color: ${darkLight};
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding-top: 16px;
  margin-vertical: 16px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-items: center;
  color: ${secondary};
  font-size: 14px;
  font-family: Light;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 14px;
  font-family: Medium;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  margin: auto;
  border-radius: 100px;
  border-width: 2px;
  border-color: ${secondary};
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const Greet = styled.Text`
  color: ${secondary};
  font-size: 24px;
  text-align: left;
`;

//user card
export const UserCardContainer = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${primary};
  justify-content: space-between;
  height: 80px;
  width: 360px;
  border-radius: 16px;
`;

export const Profile = styled.TouchableOpacity``;

export const UserIcon = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border-width: 2px;
  border-color: ${primary};
`;

export const Name = styled.Text`
  font-family: Medium;
  font-size: 20px;
`;

export const Verified = styled.Image`
  height: 64px;
  width: 296px;
  border-radius: 25px;
`;

//request feed
export const FeedContainer = styled.View`
  flex: 1;
  background-color: ${control};
  width: 360px;
  border-radius: 16px;
`;

export const StyledRequest = styled.View`
  background-color: ${primary};
  width: 340px;
  border-radius: 16px;
`;

export const MessageContainer = styled.View`
  width: 340px;
`;

export const ProfileContainer = styled.View``;
