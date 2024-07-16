
export const getSessionData = (key: string) => {
  const data = sessionStorage.getItem(key);
  if (!data) {
    return null;
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error parsing JSON from sessionStorage for key "${key}":`, error);
    return null;
  }
};


export const setSessionData = (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export const removeSessionData = (key: string) => {
    sessionStorage.removeItem(key);
};

export const getSessionId = (key: string) => {
    const data = getSessionData(key);
    return data ? data._id : null;
};