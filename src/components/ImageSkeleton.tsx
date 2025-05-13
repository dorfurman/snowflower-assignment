import { useState } from "react";
import styled from "styled-components";

const ImageSkeletonView = styled.div`
  min-width: 300px;
  min-height: 300px;
`;

const Skeleton = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #eee;
  animation: shimmer 2.5s infinite linear;
  background: linear-gradient(to right, #f6f6f6 0%, #e0e0e0 50%, #f6f6f6 100%);
  background-size: 200% 100%;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

interface Props {
  src: string;
  alt: string;
}

export const ImageSkeleton = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ImageSkeletonView>
      {isLoading && <Skeleton />}
      <Image src={props.src} alt={props.alt} onLoad={() => setIsLoading(false)} />
    </ImageSkeletonView>
  );
};
