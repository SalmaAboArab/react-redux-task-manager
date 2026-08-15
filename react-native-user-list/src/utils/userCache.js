import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'userList.cache.v1';

/**
 * Cache shape: { users: Transformed User[], page, hasMore, cachedAt }
 * Kept as one JSON blob rather than per-user keys — this list is small
 * (jsonplaceholder has 10 users total) and read/written as a unit anyway.
 */
export async function loadCachedUsers() {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn('UserList: failed to read cache', err);
    return null;
  }
}

export async function saveCachedUsers(payload) {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({ ...payload, cachedAt: Date.now() }));
  } catch (err) {
    console.warn('UserList: failed to write cache', err);
  }
}
