import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Hàm xác định buổi học dựa vào tiết
const getSession = (tiet) => {
  if (!tiet || tiet === '*' || tiet.length === 0) return 'Không rõ';
  const firstDigit = tiet.toString()[0];
  return ['1', '2', '3', '4', '5'].includes(firstDigit) ? 'Sáng' : 'Chiều';
};

const SubjectDetail = ({ route }) => {
  const { subject } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{subject.tenMH}</Text>

      <Text style={styles.detail}>📘 Mã môn học: {subject.maMH}</Text>
      <Text style={styles.detail}>👨‍🏫 Tên giảng viên: {subject.tenGV || 'Chưa có'}</Text>
      <Text style={styles.detail}>🏫 Phòng học: {subject.phongHoc === '*' ? 'Chưa có' : subject.phongHoc}</Text>

      <View style={styles.row}>
        <Text style={[styles.detail, styles.half]}>📅 Thứ: {subject.thu}</Text>
        <Text style={[styles.detail, styles.half]}>🕘 Buổi: {getSession(subject.tiet)}</Text>
      </View>


      <View style={styles.row}>
        <Text style={[styles.detail, styles.half]}>🕐 Tiết: {subject.tiet}</Text>
        <Text style={[styles.detail, styles.half]}>👥 Sĩ số: {subject.siSo}</Text>
      </View>

      <Text style={styles.detail}>📖 Hình thức: {subject.htgd}</Text>

      <Text style={styles.detail}>📆 Ngày bắt đầu: {subject.nbd}</Text>
      <Text style={styles.detail}>📆 Ngày kết thúc: {subject.nkt}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1E88E5',
  },
  detail: {
    fontSize: 17,
    marginBottom: 8,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    width: '48%',
  },
});

export default SubjectDetail;
