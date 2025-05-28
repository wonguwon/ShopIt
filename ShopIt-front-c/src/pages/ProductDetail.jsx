import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        await fetchProduct(id);
        // 데이터 로딩이 완료된 후 컨텐츠를 부드럽게 표시
        setTimeout(() => setIsVisible(true), 100);
      } catch (error) {
        const errorMessage = '상품 정보를 불러오는데 실패했습니다.';
        toast.error(errorMessage);
        console.error('Error loading product:', error);
      }
    };

    loadProduct();
    return () => {
      useProductStore.getState().resetProduct();
    };
  }, [id, fetchProduct]);

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
    return null;
  }

  if (!product) {
    toast.error('상품을 찾을 수 없습니다.');
    return null;
  }

  return (
    <ContentWrapper $isVisible={isVisible}>
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
    </ContentWrapper>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: translateY(${({ $isVisible }) => ($isVisible ? '0' : '20px')});
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
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

export default ProductDetail; 