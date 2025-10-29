import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../store/authStore';
import AppStack from './AppStack';
import AuthStack from './AuthStack';


const Root_Navigation
 = ({
    params,
}) => {
    const{ loggedIn} = useAuthStore();
    return(
    <NavigationContainer>
    {loggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
)};

export default Root_Navigation