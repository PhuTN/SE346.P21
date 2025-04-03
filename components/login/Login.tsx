import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [storedUsername, setStoredUsername] = useState('user');
  const [storedPassword, setStoredPassword] = useState('123456');
  const [errorMessage, setErrorMessage] = useState('');

  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // Load dữ liệu khi vào màn
  useFocusEffect(
    useCallback(() => {
      loadStoredCredentials();
      resetForm();
    }, [])
  );

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setErrorMessage('');
    setChangePasswordMode(false);
    setForgotPasswordMode(false);
    setNewPassword('');
  };

  const loadStoredCredentials = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('username');
      const storedPass = await AsyncStorage.getItem('password');

      if (!storedUser || !storedPass) {
        await AsyncStorage.setItem('username', 'user');
        await AsyncStorage.setItem('password', '123456');
        setStoredUsername('user');
        setStoredPassword('123456');
      } else {
        setStoredUsername(storedUser);
        setStoredPassword(storedPass);
      }
    } catch (e) {
      console.error('Lỗi load thông tin:', e);
    }
  };

  const handleLogin = async () => {
    console.log(storedUsername,storedPassword)
    if (username === storedUsername && password === storedPassword) {
      setErrorMessage('');
      Alert.alert('Thành công', 'Đăng nhập thành công!');
      navigation.navigate('TodoList');
    } else {
      setErrorMessage('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };

  const handleChangePassword = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên đăng nhập và mật khẩu hiện tại!");
      return;
    }

    if (username !== storedUsername || password !== storedPassword) {
      Alert.alert("Lỗi", "Thông tin không khớp, không thể đổi mật khẩu!");
      return;
    }

    if (!newPassword.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu mới!");
      return;
    }

    await AsyncStorage.setItem('password', newPassword);
    setStoredPassword(newPassword);
    Alert.alert("Thành công", "Đổi mật khẩu thành công!");
    resetForm();
  };

  const handleForgotPassword = async () => {
    if (!newPassword.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu mới!");
      return;
    }
    await AsyncStorage.setItem('password', newPassword);
    setStoredPassword(newPassword);
    Alert.alert("Thành công", "Mật khẩu đã được đặt lại!");
    resetForm();
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Đăng nhập</Text>

        <Text style={styles.label}>Tên đăng nhập</Text>
        <TextInput
          style={[styles.input, errorMessage ? styles.inputError : null]}
          placeholder="Nhập tên đăng nhập"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setErrorMessage('');
          }}
        />

        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          style={[styles.input, errorMessage ? styles.inputError : null]}
          placeholder="Nhập mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage('');
          }}
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        {!changePasswordMode && !forgotPasswordMode && (
          <>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Xác nhận và tiếp tục</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setChangePasswordMode(true);
                setUsername('');
                setPassword('');
                setNewPassword('');
                setErrorMessage('');
              }}
              style={{ marginTop: 10 }}
            >
          <Text style={{ color: 'red', textAlign: 'center', fontStyle: 'italic' }}>
  Đổi mật khẩu
</Text>

            </TouchableOpacity>

            
          </>
        )}

        {(changePasswordMode || forgotPasswordMode) && (
          <>
            <Text style={[styles.label, { marginTop: 15 }]}>Mật khẩu mới</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu mới"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={forgotPasswordMode ? handleForgotPassword : handleChangePassword}
            >
              <Text style={styles.buttonText}>{forgotPasswordMode ? "Đặt lại mật khẩu" : "Đổi mật khẩu"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={resetForm} style={{ marginTop: 15 }}>
              <Text style={{ textAlign: 'center', color: 'gray' }}>← Quay lại</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginBox: {
    width: '90%',
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 12,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
