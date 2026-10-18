import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, SafeAreaView, TouchableOpacity, Text, Alert } from 'react-native';
import { useUserViewModel } from './UserViewModel';

export const UserFormScreen = ({ navigation, isDarkMode }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);

  const { addUser, pickImage } = useUserViewModel();

  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) setPhotoUri(uri);
  };

  // Перевірка формату email за допомогою регулярного виразу
  const validateEmail = (emailStr: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr.trim());
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Будь ласка, введіть ім’я');
      return;
    }

    if (!email.trim()) {
      alert('Будь ласка, введіть Email');
      return;
    }

    // Перевіряємо чи формат Email правильний (наприклад: name@mail.com)
    if (!validateEmail(email)) {
      alert('Введіть коректну електронну пошту (наприклад, user@gmail.com)');
      return;
    }

    await addUser({ name, email: email.trim(), phone, photoUri });
    navigation.goBack();
  };

  // Кольори залежно від теми
  const bgColor = isDarkMode ? '#121212' : '#ffffff';
  const inputBg = isDarkMode ? '#2a2a2a' : '#ffffff';
  const inputBorder = isDarkMode ? '#444444' : '#cccccc';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const placeholderColor = isDarkMode ? '#aaaaaa' : '#888888';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.content}>
        <TextInput
          placeholder="Ім'я (*обов'язково)"
          placeholderTextColor={placeholderColor}
          value={name}
          onChangeText={setName}
          style={[styles.input, { backgroundColor: inputBg, borderColor: inputBorder, color: textColor }]}
        />
        <TextInput
          placeholder="Email (*обов'язково: user@mail.com)"
          placeholderTextColor={placeholderColor}
          value={email}
          onChangeText={setEmail}
          style={[styles.input, { backgroundColor: inputBg, borderColor: inputBorder, color: textColor }]}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Телефон"
          placeholderTextColor={placeholderColor}
          value={phone}
          onChangeText={setPhone}
          style={[styles.input, { backgroundColor: inputBg, borderColor: inputBorder, color: textColor }]}
          keyboardType="phone-pad"
        />

        <View style={styles.imageSection}>
          <Button title="Обрати фото профілю" onPress={handlePickImage} />
          {photoUri && <Image source={{ uri: photoUri }} style={styles.preview} />}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Зберегти</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, flex: 1 },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  imageSection: {
    marginVertical: 16,
    alignItems: 'center',
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 12,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});