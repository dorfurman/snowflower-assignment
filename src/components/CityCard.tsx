import styled from "styled-components";
import { City } from "../types/types";
import { ImageSkeleton } from "./ImageSkeleton";

const CityCardView = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
`;

const Content = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
`;

const OverlayText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8));
  z-index: 0;
`;

const H2 = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  color: #fff;
  z-index: 1;
`;

const H3 = styled.h3`
  font-size: 2rem;
  font-weight: 400;
  color: #fff;
  z-index: 1;
`;

const P = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  color: #fff;
  margin-top: 1rem;
  z-index: 1;

  // Clamp the text to 4 lines
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
`;

interface Props {
  city: City;
}

export const CityCard = (props: Props) => {
  return (
    <CityCardView>
      <ImageSkeleton src={props.city.image} alt={props.city.name} />
      <Content>
        <OverlayText />
        <H2>{props.city.name}</H2>
        <H3>{props.city.country}</H3>
        <P>{props.city.description}</P>
      </Content>
    </CityCardView>
  );
};
