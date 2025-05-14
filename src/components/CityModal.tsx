import { styled } from "styled-components";
import { MainContext } from "../context/MainContext";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { OpenMeteoDailyForecast } from "../types/types";
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
`;

const DayTemp = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #000000;
  z-index: 1;
`;

const DayName = styled.p`
  font-size: 14px;
  margin: 0;
  color: #000000;
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

export const CityModal = () => {
  const { chosenCity, setChosenCity, units } = useContext(MainContext);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const temperatureUnitParam = units === "℉" ? "fahrenheit" : "celsius";

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setChosenCity(null);
    }
  };

  const { data, isLoading, isError } = useQuery<OpenMeteoDailyForecast>({
    queryKey: ["city-forecast-query", chosenCity?.name, temperatureUnitParam],
    queryFn: () => {
      const isMockData = false;
      if (isMockData) {
        return new Promise<OpenMeteoDailyForecast>((resolve) => {
          setTimeout(() => resolve(mockWeatherData), 500);
        });
      } else {
        const lat = chosenCity?.coords.lat;
        const lon = chosenCity?.coords.lng;
        const timezone = "auto";
        return fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,wind_speed_10m_max,wind_gusts_10m_max,uv_index_max,cloudcover_mean&temperature_unit=${temperatureUnitParam}&timezone=${timezone}`
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
              {data?.daily.time.map((date: string, index: number) => (
                <DayCard
                  key={`${date}-${index}`}
                  isSelected={index === selectedDayIndex}
                  weatherType={data.daily.weathercode[index]?.toString() || ""}
                  temp={data.daily.temperature_2m_max[index]}
                  units={units}
                  onClick={() => setSelectedDayIndex(index)}
                >
                  <DayTemp>
                    {Math.round(data.daily.temperature_2m_max[index])}
                    {units}
                  </DayTemp>
                  <DayName>{formatDay(new Date(date).getTime() / 1000)}</DayName>
                </DayCard>
              ))}
            </DaysContainer>

            {data?.daily.time[selectedDayIndex] && (
              <WeatherDetailsContainer>
                <WeatherDetailRow>
                  <WeatherDetailLabel>Weather Code</WeatherDetailLabel>
                  <WeatherDetailValue>
                    {data.daily.weathercode[selectedDayIndex]}
                  </WeatherDetailValue>
                </WeatherDetailRow>
                <WeatherDetailRow>
                  <WeatherDetailLabel>Temperature Range</WeatherDetailLabel>
                  <WeatherDetailValue>
                    {Math.round(data.daily.temperature_2m_min[selectedDayIndex])}
                    {units} - {Math.round(data.daily.temperature_2m_max[selectedDayIndex])}
                    {units}
                  </WeatherDetailValue>
                </WeatherDetailRow>
                <WeatherDetailRow>
                  <WeatherDetailLabel>Precipitation</WeatherDetailLabel>
                  <WeatherDetailValue>
                    {data.daily.precipitation_sum[selectedDayIndex]} mm
                  </WeatherDetailValue>
                </WeatherDetailRow>
                <WeatherDetailRow>
                  <WeatherDetailLabel>Wind Speed (max)</WeatherDetailLabel>
                  <WeatherDetailValue>
                    {data.daily.wind_speed_10m_max[selectedDayIndex]} m/s
                  </WeatherDetailValue>
                </WeatherDetailRow>
                <WeatherDetailRow>
                  <WeatherDetailLabel>Wind Gusts (max)</WeatherDetailLabel>
                  <WeatherDetailValue>
                    {data.daily.wind_gusts_10m_max[selectedDayIndex]} m/s
                  </WeatherDetailValue>
                </WeatherDetailRow>
                <WeatherDetailRow>
                  <WeatherDetailLabel>Cloud Cover (mean)</WeatherDetailLabel>
                  <WeatherDetailValue>
                    {data.daily.cloudcover_mean[selectedDayIndex]}%
                  </WeatherDetailValue>
                </WeatherDetailRow>
                <WeatherDetailRow>
                  <WeatherDetailLabel>UV Index (max)</WeatherDetailLabel>
                  <WeatherDetailValue>
                    {data.daily.uv_index_max[selectedDayIndex]}
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