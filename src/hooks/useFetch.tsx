import {useEffect, useReducer} from 'react';

interface State<T> {
  data?: T;
  error?: Error;
}

type Action<T> =
  | {type: 'loading'}
  | {type: 'fetched'; payload: T}
  | {type: 'error'; payload: Error};

export function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit,
): State<T> {
  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return {...initialState};
      case 'fetched':
        return {...initialState, data: action.payload};
      case 'error':
        return {...initialState, error: action.payload};
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return;

    const fetchData = async () => {
      dispatch({type: 'loading'});

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;
        console.log('kdata', data);
        dispatch({type: 'fetched', payload: data});
      } catch (error) {
        dispatch({type: 'error', payload: error as Error});
      }
    };

    void fetchData();
  }, [url, options]);
  console.log(state, 'state');
  return state;
}
