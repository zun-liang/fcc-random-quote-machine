import styled from "styled-components";

import { CommonContainer } from "../styles/styles";

const Container = styled(CommonContainer)`
  background-color: #e9a0a0;
`;
const ErrorGif = styled.img`
  width: 150px;
  @media (min-width: 600px) {
    width: 300px;
  }
`;
const ErrorMessage = styled.h1`
  text-align: center;
  letter-spacing: 2px;
`;

const Error = () => (
  <Container>
    <ErrorGif
      src="https://media.giphy.com/media/f0BaErqmljUd2/giphy.gif"
      alt="error gif"
    />
    <ErrorMessage>
      Oops! Something went wrong. Please try again later.
    </ErrorMessage>
  </Container>
);

export default Error;
