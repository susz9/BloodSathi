import React, { useContext, useState } from 'react';
import {
  InnerContainer,
  StyledFormArea,
  WelcomeContainer,
  PageTitle,
  Line,
  StyledButton,
  ButtonText,
  Illustration,
  StyledContainer,
  StyledRow,
} from '../../Components/Styles';
import { StatusBar } from 'expo-status-bar';

//credentials context
import { CredentialsContext } from '../../Components/CredentialsContext';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Pressable, ScrollView, ToastAndroid, Image, Text } from 'react-native';

//colors
import { Colors } from '../../Components/Styles';
import * as ImagePicker from 'expo-image-picker';
const { primary, secondary, tertiary, brand, darkLight } = Colors;

const UserVerification = ({ navigation }) => {
  const [userImg, setUserImg] = useState(null);
  const [idImg, setIdImg] = useState('');

  const setToastMsg = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      includeBase64: true,
    });

    console.log(result);

    if (result.cancelled) {
      setToastMsg('Selection cancelled');
    } else if (result.errorCode == 'permission') {
      setToastMsg('Permission not enabled');
    } else if (result.errorCode == 'others') {
      setToastMsg(result.errorMessage);
    } else {
      setUserImg(result.uri);
      setToastMsg('Image selected');
    }
  };

  //context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { _id } = storedCredentials;

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <Illustration style={{}} resizeMode="cover" source={require('./../../assets/Illustrations/Profile.png')} />

        <StyledFormArea>
          <PageTitle style={{ marginVertical: -8 }}>User Verification</PageTitle>

          <Pressable onPress={pickImage}>
            <View
              style={{
                marginVertical: 12,
                backgroundColor: primary,
                borderRadius: 24,
                borderWidth: 1,
                borderStyle: 'dashed',
                padding: 24,
                alignItems: 'center',
              }}
            >
              <Text style={{ left: -85, top: -7, fontFamily: 'Medium', fontSize: 15 }}>Upload User Photo</Text>
              {image ? (
                <Image source={{ uri: userImg }} style={{ width: 200, height: 200 }} />
              ) : (
                <Ionicons name="ios-cloud-upload-outline" size={60} color="black" />
              )}
            </View>
          </Pressable>

          <Pressable onPress={() => console.log('gg')}>
            <View
              style={{
                marginVertical: 12,
                backgroundColor: primary,
                borderRadius: 24,
                borderWidth: 1,
                borderStyle: 'dashed',
                padding: 24,
                alignItems: 'center',
              }}
            >
              <Text style={{ left: -85, top: -7, fontFamily: 'Medium', fontSize: 15 }}>Upload ID Photo</Text>
              <TouchableOpacity>
                <Ionicons name="ios-cloud-upload-outline" size={60} color="black" />
              </TouchableOpacity>
            </View>
          </Pressable>
          <StyledButton style={{ marginVertical: 16 }} onPress={() => console.log('submitted')}>
            <ButtonText>Submit</ButtonText>
          </StyledButton>
        </StyledFormArea>
      </InnerContainer>
    </StyledContainer>
  );
};

export default UserVerification;
