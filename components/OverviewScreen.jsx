import { Pressable, StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useState, useEffect } from "react";
import LocalStorage from './LocalStorage';


export default function OverviewScreen() {

	let [familyTotal, setFamilyTotal] = useState(0);
	let [workTotal, setWorkTotal] = useState(0);
	let [schoolTotal, setSchoolTotal] = useState(0);
	let [relaxTotal, setRelaxTotal] = useState(0);

	let [total, setTotal] = useState(0);

	let [reload, setReload] = useState(0);

	async function reset() {
		setFamilyTotal(0);
		setWorkTotal(0);
		setSchoolTotal(0);
		setRelaxTotal(0);
		setTotal(0);
	}

	async function getData() {
		let activities = await LocalStorage.getObject("activity");


		let totals = { total: 0, family: 0, work: 0, school: 0, relax: 0} ;
		for (let activity of activities) {
			if (activity.type == "account-group") {
				totals.family++;
			} else if (activity.type == "briefcase") {
				totals.work++;
			} else if (activity.type == "school") {
				totals.school++;
			} else if (activity.type == "sunglasses") {
				totals.relax++;
			}

			totals.total++;
		}

		setFamilyTotal(totals.family);
		setWorkTotal(totals.work);
		setSchoolTotal(totals.school);
		setRelaxTotal(totals.relax);
		setTotal(totals.total);
	}
	

	async function reloadData() {
		setReload(reload + 1);
	}

	useEffect(() => {
		getData();
	}, [reload]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Overview</Text>

			<Text style={styles.sectionTitle}>Totals</Text>
			<Text style={styles.sectionText}>Family: {familyTotal}</Text>
			<Text style={styles.sectionText}>Work: {workTotal}</Text>
			<Text style={styles.sectionText}>School: {schoolTotal}</Text>
			<Text style={styles.sectionText}>Relax: {relaxTotal}</Text>

			<Text style={styles.sectionTitle}>Percentages</Text>
			<Text style={styles.sectionText}>Family: {(familyTotal / (total == 0 ? 1 : total) * 100).toFixed(1)}%</Text>
			<Text style={styles.sectionText}>Work: {(workTotal / (total == 0 ? 1 : total) * 100).toFixed(1)}%</Text>
			<Text style={styles.sectionText}>School: {(schoolTotal / (total == 0 ? 1 : total) * 100).toFixed(1)}%</Text>
			<Text style={styles.sectionText}>Relax: {(relaxTotal / (total == 0 ? 1 : total) * 100).toFixed(1)}%</Text>
			<Button
				title="Reload"
				onPress={reloadData}
			/>
		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		width: "80%",
		marginHorizontal: "auto",
		display: "flex",
		justifyContent: "center",
		marginTop: 75,
		textAlign: "center"
	},
	title: {
		fontSize: 30,
		fontWeight: "700",
		textAlign: "center"
	},
	sectionTitle: {
		marginTop: 25,
		fontSize: 25,
		fontWeight: "600"
	},
	sectionText: {
		fontSize: 20,
	}
});