import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://blackntt.net:88/api/v1/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, []);
  
  useFocusEffect(
    React.useCallback(() => {
      fetchEmployees();
    }, [])
  );
  const formatSalary = (salary: number | string): string => {
    const num = typeof salary === 'string' ? parseFloat(salary.replace(/,/g, '')) : salary;
    return num.toLocaleString('en-US'); 
  };
  const handleAddEmployee = async () => {
    const defaultEmployee = {
      name: 'New Employee',
      salary: '1',
      age: '1',
    };
  
    try {
      const response = await fetch('http://blackntt.net:88/api/v1/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(defaultEmployee),
      });
  
      const newEmployee = await response.json();
  
      if (newEmployee) {
        navigation.navigate('Employee Detail', { employee: newEmployee });
      }
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>👩‍💼 Danh sách nhân viên</Text>
     

    
      <View style={styles.reloadContainer}>
  <View style={styles.rowButtons}>
    <View style={styles.buttonWrapper}>
      <Button title="🔄 Tải lại" color="black" onPress={fetchEmployees} />
    </View>
    <View style={styles.buttonWrapper}>
      <Button title="➕ Thêm nhân viên " color="black" onPress={handleAddEmployee} />
    </View>
  </View>
</View>

      {loading ? (
        <ActivityIndicator size="large" color="#1E88E5" />
      ) : (
        <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
          <View style={styles.tableWrapper}>
            
            <View style={[styles.row, styles.headerRow]}>
              <Text style={[styles.cellTT, styles.headerCell]}>STT</Text>
              <Text style={[styles.cellMH, styles.headerCell]}>Tên nhân viên</Text>
              <Text style={[styles.cell, styles.headerCell]}>Tuổi</Text>
              <Text style={[styles.cell, styles.headerCell]}>Lương</Text>
            </View>

            <FlatList
              style={styles.list}
              data={employees}
              keyExtractor={(item, index) => item.id + index}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => navigation.navigate('Employee Detail', { employee: item })}
                >
                  <Text style={styles.cellTT}>{index + 1}</Text>
                  <Text style={styles.cellMH}>{item.employee_name}</Text>
                  <Text style={styles.cell}>{item.employee_age}</Text>
                  <Text style={styles.cell}>{formatSalary(item.employee_salary)}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={styles.info}>Không có nhân viên nào.</Text>}
            />
          </View>
        </ScrollView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    padding: 16,
  },
  tableWrapper: {
    alignSelf: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  
  table: {
    alignSelf: 'center',
  },
  rowButtons: {
    flexDirection: 'row',
    gap: 10, // nếu bạn dùng React Native mới, hoặc dùng marginRight nếu không hỗ trợ gap
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  
  buttonWrapper: {
    marginRight: 8, // khoảng cách giữa các button (dự phòng nếu `gap` không hoạt động)
  },
  
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  scrollHint: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 8,
  },
  reloadContainer: {
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingVertical: 8,
    alignItems: 'center',
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#aaa',
  },
  cellTT: {
    width: 40,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  cell: {
    width: 90,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  cellMH: {
    width: 120,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#000',
  },
  list: {
    marginBottom: 15,
  },
  info: {
    fontSize: 16,
    marginVertical: 10,
    color: '#444',
    textAlign: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignSelf: 'center',
  },
});

export default EmployeeList;
