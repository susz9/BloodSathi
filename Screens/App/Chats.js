import { View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';

//status bar
import { StatusBar } from 'expo-status-bar';

//formik for form handling
import { Formik } from 'formik';

//icons libraries
import { Ionicons } from '@expo/vector-icons';

//colors
import { Colors, StyledRow } from '../../Components/Styles';
const { primary, secondary, tertiary, brand, darkLight } = Colors;

//API client
import axios from 'axios';

//async-storage & credentials context for Login State
import { CredentialsContext } from '../../Components/CredentialsContext';

//styled components
import {
  StyledContainer,
  InnerContainer,
  StyledFormArea,
  LeftIcon,
  RightIcon,
  StyledInputLabel,
  StyledTextInput,
  StyledButton,
  ButtonText,
} from '../../Components/Styles';

const Chats = ({ navigation }) => {
  const [message, setMessage] = useState();

  //context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const handleText = (text, setSubmitting) => {
    handleMessage(null);
    const url = 'http://192.168.10.71:3000/user/signin';
    console.log(text);
    axios
      .post(url, text)
      .then((response) => {
        const result = response.data;

        const { status, message, data } = result;

        if (status !== 'SUCCESS') {
          //display failed mssg
          handleMessage(message, status);
        } else {
          //login true
          //automatically navigates to main screen using:
          persistLogin({ ...data[0] }, message, status);
          //console.log(JSON.stringify(data));
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        handleMessage('Please check your network and try again');
        console.log(error);
      });
  };

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <Formik
          initialValues={{ text: '' }}
          onSubmit={(values, { setSubmitting }) => {
            handleText(values, setSubmitting);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
            <StyledFormArea>
              <MyTextInput
                placeholder="Type your message"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('text')}
                onBlur={handleBlur('text')}
                value={values.text}
              />
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
  );
};

const MyTextInput = ({ ...props }) => {
  return (
    <View>
      <StyledTextInput {...props} />
      <RightIcon
        onPress={() => {
          setHidePassword(!hidePassword);
        }}
      >
        <TouchableOpacity>
          <Ionicons name="send" color={brand} size={24} />
        </TouchableOpacity>
      </RightIcon>
    </View>
  );
};

export default Chats;

// //Stream Chat API
// import { StreamChat } from 'stream-chat';
// import { ChannelList, OverlayProvider, Chat } from 'stream-chat-expo';

// //credentials from context- API
// import { CredentialsContext } from './../../Components/CredentialsContext';

// import { PageTitle } from '../../Components/Styles';

// const Chats = () => {
//   const userData = {
//     _id: '625158836dc00c1d1a3f863a',
//     fullName: 'Susan Shrestha',
//     phone: 9819090917,
//     email: 'susanshrestha2057@gmail.com',
//     password: '$2b$10$TRN.Lp0C.DQBSEXyt6qd4e6H2AzVyaGyVb/zbcI7gz7jVnQsGHUl6',
//     dateOfBirth: '2000-12-23T18:15:00.000Z',
//     bloodGroup: 'A+',
//     sex: 'Male',
//     address: 'Salakpur',
//     avatar: 'https://gravatar.com/avatar/45e0584cb2cb80114ac3eaff7567452e?s=400&d=robohash&r=x',
//   };

//   const user2Data = {
//     _id: '6251594c6dc00c1d1a3f8641',
//     fullName: 'Isha Dahal',
//     phone: 9745232666,
//     email: 'ishadahal@gmail.com',
//     password: '$2b$10$SwkoOjEh/6DMVJLUxLJFDuh9MuiyJxeo449HL4E7AhY7CrnCMDUCC',
//     dateOfBirth: '2000-12-23T18:15:00.000Z',
//     bloodGroup: 'A+',
//     sex: 'Female',
//     address: 'Biratchowk',
//     avatar: 'https://gravatar.com/avatar/d4c16847a9408df50103b6c9537967bd?s=400&d=retro&r=x',
//   };

//   //context
//   const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

//   const [client, setClient] = useState();
//   const [channel, setChannel] = useState();

//   useEffect(() => {
//     async function init() {
//       const chatClient = StreamChat.getInstance('byp2u2hhv9p9');

//       //connecting user
//       await chatClient.connectUser(
//         {
//           id: userData._id,
//           name: userData.fullName,
//           image: userData.avatar,
//         },
//         chatClient.devToken(userData._id),
//       );

//       //creating channel
//       const channel = chatClient.channel('messaging', user2Data._id, {
//         image: user2Data.avatar,
//         name: user2Data.fullName,
//         members: [userData._id, user2Data._id],
//       });

//       await channel.watch();

//       setChannel(channel);
//       setClient(chatClient);
//     }

//     init();

//     return () => client.disconnectUser();
//   }, []);

//   if (!channel || !client) {
//     return null;
//   } else {
//     return (
//       <OverlayProvider>
//         <Chat client={client}>
//           <ChannelList />
//         </Chat>
//       </OverlayProvider>
//     );
//   }
// };
