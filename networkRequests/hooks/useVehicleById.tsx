import { useState, useEffect } from 'react';
import axios from 'axios';
import "../types/type";

const useVehicle = (vehicleId: string | number): { vehicle: Vehicle | null, loading: boolean, error: Error | null } => {
  const [vehicle, setVehicle] = useState<Vehicle | any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | any>(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get<Vehicle>(`https://cabmeapi.epicglobal.co.in/api/cabme/vehicle/${vehicleId}`);
        setVehicle(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [vehicleId]);

  return { vehicle, loading, error };
};

export default useVehicle;
