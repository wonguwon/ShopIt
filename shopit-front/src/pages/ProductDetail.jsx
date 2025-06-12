import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../styles/common/Button';
import { cartService } from '../api/cart';
import useUserStore from '../store/userStore';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProductName = styled.h1`
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.gray[800]};
`;

const ProductPrice = styled.p`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.gray[700]};
  font-weight: bold;
`;

const ProductDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const QuantityButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  background: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.gray[100]};
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  text-align: center;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: 4px;
  padding: 0.5rem;
`;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useUserStore();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: 실제 API 연동 시 상품 정보를 가져오는 로직 추가
    // 임시 데이터
    setProduct({
      id: 1,
      name: '스마트폰',
      price: 1000000,
      description: '최신 스마트폰입니다.',
      image: 'https://via.placeholder.com/500'
    });
    setLoading(false);
  }, [id]);

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    try {
      await cartService.addToCart(
        product.id,
        product.name,
        product.price
      );
      alert('장바구니에 상품이 추가되었습니다.');
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <ProductContainer>
        <ProductImage src={product.image} alt={product.name} />
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
          <ProductDescription>{product.description}</ProductDescription>
          <QuantityControl>
            <QuantityButton onClick={() => handleQuantityChange(-1)}>-</QuantityButton>
            <QuantityInput
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              min="1"
            />
            <QuantityButton onClick={() => handleQuantityChange(1)}>+</QuantityButton>
          </QuantityControl>
          <Button onClick={handleAddToCart}>장바구니에 담기</Button>
        </ProductInfo>
      </ProductContainer>
    </Container>
  );
};

export default ProductDetail; 