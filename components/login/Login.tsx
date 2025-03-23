import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      isError: false,
      isLoggedIn: false
    };
  }

  validUsers = {
    user1: '123456',
    user2: '123456'
  };

  handleLogin = () => {
    const { username, password } = this.state;
    if (this.validUsers[username] && this.validUsers[username] === password) {
      this.setState({ isLoggedIn: true, errorMessage: '', isError: false });
    } else {
      this.setState({ errorMessage: 'Invalid username or password!', isError: true });
    }
  };

  handleChange = (field, value) => {
    this.setState({ [field]: value, isError: false, errorMessage: '' });
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false, username: '', password: '' });
  };

  render() {
    if (this.state.isLoggedIn) {
      return (
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome {this.state.username}!</Text>
          <TouchableOpacity style={styles.button2} onPress={this.handleLogout}>
            <Text style={styles.buttonText}>Back to Login</Text>
          </TouchableOpacity>

          <Text style={styles.introText}>Developed by: Tran Ngoc Phu 22521107</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[styles.input, this.state.isError ? styles.inputError : null]}
            placeholder="Enter username"
            placeholderTextColor="#A0A0A0"
            value={this.state.username}
            onChangeText={(text) => this.handleChange('username', text)}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, this.state.isError ? styles.inputError : null]}
            placeholder="Enter password"
            placeholderTextColor="#A0A0A0"
            secureTextEntry
            value={this.state.password}
            onChangeText={(text) => this.handleChange('password', text)}
          />

          {this.state.errorMessage ? (
            <Text style={styles.errorText}>{this.state.errorMessage}</Text>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Confirm and Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,

    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1E5EC3',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    margin: 10
  },
  loginBox: {
    width: '90%',
    backgroundColor: 'white',
    padding: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Caveat-Bold'
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5,
    fontFamily: 'Caveat-Regular'
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 12,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: 'Caveat-Regular'
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  button2: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '60%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Caveat-Bold',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  introText: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 20,
  }

});

export default Login;