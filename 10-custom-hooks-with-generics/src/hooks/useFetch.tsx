import axios from 'axios';
import { useState, useEffect } from 'react'



function useFetch<T>(url: string): [ data: T | null, isLoading: boolean, error: Error | null ] {

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    (
      async () => {
        setError(null);
        setIsLoading(true);
        try {
          const res = await axios.get(url, {
            signal: abortController.signal
          })
          setData(res.data)
        } catch (error: unknown) {
          if (axios.isCancel(error)) {
            console.log("cancelled")
          } else {
            setError(error as Error)
            setIsLoading(false)
          }
        }
        setIsLoading(false)
      }
    )()
    //cleanup fn
    return () => abortController.abort();
  }, [url])

  return [ data, isLoading, error];
}

export default useFetch
