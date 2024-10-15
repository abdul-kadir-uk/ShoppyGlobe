import { useState, useEffect } from 'react';

// custom hook to fetch data from api 
const useFetchProducts = (url) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // use useeffect to fetch data whenever url change 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch data from url 
        const response = await fetch(url);
        // if response is not successful 
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        // parse the response data as json 
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        // when fetch completed then loading ended 
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchProducts;
