import { useState, useEffect } from 'react';
import axios from 'axios';
import "../types/type";

const useVehicle = (vehicleId: string | number): { vehicle: any | null, loading: boolean, error: Error | null } => {
  const [vehicle, setVehicle] = useState<any | any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | any>(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get<any>(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/vehicle/${vehicleId}`);
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
