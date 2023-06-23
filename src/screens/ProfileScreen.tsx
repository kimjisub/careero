import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';

import Text from '@/components/design/Text';

const ProfileScreen = () => {
  return (
    <Container>
      <Text>Profile</Text>
    </Container>
  );
};

const Container = styled(ScrollView)`
  flex: 1;
  padding-top: 16px;
`;

export default ProfileScreen;
