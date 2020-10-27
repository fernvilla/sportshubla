import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

type Props = AxiosRequestConfig & {
  trigger?: boolean;
  dependencies?: any;
  debug?: boolean;
};

const useAxios = ({
  method = 'GET',
  url = '',
  data = {},
  trigger = true,
  dependencies = [],
  debug = false
}: Props) => {
  const [response, setResponse] = useState<any>(undefined);
  const [error, setError] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (trigger === false) return;

    fetchData();
  }, [...dependencies, trigger]);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await axios({ method, url, data });

      if (debug) {
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
