import { Button, StyleSheet, TextInput, View, ScrollView, SafeAreaView, Pressable, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Item from './Item';
import * as Notifications from 'expo-notifications';
import LocalStorage from './LocalStorage';


export default function HomeScreen() {
	const [text, setText] = useState('');

	const [type, setType] = useState('');

	const [arrayOfItems, setArray] = useState([]);

	async function addItem() {
		if (type == "" || text == "") {
			Alert.alert("Missing input!", "Make sure to type something in the input and select an icon");
		} else {
			let data = { date: new Date().toLocaleDateString(), text: text, type: type };
			setArray([...arrayOfItems, data]);
			setText("");
		}
	}

	useEffect(() => {
		
		async function getData() {
			let data = await LocalStorage.getObject("activity");

			if (data != null) {
				setArray(data);
			}
		}

		getData();
	}, []);

	useEffect(() => {
		async function setData() {
			await LocalStorage.set("activity", arrayOfItems);
		}

		setData();
	}, [arrayOfItems]);

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<View style={styles.blur}></View>
			<ScrollView style={styles.scrollView}>
				<View style={styles.trackerContainer}>
					{arrayOfItems != null || arrayOfItems != [] ? 
						arrayOfItems.map((item, index) => {
						return (
							<Item key={index} date={item.date} text={item.text} type={item.type} />
						);
					}) : null}
				</View>
			</ScrollView>
			<View style={styles.inputContainer}>
				<View style={styles.inputWrapper}>
					<TextInput
						style={styles.input}
						placeholder="What did you do today?"
						onChangeText={newText => setText(newText)}
						defaultValue={text}
					/>
					<View style={styles.iconsContainer}>
						<Pressable onPress={() => setType("account-group")} style={styles.icon}>
							<MaterialCommunityIcons name="account-group" size={40} />
						</Pressable>
						<Pressable onPress={() => setType("briefcase")} style={styles.icon}>
							<MaterialCommunityIcons name="briefcase" size={40} />
						</Pressable>
						<Pressable onPress={() => setType("school")} style={styles.icon}>
							<MaterialCommunityIcons name="school" size={40} />
						</Pressable>
						<Pressable onPress={() => setType("sunglasses")} style={styles.icon}>
							<MaterialCommunityIcons name="sunglasses" size={40} />
						</Pressable>
					</View>
					<Button
						style={styles.submitButton}
						onPress={addItem}
						title="Submit"
						accessibilityLabel="Submit what you did today"
					/>
					<Button
						style={styles.submitButton}
						onPress={schedulePushNotification}
						title="Notification"
						accessibilityLabel="Get a notification"
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}

async function schedulePushNotification() {
	await Notifications.scheduleNotificationAsync({
	  content: {
		title: "Notification!",
		body: 'wow it works...!!',
		data: { data: 'goes here', test: { test1: 'more data' } },
	  },
	  trigger: { seconds: 2 },
	});
}


const styles = StyleSheet.create({
	inputContainer: {
		position: "fixed",
		bottom: 0,
		transform: [{ translateX: 0.5 }],
		backgroundColor: "#f3f4fa",
		display: "flex",
		alignItems: "center",
		width: "100%",
		height: 300,
	},
	input: {
		width: 300,
		height: 60,
		backgroundColor: "white",
		borderRadius: 10,
		paddingHorizontal: 20,
		fontSize: 20,
		margin: 20,
		marginTop: 40,
		borderWidth: 1,
	},
	iconsContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 10
	},
	icon: {
		backgroundColor: "#EAEAEA",
		padding: 4,
		borderRadius: 10,
		borderColor: "#ffffff",
		borderWidth: 1
	},
	safeAreaView: {
		width: "100%",
		height: "100%",
	},
	scrollView: {
		backgroundColor: "#EAEAEA",
		height: 150,
		
	},
	trackerContainer: {
		
	},
});