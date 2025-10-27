import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screen";

const Stack = createStackNavigator();
const AuthStack = () => {
 

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown : false,
        
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        component={Login}
      />
      
    </Stack.Navigator>
  );
};
export default AuthStack;
