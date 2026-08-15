import React, { useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsersPage,
  hydrateFromCache,
  searchQueryChanged,
  selectFilteredUsers,
  selectUsersState,
} from '../redux/usersSlice';
import UserCard, { USER_CARD_HEIGHT } from '../components/UserCard';
import SearchBar from '../components/SearchBar';

export default function UserListScreen() {
  const dispatch = useDispatch();
  const { page, hasMore, status, error, isOffline, searchQuery } = useSelector(selectUsersState);
  const users = useSelector(selectFilteredUsers);

  useEffect(() => {
    // 1. Show cached data immediately (works offline, feels instant).
    // 2. Then fetch page 1 fresh from the network to reconcile it.
    dispatch(hydrateFromCache()).then(() => {
      dispatch(fetchUsersPage(1));
    });
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    if (status === 'loadingMore' || !hasMore) return;
    dispatch(fetchUsersPage(page + 1));
  }, [dispatch, page, hasMore, status]);

  const handleRetry = useCallback(() => {
    dispatch(fetchUsersPage(page > 0 ? page : 1));
  }, [dispatch, page]);

  // Stable renderItem: UserCard is memoized, and this callback only
  // changes if its deps change, so FlatList rows don't re-render
  // needlessly when unrelated state (like the search box) updates.
  const renderItem = useCallback(
    ({ item }) => <UserCard name={item.name} email={item.email} address={item.address} />,
    []
  );

  const keyExtractor = useCallback((item) => String(item.id), []);

  // Fixed row height lets FlatList skip its own layout measurement pass —
  // one of the highest-leverage FlatList perf wins for a uniform list.
  const getItemLayout = useCallback(
    (_data, index) => ({
      length: USER_CARD_HEIGHT,
      offset: USER_CARD_HEIGHT * index,
      index,
    }),
    []
  );

  const listEmptyComponent = useMemo(() => {
    if (status === 'loading') return null;
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>
          {searchQuery ? 'No users match that name.' : 'No users yet.'}
        </Text>
      </View>
    );
  }, [status, searchQuery]);

  const listFooterComponent = useMemo(() => {
    if (status === 'loadingMore') {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
        </View>
      );
    }
    if (!hasMore && users.length > 0 && !searchQuery) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>That's everyone.</Text>
        </View>
      );
    }
    // Don't show "Load More" while the user is actively searching —
    // it pages through the full list, not the filtered one.
    if (hasMore && !searchQuery) {
      return (
        <Pressable style={styles.loadMoreButton} onPress={handleLoadMore}>
          <Text style={styles.loadMoreText}>Load more</Text>
        </Pressable>
      );
    }
    return null;
  }, [status, hasMore, users.length, searchQuery, handleLoadMore]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Users</Text>
      </View>

      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
            Offline — showing cached data{error ? `: ${error}` : ''}
          </Text>
          <Pressable onPress={handleRetry}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      )}

      <SearchBar
        value={searchQuery}
        onChangeText={(text) => dispatch(searchQueryChanged(text))}
      />

      {status === 'loading' && users.length === 0 ? (
        <View style={styles.centerFill}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          ListEmptyComponent={listEmptyComponent}
          ListFooterComponent={listFooterComponent}
          // --- render-window tuning ---
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          windowSize={7}
          removeClippedSubviews
          contentContainerStyle={users.length === 0 && styles.emptyContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#16232e',
  },
  centerFill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flexGrow: 1,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 15,
    color: '#5b6b78',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#8a97a3',
  },
  loadMoreButton: {
    marginHorizontal: 40,
    marginVertical: 18,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2f6690',
    alignItems: 'center',
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  offlineBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fdecea',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  offlineText: {
    color: '#a63446',
    fontSize: 12,
    flex: 1,
    marginRight: 8,
  },
  retryText: {
    color: '#a63446',
    fontSize: 12,
    fontWeight: '700',
  },
});
