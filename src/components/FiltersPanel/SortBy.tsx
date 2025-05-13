import { styled } from "styled-components";
import { MainContext } from "../../context/MainContext";
import { useContext, useState } from "react";
import { Button, Separator } from "./CommonComponents";

const SortByView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const SortBy = () => {
  const { sortBy, setSortBy, setUserLocation } = useContext(MainContext);
  const [error, setError] = useState<string | null>(null);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);

  const handleDistanceSort = () => {
    console.log("Distance button clicked");
    setError(null);
    setIsRequestingLocation(true);

    if (navigator.geolocation) {
      console.log("Geolocation is supported");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Got position:", position);
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setSortBy("distance");
          setIsRequestingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsRequestingLocation(false);
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              setError("Location access was denied. Please enable location services in your browser settings.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable. Please try again.");
              break;
            case error.TIMEOUT:
              setError("Location request timed out. Please try again.");
              break;
            default:
              setError("An unknown error occurred while getting your location.");
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      console.log("Geolocation is not supported");
      setError("Geolocation is not supported by your browser");
      setIsRequestingLocation(false);
    }
  };

  return (
    <SortByView>
      <h3>Sort By</h3>
      <Row>
        <Button 
          onClick={() => {
            setError(null);
            setSortBy("name");
          }} 
          active={sortBy === "name"}
        >
          Name
        </Button>
        <Separator />
        <Button 
          onClick={handleDistanceSort} 
          active={sortBy === "distance"}
          disabled={isRequestingLocation}
        >
          {isRequestingLocation ? "Getting Location..." : "Distance"}
        </Button>
      </Row>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SortByView>
  );
};
