import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsSearch } from 'react-icons/bs';

interface IFormInput {
  searchQuery: string;
}

const Form = styled.form`
  position: relative;
  color: white;
  display: flex;
  align-items: center;
`;

const SearchInput = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
  outline: none;
  width: 240px;
  height: 36px;
`;

const SearchButton = styled.button.attrs({ type: 'button' })`
  color: white;
  background: none;
  border: none;
  font-size: 20px;
`;

export default function SearchForm() {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);
  const { keyword } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IFormInput>({
    defaultValues: { searchQuery: keyword || '' },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    navigate(`/search/${data.searchQuery.trim()}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  useEffect(() => {
    setValue('searchQuery', keyword || '');
  }, [keyword, setValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} ref={searchRef}>
      <SearchInput
        placeholder='search...'
        {...register('searchQuery')}
        transition={{ type: 'linear' }}
        animate={{ scaleX: searchOpen ? 1 : 0 }}
      />
      <SearchButton>
        <BsSearch onClick={() => setSearchOpen((prev) => !prev)} />
      </SearchButton>
    </Form>
  );
}
