import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Section, GridContainer } from '../styles/common/Container';
import { Title, Subtitle, Price } from '../styles/common/Typography';
import { Card, CardImage, CardContent, CardTitle } from '../styles/common/Card';
import { getProducts } from '../api/products';
import { media } from '../styles/common/MediaQueries';
import { SITE_CONFIG } from '../config/site';

const Home = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await getProducts();
        setPopularProducts(products.filter(product => product.isPopular));
        setNewProducts(products.filter(product => product.isNew));
        setError(null);
      } catch (error) {
        setError('상품을 불러오는데 실패했습니다.');
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <LoadingMessage>상품을 불러오는 중...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <>
      <Banner>
        <BannerContent>
          <BannerTitle>{SITE_CONFIG.name}</BannerTitle>
          <BannerSubtitle>{SITE_CONFIG.description}</BannerSubtitle>
        </BannerContent>
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

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const ErrorMessage = styled(LoadingMessage)`
  color: ${({ theme }) => theme.colors.error};
`;

const Banner = styled.div`
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.info});
  padding: ${({ theme }) => theme.spacing[16]} 0;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const BannerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
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
  opacity: 0.9;

  ${media.md`
    font-size: ${({ theme }) => theme.fontSizes.xl};
  `}
`;

export default Home; 