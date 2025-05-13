import { styled, keyframes } from "styled-components";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  width: 50px;
  height: 50px;

  svg {
    animation: ${spin} 1s linear infinite;
  }
`;

export const LoadingSpinner = () => (
  <SpinnerContainer>
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="20" stroke="#f3f3f3" strokeWidth="5" />
      <path
        d="M25 5C13.954 5 5 13.954 5 25"
        stroke="#3498db"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  </SpinnerContainer>
); 