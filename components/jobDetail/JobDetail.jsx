import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import CheckBox from "expo-checkbox";
import { useNavigation, useRoute } from "@react-navigation/native";
import { loadJobs, saveJobs } from "../localStorageHelper/localStorageHelper";

export default function JobDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { jobId } = route.params;
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const jobs = await loadJobs();
      const found = jobs.find((j) => j.id === jobId);
      if (found) setJob(found);
    };
    fetchJob();
  }, [jobId]);

  const handleDelete = async () => {
    const jobs = await loadJobs();
    const filtered = jobs.filter((j) => j.id !== job.id);
    await saveJobs(filtered);

    // Hiển thị thông báo sau khi xóa
    Alert.alert("Thành công", "Đã xóa công việc.", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  if (!job) return <Text style={styles.loadingText}>Đang tải...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tiêu đề</Text>
      <TextInput
        value={job.title}
        editable={false}
        style={styles.input}
      />

      <Text style={styles.label}>Nội dung</Text>
      <TextInput
        value={job.content}
        editable={false}
        multiline
        style={[styles.input, { minHeight: 100 }]}
      />

      <View style={styles.checkboxRow}>
        <CheckBox value={job.completed} disabled  color="#34C759"  />
        <Text style={styles.checkboxLabel}>Đã hoàn thành</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingText: {
    padding: 20,
    fontSize: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    color: "#333",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
