import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import { questionService } from '../api/questions';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { SearchBar } from '../components/common/SearchBar';
import { Button } from '../styles/common/Button';
import {
  QuestionContainer,
  Header,
  Title,
  QuestionTable,
  Status,
  EmptyMessage
} from '../styles/Question.styles';
import styled from 'styled-components';

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const response = await questionService.getQuestions();
      setQuestions(response.data);
    } catch (error) {
      console.error('문의 목록을 불러오는데 실패했습니다:', error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await questionService.getQuestions(searchTerm);
      setQuestions(response.data);
    } catch (error) {
      console.error('검색 중 오류가 발생했습니다:', error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const QuestionTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid ${props => props.theme.colors.border};
    }

    th {
      background-color: ${props => props.theme.colors.background};
      font-weight: 600;
      color: ${props => props.theme.colors.text};
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover {
      background-color: ${props => props.theme.colors.background};
    }

    a {
      color: ${props => props.theme.colors.text};
      text-decoration: none;
      display: block;
      
      &:hover {
        color: ${props => props.theme.colors.primary};
      }
    }

    @media (max-width: 768px) {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }
  `;

  return (
    <QuestionContainer>
      <Header>
        <Title>문의게시판</Title>
        <Button onClick={() => navigate('/question/write')}>문의하기</Button>
      </Header>
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      {loading ? (
        <LoadingSpinner />
      ) : questions.length > 0 ? (
        <QuestionTable>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.id}>
                <td>{question.id}</td>
                <td>
                  <Link to={`/question/${question.id}`}>{question.title}</Link>
                </td>
                <td>{question.author}</td>
                <td>{new Date(question.createdAt).toLocaleDateString()}</td>
                <td>
                  <Status status={question.status}>
                    {question.status === 'answered' ? '답변완료' : '답변대기'}
                  </Status>
                </td>
              </tr>
            ))}
          </tbody>
        </QuestionTable>
      ) : (
        <EmptyMessage>문의글이 없습니다.</EmptyMessage>
      )}
    </QuestionContainer>
  );
};

export default Question; 