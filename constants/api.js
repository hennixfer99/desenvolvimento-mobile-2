import Constants from "expo-constants";
import { Platform } from "react-native";

const DEV_PORT = 3001;

const getBaseUrl = () => {
    const hostUri = Constants.expoConfig?.hostUri;
    if (hostUri) {
        const host = hostUri.split(":")[0];
        return `http://${host}:${DEV_PORT}`;
    }
    if (Platform.OS === "android") {
        return `http://10.0.2.2:${DEV_PORT}`;
    }
    return `http://localhost:${DEV_PORT}`;
};

export const API_BASE = getBaseUrl();
