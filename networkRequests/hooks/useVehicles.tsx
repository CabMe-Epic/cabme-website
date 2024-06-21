import { useState, useEffect } from 'react';
import axios from 'axios';
import "../types/type";


const useVehicles = (): UseVehiclesResult => {
  const [vehicles, setVehicles] = useState<Vehicle[] >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | any>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get<Vehicle[] | any>('https://cabmeapi.epicglobal.co.in/api/cabme/vehicles');
        setVehicles(response.data);
        setLoading(false);
      } catch (err) {
        setError(err as any);
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return { vehicles, loading, error };
};

export default useVehicles;
