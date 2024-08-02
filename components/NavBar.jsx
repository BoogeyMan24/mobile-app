import { MaterialCommunityIcons } from '@expo/vector-icons';
import OverviewScreen from './OverviewScreen';
import SettingsScreen from './SettingsScreen';
import HomeScreen from './HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native-web';


const Tab = createBottomTabNavigator();

export default function NavBar() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen 
					name="Home" 
					component={HomeScreen} 
					options={{
						title: 'Home',
						headerShown: false,

						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="home" color={color} size={size} />
						),
					}}
				/>
				<Tab.Screen 
					name="Overview" 
					component={OverviewScreen}
					options={{
						title: 'Overview',
						headerShown: false,

						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="calendar" color={color} size={size} />
						),
					}}
				/>
				<Tab.Screen 
					name="Settings" 
					component={SettingsScreen}
					options={{
						title: 'Settings',
						headerShown: false,

						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="cog" color={color} size={size} />
						),
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}


const styles = StyleSheet.create({
	navBar: {
		display: "flex",
		position: "fixed",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		bottom: "0",
		width: "100vw",
		height: "10rem"
	},
	navPressable: {
		
	},
});