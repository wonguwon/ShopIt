import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

import { Section, GridContainer } from '../styles/common/Container';
import { Title } from '../styles/common/Typography';
import { Card, CardImage, CardContent, CardTitle } from '../styles/common/Card';
import { Button, FullWidthIconButton } from '../styles/common/Button';
import { productService } from '../api/products';
import { cartService } from '../api/cart';
import useUserStore from '../store/userStore';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState({});
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        toast.error(error.message);
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

  return (
    <Section>
      <Title>상품 목록</Title>
      <GridContainer>
        {products.map((product) => (
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
  );
};

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Price = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-top: ${({ theme }) => theme.spacing[2]};
`;

export default ProductList; 