import { Link } from 'react-router-dom';

export default function TopRate() {
  return (
    <div>
      <h1>길을 잃으셨나요 ?</h1>
      <p>
        죄송합니다. 해당 페이지를 찾을 수 없습니다. 홈페이지로 이동해 다양한
        콘텐츠를 만나보세요.
      </p>
      <Link to={'/'}>
        <button>홈으로</button>
      </Link>
    </div>
  );
}
