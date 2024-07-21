import { useParams } from 'react-router-dom';
import SearchResults from './SearchResults';

export default function Home() {
  const { keyword } = useParams();

  return <div>{keyword ? <SearchResults /> : <></>}</div>;
}
