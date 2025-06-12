import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

export const SearchBar = ({ value, onChange, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <SearchContainer as="form" onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        placeholder="검색어를 입력하세요"
        value={value}
        onChange={onChange}
      />
      <SearchButton type="submit">
        <FaSearch />
      </SearchButton>
    </SearchContainer>
  );
}; 

const SearchContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;