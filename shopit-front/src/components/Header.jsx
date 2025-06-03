import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { media } from '../styles/common/MediaQueries';
import { SITE_CONFIG } from '../config/site';
import useUserStore from '../store/userStore';
import { toast } from 'react-toastify';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('로그아웃되었습니다.');
    navigate('/login');
    setIsMenuOpen(false);
  };

  // 메뉴가 열려있을 때 body 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo to="/">{SITE_CONFIG.name}</Logo>

        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)} />

        {/* <MobileMenuOverlay $isOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} /> */}
        <MobileMenu $isOpen={isMenuOpen}>
          <UserMenu>
            {isAuthenticated ? (
              <>
                <NavItem to="/cart" onClick={() => setIsMenuOpen(false)}>
                  장바구니
                </NavItem>
                <NavItem to="/orders" onClick={() => setIsMenuOpen(false)}>
                  주문내역
                </NavItem>
                <NavItem to="/profile" onClick={() => setIsMenuOpen(false)}>
                  {user?.username}님
                </NavItem>
                <NavItem as="button" onClick={handleLogout}>
                  로그아웃
                </NavItem>
              </>
            ) : (
              <>
                <NavItem to="/login" onClick={() => setIsMenuOpen(false)}>
                  로그인
                </NavItem>
                <NavItem to="/signup" onClick={() => setIsMenuOpen(false)}>
                  회원가입
                </NavItem>
              </>
            )}
          </UserMenu>
          <Nav>
            <NavItem to="/" onClick={() => setIsMenuOpen(false)}>
              홈
            </NavItem>
            <NavItem to="/products" onClick={() => setIsMenuOpen(false)}>
              상품
            </NavItem>
            <NavItem to="/question" onClick={() => setIsMenuOpen(false)}>
              QnA게시판
            </NavItem>
          </Nav>
        </MobileMenu>

        <DesktopNav>
          <NavItem to="/">홈</NavItem>
          <NavItem to="/products">상품</NavItem>
          <NavItem to="/question">QnA게시판</NavItem>
        </DesktopNav>

        <DesktopUserMenu>
          {isAuthenticated ? (
            <>
              <NavItem to="/cart">장바구니</NavItem>
              <NavItem to="/orders">주문내역</NavItem>
              <NavItem to="/profile">{user?.username}님</NavItem>
              <NavItem as="button" onClick={handleLogout}>
                로그아웃
              </NavItem>
            </>
          ) : (
            <>
              <NavItem to="/login">로그인</NavItem>
              <NavItem to="/signup">회원가입</NavItem>
            </>
          )}
        </DesktopUserMenu>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndices.sticky};
`;

const HeaderWrapper = styled.div`
  /* max-width: 1200px;
  margin: 0 auto; */
  padding: ${({ theme }) => theme.spacing[4]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* position: relative; */
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};

  ${media.md`
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  `}
`;

const MenuButton = styled(GiHamburgerMenu)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 10;

  ${media.md`
    display: none;
  `}
`;

const MobileMenuOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
  z-index: 4;

  ${media.md`
    display: none;
  `}
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 400px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[4]};
  padding-top: ${({ theme }) => theme.spacing[16]};
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  z-index: 5;
  overflow-y: auto;

  ${media.md`
    display: none;
  `}
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const UserMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[8]};
  padding-top: ${({ theme }) => theme.spacing[8]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

const DesktopNav = styled.nav`
  display: none;
  gap: ${({ theme }) => theme.spacing[8]};

  ${media.md`
    display: flex;
  `}
`;

const DesktopUserMenu = styled.div`
  display: none;
  gap: ${({ theme }) => theme.spacing[4]};

  ${media.md`
    display: flex;
  `}
`;

const NavItem = styled(Link)`
  color: ${({ theme }) => theme.colors.gray[700]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  ${media.md`
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `}
`;

export default Header;
