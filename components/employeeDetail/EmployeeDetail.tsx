import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const EmployeeDetail = ({ route }) => {
  const { employee } = route.params;
  const navigation = useNavigation();
  const [name, setName] = useState(employee.employee_name);
  const [age, setAge] = useState(String(employee.employee_age));
  const [salary, setSalary] = useState(String(employee.employee_salary));
  const [imageUri, setImageUri] = useState(
    employee.profile_image 
  );
 

  const pickImage = async () => {
    console.log("hello")
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };

  const handleUpdate = async () => {
    try {
      const url = `http://blackntt.net:88/api/v1/update/${employee.id}`;
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee_name: name,
          employee_age: parseInt(age),
          employee_salary: parseFloat(salary.replace(/,/g, '')),
          profile_image: imageUri,
        }),
      };
  
      const response = await fetch(url, requestOptions);
  
      if (response.ok) {
        Alert.alert('💾 Đã cập nhật', 'Thông tin nhân viên đã được lưu.');
      } else {
        Alert.alert('❗Thất bại', 'Không thể cập nhật nhân viên');
      }
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Lỗi', 'Không thể kết nối đến server');
    }
  };
  

  const formatSalary = (value: string): string => {
    const num = value.replace(/[^0-9]/g, ''); 
    return Number(num).toLocaleString('en-US'); 
  };
  

  const handleDelete = async () => {
    Alert.alert(
      '❗ Xác nhận',
      'Bạn có chắc muốn xoá nhân viên này?',
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xoá',
          style: 'destructive',
          onPress: async () => {
            try {
              const url = `http://blackntt.net:88/api/v1/delete/${employee.id}`;
              const response = await fetch(url, { method: 'DELETE' });
             
  
              if (response.ok) {
                Alert.alert('🗑️ Đã xoá', 'Nhân viên đã được xoá.');
                setTimeout(() => {
                  navigation.goBack();
                }, 500);
              } else {
                Alert.alert('❗Thất bại', `Xóa nhân viên thất bại'}`);
              }
            } catch (error) {
              console.error('Delete error:', error);
              Alert.alert('Lỗi', 'Không thể kết nối đến server');
            }
          },
        },
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧑‍💼 Thông tin nhân viên </Text>

      <View style={styles.avatarContainer}>
  {imageUri ? (
    <Image source={{ uri: imageUri }} style={styles.image} />
  ) : (
    <View style={styles.placeholder}>
      <Text style={{ color: '#888' }}>Chưa có ảnh</Text>
    </View>
  )}

  <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
    <Text style={styles.uploadButtonText}>🖼️ Tải ảnh lên</Text>
  </TouchableOpacity>
</View>


      <View style={styles.field}>
        <Text style={styles.label}>👤 Tên nhân viên:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>📅 Tuổi:</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={age}
          onChangeText={(text) => {
            const ageNum = parseInt(text);
            if (!isNaN(ageNum) && ageNum >= 1 && ageNum <= 120) {
              setAge(text);
            } else if (text === '') {
              setAge('');
            }
          }}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>💰 Lương:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={salary}
          onChangeText={(text) => {
            const raw = text.replace(/[^0-9]/g, '');
            setSalary(formatSalary(raw));
          }}
        />
      </View>

      <View style={styles.buttonRow}>
  <TouchableOpacity style={[styles.button, { marginRight: 10 }]} onPress={handleUpdate}>
    <Text style={styles.buttonText}>💾 Lưu</Text>
  </TouchableOpacity>
  <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
    <Text style={styles.buttonText}>🗑️ Xoá</Text>
  </TouchableOpacity>
</View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  field: {
    width: '90%',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
  },
  
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'black',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  
  uploadButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  
  uploadButtonText: {
    color: '#333',
    fontSize: 14,
  },
  
});

export default EmployeeDetail;
