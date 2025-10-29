import { Ionicons } from "@expo/vector-icons";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuthStore } from "../../store/authStore";
import App_Images from "../../theme/AppImage";
import { color } from "../../theme/color";
export default function Login({ navigation }) {
  const {
    loading,
    error,
    setUser,
    setLoading,
    loadUser,
  } = useAuthStore();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "175151151501-ejpnf54c0rani3kp4cnbj65esvgb6lln.apps.googleusercontent.com",
      offlineAccess: true,
    });

    loadUser();
  }, []);

  const SignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.data.user);
      await setUser(userInfo.data.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={App_Images.timeSheet}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>
        Plan your day with ease. Organize tasks, set goals, and stay on track.
      </Text>

      <TouchableOpacity
        style={styles.button}
        disabled={loading}
        onPress={SignIn}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="logo-google" size={20} color={color.white} />
            <Text style={styles.buttonText}>Continue with Google</Text>
          </>
        )}
      </TouchableOpacity>

      {error && (
        <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  image: { width: "100%", height: 350, left: -60, bottom: 90 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#222",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginVertical: 8,
    lineHeight: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 12,
    marginTop: 20,
    backgroundColor: color.prime,
  },
  buttonText: { fontSize: 16, marginLeft: 8, color: color.white },
});
