import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../styles/common/Button';
import { Input } from '../components/common/Input';
import {
  QuestionDetailContainer,
  Header,
  Title,
  Form,
  Status,
  QuestionHeader,
  QuestionMeta,
  QuestionContent,
  ButtonGroup
} from '../styles/Question.styles';
import { questionService } from '../api/questions';
import styled from 'styled-components';

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadQuestion();
  }, [id]);

  const loadQuestion = async () => {
    try {
      setIsLoading(true);
      const data = await questionService.getQuestion(id);
      setQuestion(data);
      setTitle(data.title);
      setContent(data.content);
    } catch (error) {
      console.error('문의글을 불러오는데 실패했습니다:', error);
      alert('문의글을 불러오는데 실패했습니다.');
      navigate('/question');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    if (!window.confirm('정말로 이 문의글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      setIsSubmitting(true);
      await questionService.deleteQuestion(id);
      alert('문의글이 삭제되었습니다.');
      navigate('/question');
    } catch (error) {
      console.error('문의글 삭제 실패:', error);
      alert('문의글 삭제에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      await questionService.updateQuestion(id, {
        ...question,
        title,
        content,
        updatedAt: new Date().toISOString()
      });
      setIsEditing(false);
      await loadQuestion();
      alert('문의글이 수정되었습니다.');
    } catch (error) {
      console.error('문의글 수정 실패:', error);
      alert('문의글 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!question) {
    return <div>문의글을 찾을 수 없습니다.</div>;
  }

  return (
    <QuestionDetailContainer>
      <Header>
        <Title>{isEditing ? '문의글 수정' : question.title}</Title>
      </Header>
      {isEditing ? (
        <Form>
          <Input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
          />
          <Input
            as="textarea"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            disabled={isSubmitting}
          />
          <ButtonGroup>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? '저장 중...' : '저장하기'}
            </Button>
            <Button onClick={() => setIsEditing(false)} disabled={isSubmitting}>
              취소
            </Button>
          </ButtonGroup>
        </Form>
      ) : (
        <>
          <QuestionHeader>
            <QuestionMeta>
              <p>작성자: {question.author}</p>
              <p>작성일: {new Date(question.createdAt).toLocaleDateString()}</p>
              <p>상태: <Status status={question.status}>
                {question.status === 'answered' ? '답변완료' : '답변대기'}
              </Status></p>
            </QuestionMeta>
          </QuestionHeader>
          <QuestionContent>{question.content}</QuestionContent>
          <ButtonGroup>
            <Button onClick={() => navigate('/question')}>목록으로</Button>
            <Button onClick={handleEdit}>수정하기</Button>
            <Button onClick={handleDelete}>삭제하기</Button>
          </ButtonGroup>
        </>
      )}
    </QuestionDetailContainer>
  );
};

export default QuestionDetail; 