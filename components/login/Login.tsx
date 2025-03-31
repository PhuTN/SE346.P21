import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { students } from '../../data/students';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      console.log("🔐 Đang kiểm tra đăng nhập...");
      // CÓ ĐỨA NÀO XÓA EMLOYEE ID 2 RỒI THẦY
      const response = await fetch('http://blackntt.net:88/api/v1/employees');
      const data = await response.json();
  
      let matchedUser = null;
      console.log(data)
      for (const emp of data) {
        if (emp.employee_name === username) {
          matchedUser = emp;
          break;
        }
      }
  
      if (matchedUser) {
        setErrorMessage('');

        Alert.alert('Thành công', 'Đăng nhập thành công!.');
                        setTimeout(() => {
                          navigation.navigate('Employee List', { username: matchedUser.employee_name });
                        }, 500);
       
      } else {
        setErrorMessage('Tên đăng nhập không đúng!');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Lỗi kết nối đến máy chủ!');
    }
  };
  

  useFocusEffect(
    useCallback(() => {
      setUsername('');
      setPassword('');
      setErrorMessage('');
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Đăng nhập</Text>

        <Text style={styles.label}>Tên đăng nhập</Text>
        <TextInput
          style={[styles.input, errorMessage ? styles.inputError : null]}
          placeholder="Nhập tên đăng nhập"
          placeholderTextColor="#A0A0A0"
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
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage('');
          }}
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Xác nhận và tiếp tục</Text>
        </TouchableOpacity>
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
    fontFamily: 'Caveat-Bold',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5,
    fontFamily: 'Caveat-Regular',
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 12,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: 'Caveat-Regular',
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
    fontFamily: 'Caveat-Bold',
  },
});

export default Login;
