import { NavigationContainer } from "@react-navigation/native";
import Login from "./components/login/Login";

import { createStackNavigator } from "@react-navigation/stack";
import EmployeeList from "./components/employeeList/EmployeeList";
import EmployeeDetail from "./components/employeeDetail/EmployeeDetail";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}options={{ title: 'Đăng nhập' }}  />
        <Stack.Screen name="Employee List" component={EmployeeList} options={{ title: 'Danh sách nhân viên ' }} />
        <Stack.Screen name="Employee Detail" component={EmployeeDetail} options={{ title: 'Chi tiết nhân viên' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
