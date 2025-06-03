import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Section, GridContainer } from '../styles/common/Container';
import { Title, Price } from '../styles/common/Typography';
import { Card, CardImage, CardContent, CardTitle } from '../styles/common/Card';
import { productService } from '../api/products';
import { media } from '../styles/common/MediaQueries';
import { SITE_CONFIG } from '../config/site';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const Home = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <>
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
            </Card>
          ))}
        </GridContainer>
      </Section>
    </>
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
