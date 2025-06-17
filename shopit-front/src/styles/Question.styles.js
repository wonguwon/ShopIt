import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const QuestionContainer = styled.div`
  padding: 32px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const QuestionWriteContainer = styled(QuestionContainer)``;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 32px;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

export const QuestionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 32px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }

  th {
    background: ${props => props.theme.colors.background};
    font-weight: 600;
    color: ${props => props.theme.colors.text};
  }

  td {
    color: ${props => props.theme.colors.text};
  }

  tr:last-child td {
    border-bottom: none;
  }

  a {
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }

  @media (max-width: 768px) {
    th:nth-child(3),
    td:nth-child(3),
    th:nth-child(4),
    td:nth-child(4) {
      display: none;
    }

    th:nth-child(1),
    td:nth-child(1) {
      width: 15%;
    }

    th:nth-child(2),
    td:nth-child(2) {
      width: 60%;
    }

    th:nth-child(5),
    td:nth-child(5) {
      width: 25%;
    }
  }
`;

export const Status = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${props => 
    props.status === 'answered' 
      ? props.theme.colors.success 
      : props.theme.colors.warning
  };
  color: white;
  white-space: nowrap;
  text-align: center;
  min-width: 80px;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 3px 6px;
    min-width: 70px;
  }
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 32px;
  color: ${props => props.theme.colors.text};
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  button {
    align-self: flex-end;
  }
`;

export const QuestionDetailContainer = styled(QuestionContainer)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
`;

export const QuestionHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};

  h2 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    color: ${props => props.theme.colors.gray[800]};
    margin-bottom: 1rem;
  }
`;

export const QuestionMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.sm};

  p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const QuestionContent = styled.div`
  font-size: ${props => props.theme.fontSizes.base};
  line-height: 1.6;
  color: ${props => props.theme.colors.gray[700]};
  white-space: pre-wrap;
  min-height: 200px;
  padding: 1rem;
  background: ${props => props.theme.colors.gray[50]};
  border-radius: 4px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
  justify-content: flex-end;
`;

export const FileList = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.gray[50]};
  border-radius: 8px;

  h3 {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[800]};
    margin-bottom: 1rem;
  }
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background-color: white;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: 4px;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  span {
    color: ${props => props.theme.colors.gray[700]};
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

export const FileDownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: ${props => props.theme.fontSizes.sm};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }

  svg {
    font-size: ${props => props.theme.fontSizes.base};
  }
`; 