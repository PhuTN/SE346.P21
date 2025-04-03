import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TodoList from "./components/todoList/TodoList";
import JobDetail from "./components/jobDetail/JobDetail";

import Login from "./components/login/Login";
import AddJob from "./components/addJob/AddJob";


export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ title: "Đăng nhập" }} />
        <Stack.Screen name="TodoList" component={TodoList} options={{ title: "Danh sách công việc" }} />
        <Stack.Screen name="AddJob" component={AddJob} options={{ title: "Thêm công việc" }} />
        <Stack.Screen name="JobDetail" component={JobDetail} options={{ title: "Chi tiết công việc" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
