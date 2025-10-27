import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../store/authStore';
import AppStack from './AppStack';
import AuthStack from './AuthStack';


const Root_Navigation
 = ({
    params,
}) => {
    const{ isLoggedIn} = useAuthStore()
    return(
    <NavigationContainer>
    {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
)};

export default Root_Navigation