export interface City {
  name: string;
  country: string;
  continent: string;
  active: boolean;
  description: string;
  image: string;
    coords: {
      lat: number;
      lng: number;
    };
}

export interface CitiesData {
  cities: City[];
}
