import AsyncStorage from "@react-native-async-storage/async-storage";

export const getValue = async <Type>(key: string): Promise<Type> => {
    const tmp = (await AsyncStorage.getItem(key)) as Type;
    return tmp;
};

export const setValue = async <Type>(key: string, value: Type) => {
    await AsyncStorage.setItem(key, String(value));
};
