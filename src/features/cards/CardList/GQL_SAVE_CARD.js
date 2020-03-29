import { gql } from 'apollo-boost';

const GQL_SAVE_CARD = gql`
  mutation upsertCard(
    $id: String
    $userId: String!
    $labels: [String]
    $sideAText: String
    $sideAImageUrl: String
    $sideAFontSize: Int
    $sideBText: String
    $sideBImageUrl: String
    $sideBFontSize: Int
    $lastTestTime: String
  ) {
    upsertCard(
      id: $id
      userId: $userId
      labels: $labels
      sideAText: $sideAText
      sideAImageUrl: $sideAImageUrl
      sideAFontSize: $sideAFontSize
      sideBText: $sideBText
      sideBImageUrl: $sideBImageUrl
      sideBFontSize: $sideBFontSize
      lastTestTime: $lastTestTime
    ) {
      id
      labels
      sideAText
      sideAImageUrl
      sideAFontSize
      sideBText
      sideBImageUrl
      sideBFontSize
      lastTestTime
    }
  }
`;

export default GQL_SAVE_CARD;
