import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { checkIfLoggedIn, signInAnonymously } from "@/functions/user";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function TabOneScreen() {
  const [userSession, setUserSession] = useState<Session | null>(null);

  const login = async () => {
    const session = await checkIfLoggedIn();
    if (!session) {
      const loginSession = await signInAnonymously();
      setUserSession(loginSession);
    } else {
      setUserSession(session);
    }
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{userSession ? userSession.user.id : ""}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
