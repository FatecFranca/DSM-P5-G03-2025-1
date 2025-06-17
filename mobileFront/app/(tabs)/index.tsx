import {
  Image,
  StyleSheet,
  TextInput,
  Alert,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import { apiEndpoint } from "../../utils/api";

export default function HomeScreen() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>({});
  const [position, setPosition] = useState("");
  const [rebounds, setRebounds] = useState("");
  const [assists, setAssists] = useState("");
  const [points, setPoints] = useState("");

  const handleSubmit = async () => {
    if (!position || !points || !rebounds || !assists) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    if (!userInfo?.id || !userInfo?.name) {
      Alert.alert("Erro", "Informações do usuário não encontradas.");
      return;
    }
    try {
      const url = apiEndpoint(
        `/classification/?player_name=${encodeURIComponent(userInfo.name)}&user_id=${userInfo.id}`
      );
      const body = {
        position: position,
        points_per_game: Number(points),
        assists_per_game: Number(assists),
        rebounds_per_game: Number(rebounds),
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Erro ao enviar estatísticas");
      }
      const data = await response.json();
      Alert.alert(
        "Dados Enviados",
        `Jogador: ${data.player_name}\nClassificação: ${data.classification}\n${data.message}`
      );
      // Opcional: limpar campos após envio
      setPosition("");
      setPoints("");
      setAssists("");
      setRebounds("");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar as estatísticas.");
      console.error(error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(apiEndpoint("/users/"));
      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      const data = await response.json();
      setUserInfo(data.items.find((user: any) => user.email === userEmail));
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Busca o email salvo no AsyncStorage
  useEffect(() => {
    const getEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };
    getEmail();
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#181d27" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Image
            source={require("@/assets/images/logo1.png")}
            style={styles.mainLogo}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>HOOP VISION</Text>
          <Text style={styles.subtitle}>
            Registre suas estatísticas do jogo
          </Text>
        </View>
        <View style={styles.formWrapper}>
          <View style={styles.inputContainer}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={position}
                onValueChange={(itemValue) => setPosition(itemValue)}
                style={styles.picker}
                dropdownIconColor="#e46827"
              >
                <Picker.Item label="Selecione a posição" value="" />
                <Picker.Item label="Armador" value="armador" />
                <Picker.Item label="Ala-Armador" value="ala-armador" />
                <Picker.Item label="Ala" value="ala" />
                <Picker.Item label="Ala-Pivô" value="ala-pivô" />
                <Picker.Item label="Pivô" value="pivô" />
              </Picker>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Pontos"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
              value={points}
              onChangeText={setPoints}
            />
            <TextInput
              style={styles.input}
              placeholder="Rebotes"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
              value={rebounds}
              onChangeText={setRebounds}
            />
            <TextInput
              style={styles.input}
              placeholder="Assistências"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
              value={assists}
              onChangeText={setAssists}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e46827",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 4,
    marginTop: 0,
  },
  mainLogo: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    marginTop: 10,
  },
  titleContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#e46827",
    textAlign: "center",
    letterSpacing: 2,
    textShadowColor: "#232a38",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 17,
    color: "#fff",
    marginTop: 6,
    textAlign: "center",
    letterSpacing: 1,
    fontWeight: "300",
  },
  formWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "95%",
    maxWidth: 370,
    backgroundColor: "#232a38",
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 20,
    gap: 18,
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e46827",
    borderRadius: 12,
    backgroundColor: "#1a1f2b",
    overflow: "hidden",
    marginBottom: 4,
  },
  picker: {
    height: 52,
    width: "100%",
    color: "#fff",
    fontSize: 16,
    paddingLeft: 12,
    paddingVertical: 0,
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#1a1f2b",
    borderColor: "#e46827",
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 4,
    paddingHorizontal: 16,
    color: "#fff",
    fontSize: 16,
  },
  sendButton: {
    width: "100%",
    backgroundColor: "#e46827",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#e46827",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 2,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
