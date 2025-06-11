import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

import { Section, Container } from '../styles/common/Container';
import { Title } from '../styles/common/Typography';
import { Button, OutlineButton, IconButton } from '../styles/common/Button';
import { cartService } from '../api/cart';
import useUserStore from '../store/userStore';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState({});
  const { isAuthenticated, user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    loadCartItems();
  }, [isAuthenticated, navigate]);

  const loadCartItems = async () => {
    try {
      setLoading(true);
      const items = await cartService.getCartItems();
      setCartItems(items);
    } catch (error) {
      toast.error(error.message);
      console.error('Error loading cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setLoadingItems(prev => ({ ...prev, [cartItemId]: true }));
      await cartService.updateCartItemQuantity(cartItemId, newQuantity);
      await loadCartItems();
    } catch (error) {
      toast.error(error.message);
      console.error('Error updating quantity:', error);
    } finally {
      setLoadingItems(prev => ({ ...prev, [cartItemId]: false }));
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      setLoadingItems(prev => ({ ...prev, [cartItemId]: true }));
      await cartService.removeFromCart(cartItemId);
      await loadCartItems();
      toast.success('상품이 장바구니에서 제거되었습니다.');
    } catch (error) {
      toast.error(error.message);
      console.error('Error removing item:', error);
    } finally {
      setLoadingItems(prev => ({ ...prev, [cartItemId]: false }));
    }
  };

  const handleCheckout = () => {
    // TODO: 결제 페이지로 이동
    toast.info('결제 기능은 아직 구현되지 않았습니다.');
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
    <Container>
      <Section>
        <Title>장바구니</Title>
        {cartItems.length === 0 ? (
          <EmptyCart>
            <p>장바구니가 비어있습니다.</p>
            <OutlineButton onClick={() => navigate('/products')}>
              상품 보러가기
            </OutlineButton>
          </EmptyCart>
        ) : (
          <>
            <CartTable>
              <thead>
                <tr>
                  <th>상품</th>
                  <th>가격</th>
                  <th>수량</th>
                  <th>합계</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <ProductInfo>
                        <ProductName>{item.productName}</ProductName>
                      </ProductInfo>
                    </td>
                    <td>₩{Number(item.price).toLocaleString()}</td>
                    <td>
                      <QuantityControl>
                        <div className="quantity-buttons">
                          <IconButton
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={loadingItems[item.id]}
                          >
                            <FaMinus />
                          </IconButton>
                        </div>
                        <Quantity>{item.quantity}</Quantity>
                        <div className="quantity-buttons">
                          <IconButton
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={loadingItems[item.id]}
                          >
                            <FaPlus />
                          </IconButton>
                        </div>
                      </QuantityControl>
                    </td>
                    <td>₩{Number(item.price * item.quantity).toLocaleString()}</td>
                    <td>
                      <IconButton
                        variant="danger"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={loadingItems[item.id]}
                      >
                        {loadingItems[item.id] ? (
                          <ClipLoader size={16} color="#ffffff" />
                        ) : (
                          <FaTrash />
                        )}
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </CartTable>

            <CartSummary>
              <div>
                <SummaryRow>
                  <span>총 상품 금액</span>
                  <span>₩{Number(totalAmount).toLocaleString()}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>배송비</span>
                  <span>무료</span>
                </SummaryRow>
                <SummaryRow total>
                  <span>총 결제 금액</span>
                  <span>₩{Number(totalAmount).toLocaleString()}</span>
                </SummaryRow>
              </div>
              <CheckoutButton onClick={handleCheckout}>
                결제하기
              </CheckoutButton>
            </CartSummary>
          </>
        )}
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

const EmptyCart = styled.div`
  text-align: center;
  padding: 32px;
  
  p {
    margin-bottom: 16px;
    color: #4b5563;
  }
`;

const CartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 32px;

  th, td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  th {
    font-weight: 600;
    color: #4b5563;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProductName = styled.span`
  font-weight: 500;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    .quantity-buttons {
      display: none;
    }
  }
`;

const Quantity = styled.span`
  min-width: 40px;
  text-align: center;
  font-weight: 500;
`;

const CartSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background-color: #f9fafb;
  border-radius: 8px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: ${props => props.total ? '18px' : '16px'};
  font-weight: ${props => props.total ? '600' : '400'};
  color: ${props => props.total ? '#111827' : '#4b5563'};
`;

const CheckoutButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  background-color: #646cff;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #535bf2;
  }

  @media (min-width: 768px) {
    min-width: 200px;
  }
`;

export default Cart; 