import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView ,Image, TouchableOpacity} from 'react-native';
import { students } from '../../data/students';
import { subjects } from '../../data/subjects';
import { registrations } from '../../data/registrations';
import { useNavigation } from '@react-navigation/native';



const getSession = (tiet) => {
  if (!tiet || tiet === '*' || tiet.length === 0) return 'Không rõ';
  const firstDigit = tiet.toString()[0];
  return ['1', '2', '3', '4', '5'].includes(firstDigit) ? 'Sáng' : 'Chiều';
};

const SubjectList = ({ route }) => {
  const { username } = route.params;

  const student = students.find((s) => s.username === username);
  const navigation = useNavigation();
  const registeredSubjects = registrations
    .filter((r) => r.studentId === student.id)
    .map((r) => subjects.find((s) => s.id === r.subjectId));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
    <Image source={{ uri: student.avatar }} style={styles.avatar} />
    
  </View>
  <Text style={styles.title}>Welcome, {student.name}!</Text>
    <Text style={styles.info}>📌 MSSV: {student.mssv}</Text>
    <Text style={styles.info}>🏫 Khoa: {student.khoa}</Text>
    <Text style={styles.info}>📅 Năm học: {student.namHoc}</Text>
     
      <Text style={styles.sectionTitle}>📚 Danh sách môn học đã đăng ký</Text>
      <Text style={styles.scrollHint}>👉 Kéo sang trái hoặc phải để xem thêm</Text>
      <ScrollView horizontal>
        <View>
          {/* Tên cột */}
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cellTT, styles.headerCell]}>STT</Text>
            <Text style={[styles.cellMH, styles.headerCell]}>Tên môn</Text>
            <Text style={[styles.cell, styles.headerCell]}>Thứ</Text>
            <Text style={[styles.cell, styles.headerCell]}>Buổi</Text>
            <Text style={[styles.cell, styles.headerCell]}>Tiết</Text>
            <Text style={[styles.cell, styles.headerCell]}>Phòng</Text>
          </View>

          <FlatList
            style={styles.list}
            data={registeredSubjects}
            keyExtractor={(item, index) => item.id + index}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => navigation.navigate('Subject Detail', { subject: item })}>
              <View style={styles.row}>
                <Text style={styles.cellTT}>{index + 1}</Text>
                <Text style={styles.cellMH}>{item.tenMH}</Text>
                <Text style={styles.cell}>{item.thu}</Text>
                <Text style={styles.cell}>{getSession(item.tiet)}</Text>
                <Text style={styles.cell}>{item.tiet}</Text>
                <Text style={styles.cell}>
                  {item.phongHoc === '*' ? 'Chưa có' : item.phongHoc || 'N/A'}
                </Text>
              </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.info}>Không có môn học nào.</Text>}
          />
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    padding: 16,
  },
  profileContainer: {
   
    marginBottom: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
     alignItems: 'center',
  },
  
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  info: {
    fontSize: 16,
    marginBottom: 2,
    color: '#444',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 14,
    color: '#1E88E5',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingVertical: 8,
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
    width: 100,
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
  scrollHint: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 8,
  },
});

export default SubjectList;
