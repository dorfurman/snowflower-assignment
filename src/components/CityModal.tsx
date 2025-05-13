import { styled } from "styled-components";
import { MainContext } from "../context/MainContext";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherData } from "../types/types";
import { mockWeatherData } from "../mock/cityForecastMock";
import { CloseIcon } from "../assets/svgs/CloseIcon";
import { LoadingSpinner } from "../assets/svgs/LoadingSpinner";
import rainyWeather from "../assets/images/rainy-weather.png";
import coldWeather from "../assets/images/cold-weather.png";
import sunnyWeather from "../assets/images/sunny-weather.png";

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
`;

const CityModalView = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 2;
`;

const WeatherForecastView = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 600px;
  width: 750px;
  transform: translate(-50%, -50%);
  background-color: #ffffffe9;
  border-radius: 10px;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const Separator = styled.div`
  height: 1px;
  background-color: #bfbfbf;
  margin: 1rem 0;
`;

const ForecastContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

const DaysContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 0;
  scrollbar-width: thin;
  min-height: 120px;
  max-height: 140px;
  flex: 1;
`;

const DayCard = styled.div<{
  isSelected: boolean;
  weatherType: string;
  temp: number;
  units: "℃" | "℉";
}>`
  position: relative;
  min-width: 120px;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 8px solid ${(props) => (props.isSelected ? "#007bff" : "transparent")};
  background-image: ${(props) => {
    const weather = props.weatherType.toLowerCase();
    const temp = props.temp;
    const isCold = props.units === "℃" ? temp < 15 : temp < 59; // 15°C = 59°F
    if (isCold) {
      if (weather.includes("rain") || weather.includes("drizzle")) {
        return `url(${rainyWeather})`;
      }
      return `url(${coldWeather})`;
    }
    return `url(${sunnyWeather})`;
  }};
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.081);
    z-index: 1;
  }
`;

const DayTemp = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #ffffff;
  z-index: 1;
`;

const DayName = styled.p`
  font-size: 14px;
  margin: 0;
  color: #ffffff;
  z-index: 1;
`;

const WeatherDetailsContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
`;

const WeatherDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

const WeatherDetailLabel = styled.span`
  color: #666;
`;

const WeatherDetailValue = styled.span`
  font-weight: 500;
`;

const convertKelvinToUnit = (kelvin: number, unit: "℃" | "℉"): number => {
  const celsius = kelvin - 273.15;
  if (unit === "℉") {
    return (celsius * 9/5) + 32;
  }
  return celsius;
};

export const CityModal = () => {
  const { chosenCity, setChosenCity, units } = useContext(MainContext);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setChosenCity(null);
    }
  };

  const { data, isLoading, isError } = useQuery<WeatherData>({
    queryKey: ["city-forecast-query", chosenCity?.name],
    queryFn: () => {
      const isMockData = true;
      if (isMockData) {
        return new Promise<WeatherData>((resolve) => {
          setTimeout(() => resolve(mockWeatherData), 500);
        });
      } else {
        return fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${chosenCity?.coords.lat}&lon=${chosenCity?.coords.lng}&&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
        ).then((res) => res.json());
      }
    },
  });

  const formatDay = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
    });
  };

  return (
    <CityModalView onClick={handleBackdropClick}>
      {isLoading && (
        <SpinnerWrapper>
          <LoadingSpinner />
        </SpinnerWrapper>
      )}
      {isError && <h1>Error</h1>}
      {data && (
        <WeatherForecastView>
          <Header>
            <h3>{`${chosenCity?.name}, ${chosenCity?.country}`}</h3>
            <button
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
              onClick={() => setChosenCity(null)}
            >
              <CloseIcon />
            </button>
          </Header>
          <Separator />

          <ForecastContainer>
            <DaysContainer>
              {data?.daily.map((day, index) => (
                <DayCard
                  key={`${day.dt}-${index}`}
                  isSelected={index === selectedDayIndex}
                  weatherType={day.weather[0]?.description || ""}
                  temp={convertKelvinToUnit(day.temp.day, units)}
                  units={units}
                  onClick={() => setSelectedDayIndex(index)}
                >
                  <DayTemp>{Math.round(convertKelvinToUnit(day.temp.day, units))}{units}</DayTemp>
                  <DayName>{formatDay(day.dt)}</DayName>
                </DayCard>
              ))}
            </DaysContainer>

            {data?.daily[selectedDayIndex] && (
              <WeatherDetailsContainer>
                <WeatherDetailRow>
                  <WeatherDetailLabel>Weather</WeatherDetailLabel>
                  <WeatherDetailValue>
                    {data.daily[selectedDayIndex].weather[0]?.description}
                  </WeatherDetailValue>
                </WeatherDetailRow>
                <WeatherDetailRow>
                  <WeatherDetailLabel>Temperature Range</WeatherDetailLabel>
                  <WeatherDetailValue>
                    {Math.round(convertKelvinToUnit(data.daily[selectedDayIndex].temp.min, units))}
                    {units} -{" "}
                    {Math.round(convertKelvinToUnit(data.daily[selectedDayIndex].temp.max, units))}
                    {units}
                  </WeatherDetailValue>
                </WeatherDetailRow>
                <WeatherDetailRow>
                  <WeatherDetailLabel>Feels Like</WeatherDetailLabel>
                  <WeatherDetailValue>
                    {Math.round(
                      convertKelvinToUnit(data.daily[selectedDayIndex].feels_like.day, units)
                    )}
                    {units}
                  </WeatherDetailValue>
                </WeatherDetailRow>
                <WeatherDetailRow>
                  <WeatherDetailLabel>Humidity</WeatherDetailLabel>
                  <WeatherDetailValue>
                    {data.daily[selectedDayIndex].humidity}%
                  </WeatherDetailValue>
                </WeatherDetailRow>
                <WeatherDetailRow>
                  <WeatherDetailLabel>Wind Speed</WeatherDetailLabel>
                  <WeatherDetailValue>
                    {data.daily[selectedDayIndex].wind_speed} m/s
                  </WeatherDetailValue>
                </WeatherDetailRow>
                <WeatherDetailRow>
                  <WeatherDetailLabel>Cloud Coverage</WeatherDetailLabel>
                  <WeatherDetailValue>
                    {data.daily[selectedDayIndex].clouds}%
                  </WeatherDetailValue>
                </WeatherDetailRow>
                <WeatherDetailRow>
                  <WeatherDetailLabel>UV Index</WeatherDetailLabel>
                  <WeatherDetailValue>
                    {data.daily[selectedDayIndex].uvi}
                  </WeatherDetailValue>
                </WeatherDetailRow>
                <WeatherDetailRow>
                  <WeatherDetailLabel>Precipitation Chance</WeatherDetailLabel>
                  <WeatherDetailValue>
                    {Math.round(data.daily[selectedDayIndex].pop * 100)}%
                  </WeatherDetailValue>
                </WeatherDetailRow>
              </WeatherDetailsContainer>
            )}
          </ForecastContainer>
        </WeatherForecastView>
      )}
    </CityModalView>
  );
};
