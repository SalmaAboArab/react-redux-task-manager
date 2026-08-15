import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * React.memo keeps FlatList fast: with a stable renderItem callback and a
 * plain-object comparison here, rows that haven't changed skip re-render
 * entirely when the list re-renders for an unrelated reason (e.g. the
 * search box gaining focus).
 */
function UserCard({ name, email, address }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </View>
  );
}

export default React.memo(UserCard);

// Fixed row height — needed for FlatList's getItemLayout optimization in
// the parent screen, and it keeps every card visually consistent.
export const USER_CARD_HEIGHT = 88;

const styles = StyleSheet.create({
  card: {
    height: USER_CARD_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e2e2',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2f6690',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#16232e',
  },
  email: {
    fontSize: 13,
    color: '#5b6b78',
    marginTop: 2,
  },
  address: {
    fontSize: 12,
    color: '#8a97a3',
    marginTop: 2,
  },
});
