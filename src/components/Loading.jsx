import styled from "styled-components";

import { CommonContainer } from "../styles/styles";

const Container = styled(CommonContainer)`
  background-color: black;
`;
const LoadingGif = styled.img`
  width: 150px;
  @media (min-width: 600px) {
    width: 200px;
  }
`;
const LoadingMessage = styled.h1`
  color: white;
  letter-spacing: 2px;
`;
const Loading = () => (
  <Container>
    <LoadingGif
      src="https://media.giphy.com/media/3y0oCOkdKKRi0/giphy.gif"
      alt="loading gif"
    />
    <LoadingMessage>Loading...</LoadingMessage>
  </Container>
);

export default Loading;
