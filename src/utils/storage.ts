export const getValue = <Type>(key: string): Type => {
    return localStorage.getItem(key) as Type;
};

export const setValue = <Type>(key: string, value: Type) => {
    localStorage.setItem(key, value as string);
};
