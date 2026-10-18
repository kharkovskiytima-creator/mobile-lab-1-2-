import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { useUserViewModel } from './UserViewModel';

export const HomeScreen = ({ navigation, isDarkMode, setIsDarkMode }: any) => {
  const { users } = useUserViewModel();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#ffffff' }]}>
      <View style={styles.content}>
        
        {/* ПЕРЕМИКАЧ ТЕМИ */}
        <View style={[styles.themeToggle, { borderColor: isDarkMode ? '#444' : '#ccc', backgroundColor: isDarkMode ? '#1e1e1e' : '#f9f9f9' }]}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>
            {isDarkMode ? '🌙 Темна тема' : '☀️ Світла тема'}
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={(value) => setIsDarkMode(value)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkMode ? '#2196F3' : '#f4f3f4'}
          />
        </View>

        {/* СПИСОК КОРИСТУВАЧІВ */}
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: isDarkMode ? '#2a2a2a' : '#f0f0f0' }]}>
              {item.photoUri ? (
                <Image source={{ uri: item.photoUri }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.placeholder]} />
              )}
              <View style={{ flex: 1 }}>
                <Text style={[styles.name, { color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.name}</Text>
                <Text style={{ color: isDarkMode ? '#ccc' : '#666' }}>{item.email}</Text>
                <Text style={{ color: isDarkMode ? '#ccc' : '#666' }}>{item.phone}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={[styles.empty, { color: isDarkMode ? '#aaa' : '#888' }]}>
              Список користувачів порожній
            </Text>
          }
        />

        {/* КНОПКА ДОДАВАННЯ */}
        <TouchableOpacity
          style={styles.customButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('UserForm')}
        >
          <Text style={styles.buttonText}>+ Додати користувача</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 16 },
  themeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 1,
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  placeholder: { backgroundColor: '#888' },
  name: { fontWeight: 'bold', fontSize: 16 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16 },
  customButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});