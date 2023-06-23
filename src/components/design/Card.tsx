import { View } from 'react-native';
import styled from 'styled-components';

const Card = styled(View)`
  background-color: ${({ theme }) => theme.Background[200]};
  padding: 24px;
  border-radius: 20px;
  shadow-opacity: 0.06;
  shadow-radius: 3px;
  shadow-color: ${({ theme }) => theme.GrayScale.Black};
  shadow-offset: 0px 2px;
  margin-bottom: 8px;
`;

export default Card;
