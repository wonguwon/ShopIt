import React from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

export const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <ClipLoader
        color="#4A90E2"
        size={50}
        aria-label="Loading Spinner"
      />
    </SpinnerContainer>
  );
}; 