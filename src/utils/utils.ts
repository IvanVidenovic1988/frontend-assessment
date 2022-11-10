import { EventStatus } from "../pages/Events/Types";

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

type RequestParams = {
  method: RequestMethod;
  token?: string;
  body?: string | FormData;
};

export function getRequestConfig ({method, token, body}: RequestParams) {
    return {
      method,
      headers: new Headers({
          'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      }),
      ...(body ? { body } : {}),
    };
  }



export const storeInBrowserStorage = (key: string, item: string) => {
    localStorage.setItem(key, item);
  };
  
export const getValueForKeyInBrowserStorage = (key: string) => {
    const item = localStorage.getItem(key);
  
    return item ? item : null;
  };
  
export const removeFromBrowserStorage = (key: string) => {
    localStorage.removeItem(key);
  };

export const getStatusColor = (status: EventStatus) => {
    switch (status) {
        case "requested":
            return "blue"
        case "registered":
            return "green"
        case "approved":
            return "purple"       
        case "declined":
            return "red"
    }
}