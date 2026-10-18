import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { User } from './User';

const STORAGE_KEY = '@users_data';

export const useUserViewModel = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setUsers(JSON.parse(data));
      }
    } catch (e) {
      console.error('Помилка завантаження:', e);
    }
  };

  const addUser = async (user: Omit<User, 'id'>) => {
    const newUser: User = { ...user, id: Date.now().toString() };
    const updatedUsers = [...users, newUser];
    
    // Оновлюємо стан локально
    setUsers(updatedUsers);

    // Зберігаємо в AsyncStorage
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
    } catch (e) {
      console.error('Помилка збереження:', e);
    }
  };

  const pickImage = async (): Promise<string | null> => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Необхідний доступ до галереї!");
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }
    return null;
  };

  return { users, addUser, pickImage, loadUsers };
};