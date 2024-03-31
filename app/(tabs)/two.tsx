import {
  Button,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useState } from "react";
import { patchHandover, updatePassword } from "@/functions/user";

export default function registorScreen() {
  const [transfer_mail, setEmail] = useState("");
  const [transfer_password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isSendMail, setIsSendMail] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (!isSendMail) {
      try {
        await patchHandover({ transfer_mail });
        Alert.alert("メール送信完了", "メールが正常に送信されました。");
        setIsSendMail(true);
      } catch (error) {
        Alert.alert("エラー", "処理中にエラーが発生しました。");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await updatePassword({ transfer_password });
        Alert.alert("パスワード設定完了", "パスワードが正常に設定されました。");
        setIsSendMail(true);
      } catch (error) {
        Alert.alert("エラー", "処理中にエラーが発生しました。");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"会員登録(厳密には認証方法変更)"}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {!isSendMail && (
        <>
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={transfer_mail}
            keyboardType="email-address"
          />
        </>
      )}
      {isSendMail && (
        <>
          <Text>Password:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={transfer_password}
            secureTextEntry
          />
        </>
      )}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Submit" onPress={handleSubmit} />
      )}
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
  input: {
    width: 300,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
