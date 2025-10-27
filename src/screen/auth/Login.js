// import { Ionicons } from "@expo/vector-icons"; // for mail icon
// import { useEffect } from "react";
// import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { useAuthStore } from "../../store/authStore";
// import App_Images from "../../theme/AppImage";
// import { color } from "../../theme/color";

// export default function Login({ navigation }) {
  
//   const { loading, error, response, promptAsync, handleGoogleResponse, initGoogleAuth } = useAuthStore();

//   // Initialize AuthSession once
//   useEffect(() => {
//     initGoogleAuth();
//   }, []);

//   // When response changes, handle it
//   useEffect(() => {
//     if (response) handleGoogleResponse(response);
//   }, [response]);

//   return (
//     <View style={styles.container}>
//       <Image
//         source={App_Images.timeSheet}
//         style={styles.image}
//         resizeMode="contain"
//       />

//       <Text style={styles.title}>Welcome!</Text>
//       <Text style={styles.subtitle}>
//         Plan your day with ease. Organize tasks, set goals, and stay on track.
//       </Text>

//       <TouchableOpacity style={styles.button}           onPress={() => promptAsync && promptAsync()}
// >
//         <Ionicons name="mail-outline" size={20} color={color.white} />
//         <Text style={styles.buttonText}>Continue with Email</Text>
//       </TouchableOpacity>

//       <TouchableOpacity>
//         <Text style={styles.link}>Create new account</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 25,
//     justifyContent: "center",
//     backgroundColor: "#fff",
//   },
//   image: {
//     width: "100%",
//     height: 350,
// left: -60,
// bottom:90,    
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "700",
//     textAlign: "center",
//     color: "#222",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#666",
//     textAlign: "center",
//     marginVertical: 8,
//     lineHeight: 20,
//   },
//   button: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor:color.prime,
//     borderRadius: 5,
//     paddingVertical: 12,
//     marginTop: 20,
//     backgroundColor: color.prime
//   },
//   buttonText: {
//     fontSize: 16,
//     marginLeft:8,
//     color: color.white,
//   },
//   link: {
//     fontSize: 14,
//     color: "#007B55",
//     textAlign: "center",
//     marginTop: 18,
//     textDecorationLine: "underline",
//   },
// });
import { Ionicons } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../../store/authStore";
import App_Images from "../../theme/AppImage";
import { color } from "../../theme/color";

WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }) {
  const { loading, error, signInWithGoogleCredential } = useAuthStore();



const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "501414841947-vh4auolmmqgeeo6338qk7el0qr5rbr44.apps.googleusercontent.com",
    //iosClientId: "501414841947-vh4auolmmqgeeo6338qk7el0qr5rbr44.apps.googleusercontent.com",
    androidClientId: "175151151501-cbifohd62gjij7f5o2di311m9b5j6ns9.apps.googleusercontent.com",
 scopes: ["profile", "email"],
  });
useEffect(() => {
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
  console.log('Redirect URI for Google OAuth:', redirectUri);
}, []);
  

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      signInWithGoogleCredential(id_token);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Image source={App_Images.timeSheet} style={styles.image} resizeMode="contain" />

      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>
        Plan your day with ease. Organize tasks, set goals, and stay on track.
      </Text>

      <TouchableOpacity
        style={styles.button}
        disabled={!request || loading}
        onPress={() => promptAsync()}
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

      {error && <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: "center", backgroundColor: "#fff" },
  image: { width: "100%", height: 350, left: -60, bottom: 90 },
  title: { fontSize: 28, fontWeight: "700", textAlign: "center", color: "#222" },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", marginVertical: 8, lineHeight: 20 },
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
