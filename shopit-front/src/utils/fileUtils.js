/**
 * 파일 다운로드를 실행하는 함수
 * @param {string} url - 다운로드할 파일의 URL
 * @param {string} fileName - 저장될 파일 이름
 */
export const downloadFile = (url, fileName) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 