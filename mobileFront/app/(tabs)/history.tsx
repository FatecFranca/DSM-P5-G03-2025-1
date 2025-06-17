import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { apiEndpoint } from "../../utils/api";
import { Collapsible } from "@/components/Collapsible";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoryScreen() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>({
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  });
  const [userInfo, setUserInfo] = useState<any>({});
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        apiEndpoint(
          `/history/user/${userInfo?.id}?page=${page}&per_page=${pagination.per_page}&sort=created_at&order=desc`
        )
      );
      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }
      const data = await response.json();
      setHistory(data.items || []);
      setPagination({
        page: data.page,
        per_page: data.per_page,
        total: data.total,
        total_pages: data.total_pages,
      });
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
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
    if (userEmail) {
      fetchUserInfo();
    }
  }, [userEmail]);

  useEffect(() => {
    if (userInfo?.id) {
      fetchHistory();
    }
  }, [userInfo]);

  const handleNextPage = () => {
    if (pagination.page < pagination.total_pages) {
      fetchHistory(pagination.page + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      fetchHistory(pagination.page - 1);
    }
  };

  const deleteHistoryItem = async (id: number) => {
    try {
      // Confirmação antes de deletar
      Alert.alert(
        "Confirmar exclusão",
        "Tem certeza que deseja excluir este item do histórico?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Excluir",
            style: "destructive",
            onPress: async () => {
              setLoading(true);
              const response = await fetch(apiEndpoint(`/history/${id}`), {
                method: "DELETE",
              });

              if (!response.ok) {
                throw new Error("Failed to delete history item");
              }

              // Atualiza o histórico após exclusão
              fetchHistory(pagination.page);
              Alert.alert("Sucesso", "Item excluído com sucesso!");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error deleting history item:", error);
      Alert.alert("Erro", "Não foi possível excluir o item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView style={styles.headerContainer}>
          <Image
            source={require("@/assets/images/nbalogoextend.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
            Histórico
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.subtitleContainer}>
          <ThemedText
            style={{
              textAlign: "center",
              marginBottom: 4,
              color: "#fff",
            }}
          >
            Confira aqui todas as estatísticas que você já registrou no HOOP
            VISION!
          </ThemedText>
        </ThemedView>
        {/* Botão de refresh */}
        <ThemedView
          style={{
            alignItems: "center",
            marginTop: 0,
            marginBottom: 4,
            backgroundColor: "#1a1f2b",
          }}
        >
          <TouchableOpacity
            onPress={() => fetchHistory(1)}
            style={styles.refreshButton}
            disabled={loading}
            accessibilityLabel="Atualizar histórico"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#e46827" />
            ) : (
              <ThemedText style={{ fontSize: 22, color: "#e46827" }}>
                ⟳
              </ThemedText>
            )}
          </TouchableOpacity>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          {/* Renderiza o histórico vindo do backend, ordenando do mais recente para o mais antigo */}
          {history.length > 0 ? (
            [...history]
              .sort(
                (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )
              .map((item, index) => (
                <Collapsible
                  key={index}
                  title={`${item.classification?.toUpperCase() || ""} ${
                    item.created_at
                      ?.slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/") || ""
                  }`}
                  rightContent={
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        deleteHistoryItem(item.id);
                      }}
                      style={styles.deleteButton}
                      accessibilityLabel="Excluir histórico"
                    >
                      <ThemedText style={styles.deleteButtonText}>🗑️</ThemedText>
                    </TouchableOpacity>
                  }
                >
                  <ThemedView style={styles.itemContainer}>
                    <ThemedText style={{ color: "#fff" }}>
                      <ThemedText
                        type="defaultSemiBold"
                        style={{ color: "#fff" }}
                      >
                        Nome:
                      </ThemedText>{" "}
                      {item.player_name}
                    </ThemedText>
                    <ThemedText style={{ color: "#fff" }}>
                      <ThemedText
                        type="defaultSemiBold"
                        style={{ color: "#fff" }}
                      >
                        Posição:
                      </ThemedText>{" "}
                      {item.position}
                    </ThemedText>
                    <ThemedText style={{ color: "#fff" }}>
                      <ThemedText
                        type="defaultSemiBold"
                        style={{ color: "#fff" }}
                      >
                        Pontos:
                      </ThemedText>{" "}
                      {item.average_points}
                    </ThemedText>
                    <ThemedText style={{ color: "#fff" }}>
                      <ThemedText
                        type="defaultSemiBold"
                        style={{ color: "#fff" }}
                      >
                        Assistências:
                      </ThemedText>{" "}
                      {item.average_assists}
                    </ThemedText>
                    <ThemedText style={{ color: "#fff" }}>
                      <ThemedText
                        type="defaultSemiBold"
                        style={{ color: "#fff" }}
                      >
                        Rebotes:
                      </ThemedText>{" "}
                      {item.average_rebounds}
                    </ThemedText>
                  </ThemedView>
                </Collapsible>
              ))
          ) : (
            <ThemedText style={{ color: "#fff", textAlign: "center" }}>
              Nenhum histórico encontrado.
            </ThemedText>
          )}

          {/* Pagination controls */}
          {pagination.total_pages > 1 && (
            <ThemedView style={styles.paginationContainer}>
              <TouchableOpacity
                onPress={handlePrevPage}
                disabled={pagination.page <= 1 || loading}
                style={[
                  styles.paginationButton,
                  pagination.page <= 1 ? styles.paginationButtonDisabled : null,
                ]}
              >
                <ThemedText style={styles.paginationButtonText}>
                  Anterior
                </ThemedText>
              </TouchableOpacity>

              <ThemedText style={styles.paginationText}>
                {`${pagination.page} de ${pagination.total_pages}`}
              </ThemedText>

              <TouchableOpacity
                onPress={handleNextPage}
                disabled={pagination.page >= pagination.total_pages || loading}
                style={[
                  styles.paginationButton,
                  pagination.page >= pagination.total_pages
                    ? styles.paginationButtonDisabled
                    : null,
                ]}
              >
                <ThemedText style={styles.paginationButtonText}>
                  Próxima
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    backgroundColor: "#1a1f2b",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  paginationButton: {
    backgroundColor: "#e46827",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  paginationButtonDisabled: {
    backgroundColor: "#666",
    opacity: 0.5,
  },
  paginationButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  paginationText: {
    color: "#fff",
    fontSize: 14,
  },
  headerContainer: {
    backgroundColor: "#e46827",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    height: 110,
    width: "100%",
    marginBottom: 0,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  titleContainer: {
    flexDirection: "row", // alterado para row para alinhar botão e título
    backgroundColor: "#1a1f2b",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#e46827",
    textAlignVertical: "center",
    margin: 0,
    padding: 0,
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: 60,
    height: 60,
  },
  subtitleContainer: {
    paddingHorizontal: 20,
    backgroundColor: "#1a1f2b",
  },
  stepContainer: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
    backgroundColor: "#1a1f2b",
  },
  itemContainer: {
    width: "80%",
    backgroundColor: "#222b38",
    flexDirection: "column",
    gap: 10,
    marginTop: 8,
    marginBottom: 8,
    padding: 8,
    borderRadius: 20,
  },
  refreshButton: {
    marginLeft: 8,
    padding: 4,
    borderRadius: 16,
    backgroundColor: "transparent",
  },
  deleteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 16,
    color: "#ff5252",
  },
});
