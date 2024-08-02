import NavBar from './components/NavBar';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { View, Button, Platform } from 'react-native';
import { useState, useEffect, useRef } from "react";

Notifications.setNotificationHandler({
	handleNotiction: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

export default function App() {
	const [expoPushToken, setExpoPushToken] = useState('');
	const [channels, setChannels] = useState([]);
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));
		if (Platform.OS == "android") {
			Notification.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
		}

		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
			console.log(response);
		});

		return () => {
			notificationListener.current && 
				Notifications.removeNotificationSubscription(notificationListener.current);

			responseListener.current && 
				Notifications.removeNotificationSubscription(responseListener.current);			
		};
	}, []);

	return (
		<NavBar />
	);
}

async function registerForPushNotificationsAsync() {
	let token;

	if (Platform.OS == "android") {
		await Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}


	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification");
			return;
		}
	} else {
		alert("Must be physical device for push notifications");
	}

	return token;
}