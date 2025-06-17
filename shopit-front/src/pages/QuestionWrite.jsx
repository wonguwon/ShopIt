import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
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
import { fileService } from '../api/files';
import { toast } from 'react-toastify';

const QuestionWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const uploadFileToS3 = async (file) => {
    try {
      // 파일 확장자 추출
      const extension = file.name.split('.').pop();
      const uniqueFilename = `${uuidv4()}.${extension}`;
      const encodedFilename = encodeURIComponent(uniqueFilename);

      // 프리사인드 URL 가져오기
      const presignedUrl = await fileService.getUploadUrl(encodedFilename, file.type);

      // S3에 파일 업로드
      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      return {
        originalName: file.name,
        fileName: encodedFilename,
        fileType: file.type
      };
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      // 파일이 있는 경우 S3에 업로드
      const uploadedFileData = [];
      if (files.length > 0) {
        for (const file of files) {
          try {
            const fileData = await uploadFileToS3(file);
            uploadedFileData.push(fileData);
          } catch (error) {
            toast.error(`${file.name} 파일 업로드에 실패했습니다.`);
            continue;
          }
        }
      }

      // 문의글 데이터 생성
      const questionData = {
        title,
        content,
        author: localStorage.getItem('username') || '익명',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        files: uploadedFileData
      };

      const response = await questionService.createQuestion(questionData);
      
      toast.success('문의글이 등록되었습니다.');
      navigate('/question');
    } catch (error) {
      console.error('문의글 작성 실패:', error);
      toast.error('문의글 작성에 실패했습니다. 다시 시도해주세요.');
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