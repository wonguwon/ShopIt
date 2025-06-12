import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../api/orders';
import useUserStore from '../store/userStore';
import { Button } from '../styles/common/Button';

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 64px);
  background-color: ${props => props.theme.colors.gray[50]};
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.gray[800]};
  font-weight: 600;
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
`;

const OrderNumber = styled.h2`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.gray[800]};
  font-weight: 600;
`;

const OrderDate = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[600]};
  margin-top: 0.5rem;
`;

const OrderStatus = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${props => {
    switch (props.status) {
      case '주문완료':
        return '#dcfce7';
      case '배송중':
        return '#dbeafe';
      case '배송완료':
        return '#e9d5ff';
      default:
        return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case '주문완료':
        return '#15803d';
      case '배송중':
        return '#1d4ed8';
      case '배송완료':
        return '#7e22ce';
      default:
        return '#374151';
    }
  }};
`;

const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const OrderItem = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.gray[50]};
  border-radius: 8px;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ItemName = styled.h3`
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const ItemPrice = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: 0.25rem;
`;

const ItemQuantity = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[600]};
`;

const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
`;

const PaymentMethod = styled.div`
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.gray[700]};
`;

const TotalAmount = styled.div`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 600;
  color: ${props => props.theme.colors.gray[800]};
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const EmptyText = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.lg};
  margin-bottom: 1.5rem;
`;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const data = await orderService.getOrders(user.email);
      setOrders(data);
    } catch (error) {
      console.error('주문 내역 로딩 실패:', error);
      alert('주문 내역을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container>
        <ContentWrapper>
          <div>로딩 중...</div>
        </ContentWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Title>주문 내역</Title>
        </Header>
        <OrderList>
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard key={order.id}>
                <OrderHeader>
                  <div>
                    <OrderNumber>{order.orderNumber}</OrderNumber>
                    <OrderDate>{formatDate(order.orderDate)}</OrderDate>
                  </div>
                  <OrderStatus status={order.orderStatus}>{order.orderStatus}</OrderStatus>
                </OrderHeader>
                <OrderItems>
                  {order.orderItems.map((item, index) => (
                    <OrderItem key={index}>
                      <ItemImage src={item.image} alt={item.name} />
                      <ItemInfo>
                        <ItemName>{item.name}</ItemName>
                        <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
                        <ItemQuantity>수량: {item.quantity}개</ItemQuantity>
                      </ItemInfo>
                    </OrderItem>
                  ))}
                </OrderItems>
                <OrderFooter>
                  <PaymentMethod>
                    결제방법: {order.paymentMethod === 'credit_card' ? '신용카드' : '현금'}
                  </PaymentMethod>
                  <TotalAmount>
                    총 결제금액: {order.orderSummary?.totalAmount?.toLocaleString() || 0}원
                  </TotalAmount>
                </OrderFooter>
              </OrderCard>
            ))
          ) : (
            <EmptyMessage>
              <EmptyText>주문 내역이 없습니다.</EmptyText>
              <Button onClick={() => navigate('/products')}>
                상품 보러가기
              </Button>
            </EmptyMessage>
          )}
        </OrderList>
      </ContentWrapper>
    </Container>
  );
};

export default Orders; 