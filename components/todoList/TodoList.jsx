import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CheckBox from "expo-checkbox"; // dùng Expo
import { loadJobs, saveJobs } from "../localStorageHelper/localStorageHelper";

export default function TodoList() {
  const [jobs, setJobs] = useState([]);
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchJobs = async () => {
      const storedJobs = await loadJobs();
      setJobs(storedJobs);
    };
    fetchJobs();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleComplete = async (id) => {
    const updated = jobs.map((job) =>
      job.id === id ? { ...job, completed: !job.completed } : job
    );
    setJobs(updated);
    await saveJobs(updated);
  };

  const createJob = () => {
    navigation.navigate("AddJob");
  };

  useFocusEffect(
    useCallback(() => {
      const fetchJobs = async () => {
        const storedJobs = await loadJobs();
        setJobs(storedJobs);
      };
      fetchJobs();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("JobDetail", { jobId: item.id })}
    >
      <View style={styles.row}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <CheckBox
          value={item.completed}
          onValueChange={() => toggleComplete(item.id)}
          color={item.completed ? "#34C759" : undefined}
        />
      </View>

      {item.content ? <Text style={styles.jobContent}>{item.content}</Text> : null}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        style={{ flex: 1 }}
      />

      {/* Nút ở dưới cùng với hiệu ứng fade in */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableOpacity style={styles.button} onPress={createJob}>
          <Text style={styles.buttonText}>Tạo công việc mới</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  jobTitle: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    marginRight: 10,
    flexWrap: "wrap",
  },
  jobContent: {
    fontSize: 14,
    color: "#333",
  },
  checkboxContainer: {
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
