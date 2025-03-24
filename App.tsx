import { NavigationContainer } from "@react-navigation/native";
import Login from "./components/login/Login";

import { createStackNavigator } from "@react-navigation/stack";
import StudentList from "./components/subjectList/StudentList";
import SubjectList from "./components/subjectList/StudentList";
import SubjectDetail from "./components/subjectDetail/SubjectDetail";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}options={{ title: 'Đăng nhập' }}  />
        <Stack.Screen name="Subject List" component={SubjectList} options={{ title: 'Danh sách môn học ' }} />
        <Stack.Screen name="Subject Detail" component={SubjectDetail} options={{ title: 'Chi tiết môn học' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
