import Feather from '@expo/vector-icons/Feather';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { BorderBox, RButton, RText } from '../../components';
import { useAuthStore } from '../../store/authStore';
import { color } from '../../theme/color';

const Profile = ({navigation}) => {
    const {user, signOut} = useAuthStore();
console.log(user,"user in profile screen....")
     const SignOut_User = async () => {
        try {
          await GoogleSignin.signOut();
          await signOut();
        } catch (error) {
          console.error(error);
        }
      };

const Content = ({iconName,title}) => (
    <View style={{flexDirection:'row',alignItems:'center',width: '30%'}}>
        <Feather name={iconName} color={color.placeHolder} size={18} />
        <RText content={title} style={{color:color.placeHolder,fontSize:13,marginLeft : 10}} />
    </View>
)

const UserData = ({value,edit = true}) => (    
    <View style={{flexDirection:'row',justifyContent:"flex-end",width: '70%'}}>
        <RText content={value} style={{color:color.text,fontSize:13}} />
        {edit && <Feather name='edit-3' color={color.placeHolder} size={18} style={{marginLeft:5}}/>}
    </View>
)

    return(
    <ScrollView style={styles.container} scrollEnabled={true}>
        <Image source={{uri : user.photo}} style={styles.userPhoto} />
        <RText content={user.name } style={styles.UserName} />
        <RText content={user.email} style={styles.mail}/>
        <BorderBox style={{marginTop:30,padding:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Content iconName = 'user' title = 'Name' />
            <UserData value={'Abirami Saravanan'}/>

            </BorderBox>

            <BorderBox style={{marginTop:10,padding:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Content iconName = 'mail' title = 'Email' />
                        <UserData value={'abiramisaravantpr@gmail.com'}/>

            </BorderBox>
            <BorderBox style={{marginTop:10,padding:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Content iconName = 'lock' title = 'Password' />
            <UserData value={'*********'}/>

            </BorderBox>
            <BorderBox style={{marginTop:10,padding:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Content iconName = 'calendar' title = 'Joined' />
            <UserData value={'September 10, 2025 '} edit={false}/>

            </BorderBox>
                               <RButton buttonText={'Log Out'} buttonStyle={styles.logoutButton} textStyle={styles.logoutText} onPress={SignOut_User} />

    </ScrollView>
)};
const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor : color.white,
        padding : 18
    },
    logoutButton: {
    backgroundColor: color.prime,
    borderWidth: 1,
    borderColor: color.border,
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
    marginBottom:23
  },
  logoutText: {
    color: color.white,
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
  },
    userPhoto:{width:120,height:120,        backgroundColor :color.border,
borderRadius:60,alignSelf:'center',marginBottom:20},
    UserName :{
        color : color.black,
        fontSize : 20,
        fontWeight : 'bold',
        marginBottom : 10,
        textAlign:"center"
    },
    mail :{
        fontSize:13,
        color : color.placeHolder,
        textAlign:"center"
    }
})
export default Profile;
