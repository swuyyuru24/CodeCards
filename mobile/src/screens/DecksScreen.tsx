import { useCallback, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { listCards } from '../db/cards';
import type { Card, Mode } from '../types/Card';

const MODE_LABEL: Record<Mode, string> = {
  dsa: 'DSA',
  sql: 'SQL',
  system_design: 'System Design',
};

export default function DecksScreen() {
  const [cards, setCards] = useState<Card[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      setCards(await listCards());
    } finally {
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  if (cards.length === 0 && !refreshing) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>No cards yet</Text>
        <Text style={styles.emptySub}>
          Snap some code on the Capture tab to get started.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={cards}
      keyExtractor={(c) => String(c.id)}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={load} />
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.mode}>{MODE_LABEL[item.mode]}</Text>
            {item.difficulty && (
              <Text style={styles.difficulty}>{item.difficulty}</Text>
            )}
          </View>
          <Text style={styles.problem}>{item.problem}</Text>
          {item.patterns.length > 0 && (
            <View style={styles.patternRow}>
              {item.patterns.map((p) => (
                <Text key={p} style={styles.patternChip}>
                  {p}
                </Text>
              ))}
            </View>
          )}
          <Text style={styles.confidence}>
            Confidence: {'█'.repeat(item.confidence)}
            {'░'.repeat(5 - item.confidence)} {item.confidence}/5
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  mode: { fontSize: 12, fontWeight: '600', color: '#1f6feb' },
  difficulty: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textTransform: 'capitalize',
  },
  problem: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  patternRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  patternChip: {
    fontSize: 12,
    backgroundColor: '#eef2ff',
    color: '#1f6feb',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 6,
    marginTop: 4,
  },
  confidence: { fontSize: 12, color: '#666', fontFamily: 'Courier' },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: { fontSize: 18, fontWeight: '600', marginBottom: 6 },
  emptySub: { fontSize: 14, color: '#666', textAlign: 'center' },
});
