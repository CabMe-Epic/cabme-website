
export const getSessionData = (key: string) => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
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