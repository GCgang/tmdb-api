import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
interface IFormInput {
  searchQuery: string;
}

export default function Header() {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const handleClick = () => {
    return;
  };
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    navigate(`/home/${data.searchQuery}`);
    reset();
  };
  return (
    <header>
      <div>
        <Link to={'/'}>
          <button>Logo</button>
        </Link>
        <nav>
          <Link to="/home">Home</Link>
        </nav>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="search..." {...register('searchQuery')} />
        <button onClick={handleClick}>Search</button>
      </form>
    </header>
  );
}
