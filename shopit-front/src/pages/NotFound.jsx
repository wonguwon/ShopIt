import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../styles/common/Container';
import { Button } from '../styles/common/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <NotFoundContainer>
        <Title>404</Title>
        <Subtitle>페이지를 찾을 수 없습니다</Subtitle>
        <Description>
          요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.
        </Description>
        <Button onClick={() => navigate('/')}>
          홈으로 돌아가기
        </Button>
      </NotFoundContainer>
    </Container>
  );
};

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: ${({ theme }) => theme.spacing[8]};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gray[700]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

export default NotFound; 