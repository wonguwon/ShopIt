import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterSection>
          <FooterTitle>고객센터</FooterTitle>
          <FooterContent>
            <p>전화: 1234-5678</p>
            <p>이메일: help@shopit.com</p>
            <p>운영시간: 평일 09:00 - 18:00</p>
          </FooterContent>
        </FooterSection>
        <FooterSection>
          <FooterTitle>회사정보</FooterTitle>
          <FooterContent>
            <p>상호명: ShopIt</p>
            <p>대표: 홍길동</p>
            <p>사업자등록번호: 123-45-67890</p>
          </FooterContent>
        </FooterSection>
        <FooterSection>
          <FooterTitle>이용약관</FooterTitle>
          <FooterContent>
            <p>이용약관</p>
            <p>개인정보처리방침</p>
            <p>사업자정보확인</p>
          </FooterContent>
        </FooterSection>
      </FooterWrapper>
      <Copyright>© 2024 ShopIt. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  padding: ${({ theme }) => theme.spacing[8]} 0;
  margin-top: ${({ theme }) => theme.spacing[8]};
`;

const FooterWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing[8]};
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const FooterTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export default Footer;
