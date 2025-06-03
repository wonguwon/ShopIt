import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
};

const Content = styled.main`
  min-height: calc(100vh - 68px);
  padding: ${({ theme }) => theme.spacing[8]} 0;
`;

export default Layout;
