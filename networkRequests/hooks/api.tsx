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
    return vehicleList
  } catch (error) {
    console.log("Error in getting search vehicle api", error);
  }
}

export const postAadharFront = async (data: any) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/website-aadhar-front`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
}

export const postAadharBack = async (data: any) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/website-aadhar-back`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
}

export const postPanCard = async (data: any) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/website-pan-card`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
}

