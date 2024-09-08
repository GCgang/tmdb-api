import styled from 'styled-components';
import Slider from 'react-slick';
import { sliderSettings } from '../../config/sliderSettings';

export default function SkeletonSlider() {
  return (
    <Slider {...sliderSettings}>
      {[...Array(sliderSettings.slidesToShow)].map((_, index) => (
        <SkeletonCardWrapper key={index}>
          <SkeletonCard />
        </SkeletonCardWrapper>
      ))}
    </Slider>
  );
}

const SkeletonCardWrapper = styled.div`
  width: 100%;
  padding: 0 0.2vw;
  position: relative;
`;

const SkeletonCard = styled.div`
  cursor: pointer;
  width: 100%;
  padding-top: 56.25%;
  background-color: #333;
  position: relative;
  border-radius: 4px;
`;
