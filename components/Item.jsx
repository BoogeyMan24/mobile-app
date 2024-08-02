import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Item = ({ date, text, type }) => {
  return (
    <View style={styles.container}>
		<MaterialCommunityIcons name={type} size={40} />
		<View style={styles.wrapper}>
			<Text style={styles.date}>{date}</Text>
			<Text style={styles.text}>{text}</Text>
		</View>
	</View>
  );
};

const styles = StyleSheet.create({
	container: {
		width: "60%",
		height: "10rem",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 30,
		marginHorizontal: "auto",
	},
	wrapper: {
		width: "100%",
		height: "10rem",
		display: "flex",
		flexDirection: "column",
		justifyContent: "left",
		marginLeft: 20,
	},
	date: {
		width: "100%",
		textAlign: "center",
	},
	text: {
		fontSize: 20,
	}
})

export default Item;