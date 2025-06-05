import React, { useState } from "react";
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
import { Picker } from "@react-native-picker/picker";

export default function HomeScreen() {
  const [position, setPosition] = useState("");
  const [points, setPoints] = useState("");
  const [rebounds, setRebounds] = useState("");
  const [assists, setAssists] = useState("");

  const handleSubmit = () => {
    Alert.alert("Dados Enviados", "Obrigado por enviar suas estatísticas!");
  };

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
          <Text style={styles.subtitle}>Registre suas estatísticas do jogo</Text>
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
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 4,
  },
  mainLogo: {
    width: 130,
    height: 130,
    resizeMode: "contain",
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
    shadowOpacity: 0.10,
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