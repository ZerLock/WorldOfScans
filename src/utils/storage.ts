export const getValue = <Type>(key: string): Type => {
  return localStorage.getItem(key) as Type;
};

export const setValue = <Type>(key: string, value: Type) => {
  localStorage.setItem(key, value as string);
};

export const saveArray = <Type>(key: string, value: Type[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getArray = <Type>(key: string): Type[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};
