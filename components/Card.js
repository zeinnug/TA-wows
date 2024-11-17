import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Card = ({ children }) => {
  return (
    <View style={styles.card}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2
  }
});