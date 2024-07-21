import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { RiNetflixFill } from 'react-icons/ri';

interface IFormInput {
  searchQuery: string;
}

export default function Header() {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    navigate(`/home/${data.searchQuery}`);
    reset();
  };
  return (
    <header>
      <div>
        <Link to={'/'}>
          <RiNetflixFill />
        </Link>
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/toprate">TopRate</Link>
          <Link to="/popular">Popular</Link>
          <Link to="/upcomming">UpCommming</Link>
          <Link to="/nowplaying">NowPlaying</Link>
        </nav>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="search..." {...register('searchQuery')} />
        <button>
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
