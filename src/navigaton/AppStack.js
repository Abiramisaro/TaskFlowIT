import Feather from "@expo/vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Pressable, StyleSheet, View } from "react-native";
import { RText } from "../components";
import { CreateTaskScreen, Home, Profile, Settings, UpdateTask } from "../screen";
import { color } from "../theme/color";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AppStack = () => {

  const TaskStack = () => {
   return(
   <Stack.Navigator>
    <Stack.Screen name="Task_Dashboard" component={Home} options={{ headerTitle: "Taskflow Dashboard",headerTitleAlign:"center" }} />
    <Stack.Screen name="UpdateTask" component={UpdateTask} options={{ headerTitle : 'Task Details', headerTitleAlign:"center" }} />
       <Stack.Screen name="Create_Task" component={CreateTaskScreen} options={{ headerTitle : 'Create New Task', headerTitleAlign:"center" }} />

   </Stack.Navigator>
   )
  }
  const TabBarLabel = ({ focused, title }) => {
    return (
      <View style={styles.labelContainer}>
        {focused && <View style={styles.indicator} />}
        <RText
          style={[styles.label, focused && styles.activeLabel]}
          content={title}
        />
      </View>
    );
  };

  return (
    <Tab.Navigator
     
      screenOptions={{
        headerTitleAlign: "center",
        tabBarStyle: {
          borderTopWidth: 2,
          borderTopColor: color.white,
        },
        tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{ color: color.white }} 
                            style={() => [
                props.style,
                { backgroundColor: "white" },
              ]}
            />
          ),
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={TaskStack}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused} title="Tasks" />
          ),
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={24}
              color={focused ? color.prime : color.grey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: "Settings",
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused} title="Settings" />
          ),
          tabBarIcon: ({ focused }) => (
            <Feather
              name="settings"
              size={26}
              color={focused ? color.prime : color.grey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused} title="Profile" />
          ),
          tabBarIcon: ({ focused }) => (
            <Feather
              name="user"
              size={26}
              color={focused ? color.prime : color.grey}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  labelContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    color: "#777",
    fontWeight: "400",
  },
  activeLabel: {
    fontWeight: "700",  
    color: color.prime,
  },
  indicator: {
    width: "40%",
    height: 3,
    backgroundColor: color.prime,
    position: "absolute",
    top: -35, 
    borderRadius: 5,
  },
});
export default AppStack;
