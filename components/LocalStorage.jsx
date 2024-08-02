import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ocalStorage {
	static async set(key, value) {
		try {
			if (typeof value == typeof "") {
				await AsyncStorage.setItem(key, value);
			} else {
				const jsonValue = JSON.stringify(value);
				await AsyncStorage.setItem(key, jsonValue);
			}
			
		} catch (e) {
			console.log("failed to store value\nkey - value\n", key, value, e);
		}
	}

	static async get(key) {
		try {
			const value = await AsyncStorage.getItem(key);
			if (value !== null) {
				return value;
			}
		} catch (e) {
			console.log("failed to get\nkey - value\n", key, e);
		}
	}

	static async getObject(key) {
		try {
			const jsonValue = await AsyncStorage.getItem(key);
			return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch (e) {
			console.log("failed to get\nkey - value\n", key, e);
		}
	}
}