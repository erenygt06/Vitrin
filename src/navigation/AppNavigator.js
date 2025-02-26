import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Profil from "../screens/Profil";
import AddSection from "../screens/AddSection";
import SectionCreate from "../screens/SectionCreate";
import WalletScreen from "../screens/WalletScreen";
import Vitrin from "../screens/Vitrin";
import CreatingCollection from "../screens/CreatingCollection";
import LandingPage from "../screens/LandingPage";
import Login from "../screens/Login"; // 📌 LandingPage import edildi
import TabBar from "../components/TabBar"; 
import Apply from "../screens/Apply";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfilStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfilHome" component={Profil} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 📌 LandingPage ilk açılacak sayfa olacak */}
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Apply" component={Apply} />
      <Stack.Screen name="Vitrin" component={Vitrin} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="AddSection" component={AddSection} />
      <Stack.Screen name="SectionCreate" component={SectionCreate} />
      <Stack.Screen name="CreatingCollection" component={CreatingCollection} /> 
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Vitrin" component={Vitrin} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profil" component={ProfilStack} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default AppNavigator;