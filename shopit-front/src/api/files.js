import axios from 'axios';

const API_URL = "https://ggakqw4hs9.execute-api.ap-northeast-2.amazonaws.com/dev/GeneratePresignedUrl";

export const fileService = {
  // 업로드용 프리사인드 URL 가져오기
  getUploadUrl: async (fileName, contentType) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          filename: fileName,
          contentType: contentType,
        },
      });

      const { statusCode, body } = response.data;

      if (statusCode === 200) {
        const bodyData = JSON.parse(body);
        return bodyData.url;
      } else {
        throw new Error('파일 업로드 URL 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('프리사인드 URL 생성 실패:', error);
      throw error;
    }
  },

  // 다운로드용 프리사인드 URL 가져오기
  getDownloadUrl: async (fileName, originalName) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          filename: fileName,
          originalName: originalName,
          mode: "get",
        },
      });

      const { statusCode, body } = response.data;

      if (statusCode === 200) {
        const bodyData = JSON.parse(body);
        return bodyData.url;
      } else {
        throw new Error('파일 다운로드 URL 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('프리사인드 URL 생성 실패:', error);
      throw error;
    }
  }
}; 