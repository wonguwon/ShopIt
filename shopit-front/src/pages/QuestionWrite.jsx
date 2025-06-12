import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../styles/common/Button';
import { Input } from '../components/common/Input';
import { FileUpload } from '../components/common/FileUpload';
import {
  QuestionWriteContainer,
  Header,
  Title,
  Form
} from '../styles/Question.styles';
import { questionService } from '../api/questions';

const QuestionWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      // 문의글 데이터 생성
      const questionData = {
        title,
        content,
        author: localStorage.getItem('username') || '익명',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const response = await questionService.createQuestion(questionData);
      
      // 파일이 있는 경우 이미지 정보 저장 (fileData 제외)
      if (files.length > 0) {
        const imagePromises = files.map(file => {
          return fetch('http://localhost:3001/images', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              questionId: response.id,
              fileName: file.name,
              createdAt: new Date().toISOString()
            })
          });
        });
        await Promise.all(imagePromises);
      }

      alert('문의글이 등록되었습니다.');
      navigate('/question');
    } catch (error) {
      console.error('문의글 작성 실패:', error);
      alert('문의글 작성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <QuestionWriteContainer>
      <Header>
        <Title>문의글 작성</Title>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? '작성 중...' : '작성하기'}
        </Button>
      </Header>
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
        <FileUpload
          files={files}
          onChange={setFiles}
          disabled={isSubmitting}
        />
      </Form>
    </QuestionWriteContainer>
  );
};

export default QuestionWrite; 