import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const UserPDF = ({ users }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={{ fontSize: 24, textAlign: 'center' }}>Users List</Text>
      {users.map(user => (
        <View key={user._id} style={styles.section}>
          <Text>Name: {user.name}</Text>
          <Text>Age: {user.age}</Text>
          <Text>Password: {user.password}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default UserPDF;
