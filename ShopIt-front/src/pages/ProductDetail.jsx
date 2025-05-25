import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from '../styles/common/Container';
import { Title, Subtitle, Price } from '../styles/common/Typography';
import useProductStore from '../store/productStore';
import { media } from '../styles/common/MediaQueries';

const ProductDetail = () => {
  const { id } = useParams();
  const { 
    currentProduct: product, 
    loading, 
    error, 
    fetchProduct 
  } = useProductStore();

  useEffect(() => {
    fetchProduct(id);
    return () => {
      useProductStore.getState().resetProduct();
    };
  }, [id, fetchProduct]);

  if (loading) {
    return (
      <>
        <Header />
        <Main>
          <LoadingMessage>상품 정보를 불러오는 중...</LoadingMessage>
        </Main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Main>
          <ErrorMessage>{error}</ErrorMessage>
        </Main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <Main>
          <ErrorMessage>상품을 찾을 수 없습니다.</ErrorMessage>
        </Main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Main>
        <Container>
          <ProductGrid>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <Title>{product.name}</Title>
              <Price>₩{Number(product.price).toLocaleString()}</Price>
              <Rating>
                평점: {product.rating} ({product.reviewCount}개의 리뷰)
              </Rating>
              <Description>{product.description}</Description>
              <Category>카테고리: {product.category}</Category>
              <ButtonGroup>
                <PrimaryButton>장바구니에 담기</PrimaryButton>
                <SecondaryButton>구매하기</SecondaryButton>
              </ButtonGroup>
            </ProductInfo>
          </ProductGrid>
        </Container>
      </Main>
      <Footer />
    </>
  );
};

const Main = styled.main`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing[8]} 0;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[8]};

  ${media.md`
    grid-template-columns: 1fr 1fr;
  `}
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  object-fit: cover;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Rating = styled.div`
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.gray[700]};
  line-height: 1.6;
`;

const Category = styled.div`
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const SecondaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

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

export default ProductDetail; 