import { styled } from "styled-components";
import { Button, Separator } from "./CommonComponents";
import { MainContext } from "../../context/MainContext";
import { useContext } from "react";

const UnitsView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Units = () => {
  const { units, setUnits } = useContext(MainContext);

  return (
    <UnitsView>
      <h3>Units</h3>
      <Row>
        <Button onClick={() => setUnits("℃")} active={units === "℃"}>
          ℃
        </Button>
        <Separator />
        <Button onClick={() => setUnits("℉")} active={units === "℉"}>
          ℉
        </Button>
      </Row>
    </UnitsView>
  );
};
