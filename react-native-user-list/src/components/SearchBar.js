import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Search users by name"
        placeholderTextColor="#8a97a3"
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
    </View>
  );
}

export default React.memo(SearchBar);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f4f6f8',
  },
  input: {
    height: 40,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    fontSize: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d5dbe0',
  },
});
