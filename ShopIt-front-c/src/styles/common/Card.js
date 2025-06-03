import styled from 'styled-components';
import { media } from './MediaQueries';

export const Card = styled.div`
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  ${media.md`
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  `}

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const CardImage = styled.div`
  width: 100%;
  height: 160px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  background-image: ${({ src }) => (src ? `url(${src})` : 'none')};
  background-size: cover;
  background-position: center;

  ${media.md`
    height: 200px;
  `}
`;

export const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing[3]};

  ${media.md`
    padding: ${({ theme }) => theme.spacing[4]};
  `}
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.gray[900]};

  ${media.md`
    font-size: ${({ theme }) => theme.fontSizes.lg};
  `}
`;

export const CardText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};

  ${media.md`
    font-size: ${({ theme }) => theme.fontSizes.base};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  `}
`;
