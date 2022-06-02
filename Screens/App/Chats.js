import React, { useEffect, useState, useContext } from 'react';

//Stream Chat API
import { StreamChat } from 'stream-chat';
import { ChannelList, OverlayProvider, Chat } from 'stream-chat-expo';

//credentials from context- API
import { CredentialsContext } from './../../Components/CredentialsContext';

import { PageTitle } from '../../Components/Styles';

const client = StreamChat.getInstance('5rftmzvh3xsp');

const Chats = () => {
  //context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { _id, name, photoUrl } = storedCredentials;
  const avatar = require('./../../assets/Illustrations/avatar.png');

  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      // open the WebSocket connection to start receiving events
      await client.connectUser(
        {
          id: 'ram',
          name: 'Ram Krishna',
          image: 'https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg',
        },
        client.devToken('ram'),
      );
      setChatClient(client);

      const channel = client.channel('messaging', 'bloodsathi123', { name: 'blood.sathi' });
      await channel.watch();
      console.log('connected chat');
    };

    initChat();

    // close the WebSocket connection when component dismounts
    return () => chatClient.disconnectUser();
  }, []);

  if (!chatClient) {
    return null;
  } else {
    return (
      <OverlayProvider>
        <Chat client={chatClient}>
          <ChannelList />
        </Chat>
      </OverlayProvider>
    );
  }
};

export default Chats;
