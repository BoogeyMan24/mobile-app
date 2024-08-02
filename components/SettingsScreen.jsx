import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import LocalStorage from './LocalStorage';

export default function SettingsScreen() {
	async function confimation() {
		Alert.alert("Are you sure?", "If you proceed all your data will be permanently deleted", [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{
				text: 'Proceed', 
				onPress: () => clearData()
			},
		]);
	}

	async function clearData() {
		await LocalStorage.set("activity", []);
		Alert.alert("Your data has been deleted!", "Restart the app to view your changes.");
	}


	return (
		<View style={styles.container}>
			<Text style={styles.title}>Settings</Text>
			<Button
				onPress={confimation}
				title="Clear All Data"
				accessibilityLabel="Submit what you did today"
			/>
		</View>
	);
}



const styles = StyleSheet.create({
	container: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
		marginTop: 75,
		textAlign: "center"
	},
	title: {
		fontSize: 30,
		fontWeight: "700",
		textAlign: "center"
	}
});