import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { apiEndpoint } from "../utils/api";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";

export default function Register() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState(""); // novo estado para email
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    if (alertVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      const timer = setTimeout(() => {
        hideAlert();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [alertVisible]);

  const showAlert = (message: string, type: "success" | "error") => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setAlertVisible(false);
    });
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      showAlert("As senhas não coincidem!", "error");
      return;
    }

    try {
      const response = await fetch(apiEndpoint("/users/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: user, email, password }),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar usuário");
      }

      const data = await response.json();
      showAlert("Usuário registrado com sucesso!", "success");
      
      setTimeout(() => {
        router.replace("/login");
      }, 1500);
    } catch (error) {
      showAlert("Erro ao registrar usuário. Tente novamente.", "error");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.logo}>🏀</Text>
        <Text style={styles.title}>Hoop Vision</Text>
        <Text style={styles.subtitle}>Crie sua conta</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#bbb"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#bbb"
          value={user}
          onChangeText={setUser}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#bbb"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          placeholderTextColor="#bbb"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.loginButtonText}>Voltar para Login</Text>
        </TouchableOpacity>
      </View>

      {/* Alert customizado */}
      {alertVisible && (
        <Animated.View 
          style={[
            styles.alertContainer, 
            alertType === "success" ? styles.successAlert : styles.errorAlert,
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.alertText}>
            {alertType === "success" ? "✅ " : "❌ "}{alertMessage}
          </Text>
          <TouchableOpacity onPress={hideAlert} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  successAlert: {
    backgroundColor: '#43a047',
    borderLeftWidth: 5,
    borderLeftColor: '#2e7d32',
  },
  errorAlert: {
    backgroundColor: '#e53935',
    borderLeftWidth: 5,
    borderLeftColor: '#c62828',
  },
  alertText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: "#181d27",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#232a38",
    borderRadius: 16,
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  logo: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#e46827",
    marginBottom: 4,
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#1a1f2b",
    borderColor: "#e46827",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 14,
    color: "#fff",
    fontSize: 16,
  },
  registerButton: {
    width: "100%",
    backgroundColor: "#e46827",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#e46827",
  },
  loginButtonText: {
    color: "#e46827",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});