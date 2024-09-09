import { useState, useEffect } from 'react';
import axios from 'axios';
import "../types/type";


const useVehicles = (): any => {
  const [vehicles, setVehicles] = useState<any[] >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | any>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      console.log('URI_BASE:', process.env.NEXT_PUBLIC_URI_BASE);

      try {
        const response = await axios.get<any[] | any>(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/vehicles`);
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
