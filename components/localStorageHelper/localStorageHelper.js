import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadJobs = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("jobs");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Lỗi khi load jobs:", e);
    return [];
  }
};

export const saveJobs = async (jobs) => {
  try {
    const jsonValue = JSON.stringify(jobs);
    await AsyncStorage.setItem("jobs", jsonValue);
  } catch (e) {
    console.error("Lỗi khi save jobs:", e);
  }
};
