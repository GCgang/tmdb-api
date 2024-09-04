import useMyWishList from '../hooks/useMyWishList';
import { IoIosAddCircle } from 'react-icons/io';
import { FaCheckCircle } from 'react-icons/fa';

export default function WishListButton({ id }: { id: number }) {
  const { isNewItem, addItem, removeItem } = useMyWishList();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isNewItem(id)) {
      addItem(id);
    } else {
      removeItem(id);
    }
  };
  return (
    <>
      {isNewItem(id) ? (
        <IoIosAddCircle onClick={handleClick} />
      ) : (
        <FaCheckCircle onClick={handleClick} />
      )}
    </>
  );
}
