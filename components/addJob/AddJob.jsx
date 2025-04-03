import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import CheckBox from "expo-checkbox"; // Sử dụng checkbox giống JobDetail
import { useNavigation } from "@react-navigation/native";
import { loadJobs, saveJobs } from "../localStorageHelper/localStorageHelper";

export default function AddJob() {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleAdd = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ tiêu đề và nội dung.");
      return;
    }

    const newJob = {
      id: Date.now().toString(),
      title,
      content,
      completed,
    };

    const jobs = await loadJobs();
    const updatedJobs = [...jobs, newJob];
    await saveJobs(updatedJobs);

    // Hiển thị thông báo thành công và quay lại sau khi OK
    Alert.alert("Thành công", "Công việc đã được thêm!", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tiêu đề</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Nhập tiêu đề"
      />

      <Text style={styles.label}>Nội dung</Text>
      <TextInput
        value={content}
        onChangeText={setContent}
        multiline
        style={[styles.input, { minHeight: 100 }]}
        placeholder="Nhập nội dung"
      />

      <View style={styles.checkboxRow}>
        <CheckBox
          value={completed}
          onValueChange={setCompleted}
          color={completed ? "#34C759" : undefined}
        />
        <Text style={styles.checkboxLabel}>Đã hoàn thành</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Thêm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    backgroundColor: "#fff",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
