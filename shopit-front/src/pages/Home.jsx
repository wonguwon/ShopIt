import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { Section, GridContainer, Container } from '../styles/common/Container';
import { Title, Price } from '../styles/common/Typography';
import { Card, CardImage, CardContent, CardTitle } from '../styles/common/Card';
import { Button, FullWidthIconButton } from '../styles/common/Button';
import { productService } from '../api/products';
import { cartService } from '../api/cart';
import { media } from '../styles/common/MediaQueries';
import { SITE_CONFIG } from '../config/site';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import useUserStore from '../store/userStore';

const Home = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState({});
  const [error, setError] = useState(null);
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await productService.getProducts();
        setPopularProducts(products.filter((product) => product.isPopular));
        setNewProducts(products.filter((product) => product.isNew));
        setError(null);
      } catch (error) {
        const errorMessage = '상품을 불러오는데 실패했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      toast.error('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    try {
      setLoadingItems(prev => ({ ...prev, [product.id]: true }));
      
      const cartItems = await cartService.getCartItems();
      const existingItem = cartItems.find(item => item.productId === product.id);
      
      await cartService.addToCart(product.id, product.name, product.price);
      
      if (existingItem) {
        toast.success(`${product.name}의 수량이 증가했습니다.`);
      } else {
        toast.success(`${product.name}이(가) 장바구니에 추가되었습니다.`);
      }
    } catch (error) {
      if (error.message === '로그인이 필요한 서비스입니다.') {
        navigate('/login');
      }
      toast.error(error.message);
      console.error('Error adding to cart:', error);
    } finally {
      setLoadingItems(prev => ({ ...prev, [product.id]: false }));
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ClipLoader
          color={({ theme }) => theme.colors.primary}
          size={50}
          aria-label="Loading Spinner"
        />
      </LoadingContainer>
    );
  }

  if (error) {
    return null; // toast로 에러를 표시하므로 별도의 에러 UI는 필요 없음
  }

  return (
    <Container>
      <Banner>
        <div>
          <BannerTitle>{SITE_CONFIG.name}</BannerTitle>
          <BannerSubtitle>{SITE_CONFIG.description}</BannerSubtitle>
        </div>
      </Banner>

      <Section>
        <Title>인기 상품</Title>
        <GridContainer>
          {popularProducts.map((product) => (
            <Card key={product.id}>
              <Link to={`/products/${product.id}`}>
                <CardImage src={product.image} />
                <CardContent>
                  <CardTitle>{product.name}</CardTitle>
                  <Price>₩{Number(product.price).toLocaleString()}</Price>
                </CardContent>
              </Link>
              <FullWidthIconButton 
                onClick={() => handleAddToCart(product)}
                disabled={loadingItems[product.id]}
              >
                {loadingItems[product.id] ? (
                  <ClipLoader size={16} color="#ffffff" />
                ) : (
                  <>
                    <FaShoppingCart />
                    장바구니에 추가
                  </>
                )}
              </FullWidthIconButton>
            </Card>
          ))}
        </GridContainer>
      </Section>

      <Section>
        <Title>신상품</Title>
        <GridContainer>
          {newProducts.map((product) => (
            <Card key={product.id}>
              <Link to={`/products/${product.id}`}>
                <CardImage src={product.image} />
                <CardContent>
                  <CardTitle>{product.name}</CardTitle>
                  <Price>₩{Number(product.price).toLocaleString()}</Price>
                </CardContent>
              </Link>
              <FullWidthIconButton 
                onClick={() => handleAddToCart(product)}
                disabled={loadingItems[product.id]}
              >
                {loadingItems[product.id] ? (
                  <ClipLoader size={16} color="#ffffff" />
                ) : (
                  <>
                    <FaShoppingCart />
                    장바구니에 추가
                  </>
                )}
              </FullWidthIconButton>
            </Card>
          ))}
        </GridContainer>
      </Section>
    </Container>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Banner = styled.div`
  background: linear-gradient(
    50deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.info}
  );
  padding: ${({ theme }) => theme.spacing[16]} 0;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const BannerTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  ${media.md`
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  `}
`;

const BannerSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};

  ${media.md`
    font-size: ${({ theme }) => theme.fontSizes.xl};
  `}
`;

export default Home;
