import { styled } from 'styled-components';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <Wrapper>
      <SocialLinks>
        <SocialLink>
          <a href='https://www.facebook.com/NetflixKR' target='_blank'>
            <FaFacebookF />
          </a>
        </SocialLink>
        <SocialLink>
          <a href='https://www.instagram.com/netflixkr/' target='_blank'>
            <FaInstagram />
          </a>
        </SocialLink>
        <SocialLink>
          <a href='https://twitter.com/netflixkr' target='_blank'>
            <FaTwitter />
          </a>
        </SocialLink>
        <SocialLink>
          <a
            href='https://www.youtube.com/channel/UCiEEF51uRAeZeCo8CJFhGWw/featured'
            target='_blank'
          >
            <FaYoutube />
          </a>
        </SocialLink>
      </SocialLinks>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  width: 100%;
  padding: 60px;

  @media (max-width: 1024px) {
    padding: 0 40px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

const SocialLinks = styled.ul`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const SocialLink = styled.li`
  color: #fff;
  cursor: pointer;
  font-size: 2rem;

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;
