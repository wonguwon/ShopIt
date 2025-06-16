import React, { useState, useEffect } from 'react';
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
import { Input } from '../components/common/Input';
import { orderService } from '../api/orders';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
`;

const OrderSummary = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  height: fit-content;
`;

const CartItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.p`
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.gray[600]};
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const QuantityButton = styled.button`
  padding: 0.25rem 0.5rem;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  background: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.gray[100]};
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: 4px;
  padding: 0.25rem;
`;

const SummaryTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 1rem;
  text-align: left;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.gray[600]};
`;

const TotalRow = styled(SummaryRow)`
  font-weight: bold;
  color: ${props => props.theme.colors.gray[800]};
  font-size: ${props => props.theme.fontSizes.lg};
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
`;

const ShippingForm = styled.form`
  margin-top: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.gray[700]};
   text-align: left;
`;

const PaymentMethodSelect = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const PaymentMethodOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input[type="radio"] {
    margin: 0;
  }

  label {
    cursor: pointer;
  }
`;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState({});
  const [quantityLoadingItems, setQuantityLoadingItems] = useState({});
  const { isAuthenticated, user } = useUserStore();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    recipient: '',
    phone: '',
    address: '',
    detailAddress: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

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
      setQuantityLoadingItems(prev => ({ ...prev, [cartItemId]: true }));
      await cartService.updateCartItemQuantity(cartItemId, newQuantity);
      
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === cartItemId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      toast.error(error.message);
      console.error('Error updating quantity:', error);
    } finally {
      setQuantityLoadingItems(prev => ({ ...prev, [cartItemId]: false }));
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

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShippingFee = () => {
    return calculateSubtotal() >= 100000 ? 0 : 3000;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShippingFee();
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    
    // 배송지 정보 검증
    if (!shippingInfo.recipient || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.detailAddress) {
      alert('배송지 정보를 모두 입력해주세요.');
      return;
    }

    try {
      const orderData = {
        userEmail: user.email, // 로그인한 사용자의 이메일 사용
        orderNumber: `ORD-${new Date().toISOString().split('T')[0]}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        orderDate: new Date().toISOString(),
        orderStatus: '주문완료',
        paymentMethod: paymentMethod === 'credit_card' ? '신용카드' : '현금',
        paymentStatus: '결제완료',
        shippingAddress: shippingInfo,
        orderItems: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        orderSummary: {
          subtotal: calculateSubtotal(),
          shippingFee: calculateShippingFee(),
          totalAmount: calculateTotal()
        }
      };

      await orderService.createOrder(orderData);
      alert('주문이 완료되었습니다.');
      // 장바구니 비우기
      await Promise.all(cartItems.map(item => cartService.removeFromCart(item.id)));
      navigate('/orders'); // 주문 목록 페이지로 이동
    } catch (error) {
      console.error('주문 실패:', error);
      alert('주문 처리에 실패했습니다.');
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
    <CartContainer>
      <CartHeader>
        <Title>장바구니</Title>
      </CartHeader>
      <CartContent>
        <CartItems>
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <CartItem key={item.id}>
                <ItemImage src={item.image} alt={item.productName} />
                <ItemInfo>
                  <ItemName>{item.productName}</ItemName>
                  <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
                  <ItemQuantity>
                    <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</QuantityButton>
                    <QuantityInput
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      min="1"
                    />
                    <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</QuantityButton>
                    <Button onClick={() => handleRemoveItem(item.id)}>삭제</Button>
                  </ItemQuantity>
                </ItemInfo>
              </CartItem>
            ))
          ) : (
            <EmptyCart>
              <p>장바구니가 비어있습니다.</p>
              <OutlineButton onClick={() => navigate('/products')}>
                상품 보러가기
              </OutlineButton>
            </EmptyCart>
          )}
        </CartItems>
        <OrderSummary>
          <SummaryTitle>주문 정보</SummaryTitle>
          <SummaryRow>
            <span>상품 금액</span>
            <span>{calculateSubtotal().toLocaleString()}원</span>
          </SummaryRow>
          <SummaryRow>
            <span>배송비</span>
            <span>{calculateShippingFee().toLocaleString()}원</span>
          </SummaryRow>
          <TotalRow>
            <span>총 결제 금액</span>
            <span>{calculateTotal().toLocaleString()}원</span>
          </TotalRow>

          <ShippingForm onSubmit={handleOrder}>
            <FormGroup>
              <FormLabel>수령인</FormLabel>
              <Input
                type="text"
                name="recipient"
                value={shippingInfo.recipient}
                onChange={handleShippingInfoChange}
                placeholder="수령인 이름"
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>연락처</FormLabel>
              <Input
                type="tel"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleShippingInfoChange}
                placeholder="010-0000-0000"
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>기본주소</FormLabel>
              <Input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingInfoChange}
                placeholder="기본주소"
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>상세주소</FormLabel>
              <Input
                type="text"
                name="detailAddress"
                value={shippingInfo.detailAddress}
                onChange={handleShippingInfoChange}
                placeholder="상세주소"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>결제 수단</FormLabel>
              <PaymentMethodSelect>
                <PaymentMethodOption>
                  <input
                    type="radio"
                    id="credit_card"
                    name="paymentMethod"
                    value="credit_card"
                    checked={paymentMethod === 'credit_card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="credit_card">신용카드</label>
                </PaymentMethodOption>
                <PaymentMethodOption>
                  <input
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="cash">현금</label>
                </PaymentMethodOption>
              </PaymentMethodSelect>
            </FormGroup>
            <Button type="submit" disabled={cartItems.length === 0}>
              주문하기
            </Button>
          </ShippingForm>
        </OrderSummary>
      </CartContent>
    </CartContainer>
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

  @media (max-width: 768px) {
    th, td {
      padding: 12px 8px;
      font-size: 14px;
    }

    th:nth-child(4),
    td:nth-child(4) {
      display: none;
    }

    th:first-child,
    td:first-child {
      width: 40%;
    }

    th:nth-child(2),
    td:nth-child(2),
    th:nth-child(3),
    td:nth-child(3) {
      width: 25%;
    }

    th:last-child,
    td:last-child {
      width: 10%;
      text-align: right;
    }
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