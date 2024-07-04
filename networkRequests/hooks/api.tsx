import axios from "axios";

export const getAllCities = async () => {
  try {
    const citiesResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/cities`
    );
    return citiesResponse
  } catch (error) {
    console.log("Error in getting cities:", { error });
  }
};


export const searchVehicle = async () => {
  try {
    const vehicleList = await axios.get(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/vehicle-search`)
    console.log(vehicleList, "vehicle list");
    return vehicleList
  } catch (error) {
    console.log("Error in getting search vehicle api", error);
  }
}

