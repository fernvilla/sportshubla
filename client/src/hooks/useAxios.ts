import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

type Props = AxiosRequestConfig & {
  trigger?: boolean;
  dependency?: any;
};

const useAxios = ({
  method = 'GET',
  url = '',
  data = {},
  trigger = true,
  dependency = null
}: Props) => {
  const [response, setResponse] = useState<any>(undefined);
  const [error, setError] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (trigger === false) return;

    fetchData();
  }, [dependency, trigger]);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await axios({ method, url, data });

      if (process.env.NODE_ENV === 'development') {
        console.log('fetched', url, res.data);
      }

      setResponse(res.data.payload);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  return { response, error, isLoading, refetch: fetchData };
};

export default useAxios;
