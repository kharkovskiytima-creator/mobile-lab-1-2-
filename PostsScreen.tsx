import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
  ScrollView,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const POSTS_STORAGE_KEY = '@instagram_posts_data';

const INITIAL_POSTS = [
  {
    id: '1',
    author: 'alex_dev',
    avatar: 'https://picsum.photos/id/1027/100/100',
    image: 'https://picsum.photos/id/1015/600/400',
    likes: 124,
    isLiked: false,
    caption: 'Чудовий день для розробки React Native додатків! 🚀',
    comments: ['Супер проєкт!', 'Гарний кадр 📸'],
  },
  {
    id: '2',
    author: 'marta_photo',
    avatar: 'https://picsum.photos/id/64/100/100',
    image: 'https://picsum.photos/id/1040/600/400',
    likes: 89,
    isLiked: false,
    caption: 'Осінні пейзажі та затишна кава ☕🍂',
    comments: ['Атмосферно!'],
  },
];

export const PostsScreen = ({ isDarkMode }: any) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [commentInput, setCommentInput] = useState<{ [key: string]: string }>({});
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCaption, setNewCaption] = useState('');
  const [newImageUri, setNewImageUri] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const saved = await AsyncStorage.getItem(POSTS_STORAGE_KEY);
      if (saved) {
        setPosts(JSON.parse(saved));
      } else {
        setPosts(INITIAL_POSTS);
      }
    } catch (e) {
      setPosts(INITIAL_POSTS);
    }
  };

  const savePosts = async (updatedPosts: any[]) => {
    setPosts(updatedPosts);
    try {
      await AsyncStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(updatedPosts));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleLike = (id: string) => {
    const updated = posts.map((post) => {
      if (post.id === id) {
        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          likes: isLiked ? post.likes + 1 : post.likes - 1,
        };
      }
      return post;
    });
    savePosts(updated);
  };

  const handleAddComment = (postId: string) => {
    const text = commentInput[postId];
    if (!text || !text.trim()) return;

    const updated = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...(post.comments || []), text.trim()],
        };
      }
      return post;
    });

    setCommentInput({ ...commentInput, [postId]: '' });
    savePosts(updated);
  };

  // Безпечний вибір фотографії з галереї пристрою
  const pickNewPostImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        alert('Необхідний доступ до галереї!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.6,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setNewImageUri(result.assets[0].uri);
      }
    } catch (err) {
      console.error('Помилка вибору фото:', err);
      alert('Помилка відкриття галереї. Спробуйте ще раз.');
    }
  };

  const handleCreatePost = () => {
    if (!newImageUri) {
      alert('Будь ласка, оберіть фотографію для поста');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      author: 'my_profile',
      avatar: 'https://picsum.photos/id/1005/100/100',
      image: newImageUri,
      likes: 0,
      isLiked: false,
      caption: newCaption || 'Нове фото 📸',
      comments: [],
    };

    const updated = [newPost, ...posts];
    savePosts(updated);

    setNewCaption('');
    setNewImageUri(null);
    setIsModalVisible(false);
  };

  const bgColor = isDarkMode ? '#121212' : '#ffffff';
  const cardBg = isDarkMode ? '#1e1e1e' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const subTextColor = isDarkMode ? '#aaaaaa' : '#666666';
  const inputBg = isDarkMode ? '#2a2a2a' : '#f0f0f0';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.addPostButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.addPostButtonText}>+ Створити новий пост</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.postCard, { backgroundColor: cardBg }]}>
            <View style={styles.header}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={[styles.author, { color: textColor }]}>{item.author}</Text>
            </View>

            <Image source={{ uri: item.image }} style={styles.postImage} />

            <View style={styles.footer}>
              <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.likeRow}>
                <Text style={styles.heartIcon}>{item.isLiked ? '❤️' : '🤍'}</Text>
                <Text style={[styles.likeCount, { color: textColor }]}>
                  {item.likes} {item.likes === 1 ? 'лайк' : 'лайків'}
                </Text>
              </TouchableOpacity>

              <Text style={[styles.caption, { color: textColor }]}>
                <Text style={styles.author}>{item.author} </Text>
                {item.caption}
              </Text>

              {item.comments && item.comments.length > 0 && (
                <View style={styles.commentsSection}>
                  {item.comments.map((comment: string, idx: number) => (
                    <Text key={idx} style={[styles.commentText, { color: subTextColor }]}>
                      💬 <Text style={{ fontWeight: '600', color: textColor }}>user: </Text>
                      {comment}
                    </Text>
                  ))}
                </View>
              )}

              <View style={styles.commentInputRow}>
                <TextInput
                  placeholder="Додати коментар..."
                  placeholderTextColor={subTextColor}
                  value={commentInput[item.id] || ''}
                  onChangeText={(text) =>
                    setCommentInput({ ...commentInput, [item.id]: text })
                  }
                  style={[
                    styles.commentInput,
                    { backgroundColor: inputBg, color: textColor },
                  ]}
                />
                <TouchableOpacity
                  onPress={() => handleAddComment(item.id)}
                  style={styles.sendButton}
                >
                  <Text style={styles.sendButtonText}>Опублікувати</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff' }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalTitle, { color: textColor }]}>
                Новий пост
              </Text>

              <TouchableOpacity style={styles.pickImageBtn} onPress={pickNewPostImage}>
                <Text style={styles.pickImageBtnText}>
                  {newImageUri ? 'Змінити фото' : 'Обрати фото з галереї'}
                </Text>
              </TouchableOpacity>

              {newImageUri && (
                <Image source={{ uri: newImageUri }} style={styles.previewImage} />
              )}

              <TextInput
                placeholder="Напишіть підпис до фото..."
                placeholderTextColor={subTextColor}
                value={newCaption}
                onChangeText={setNewCaption}
                multiline
                style={[
                  styles.captionInput,
                  { backgroundColor: inputBg, color: textColor },
                ]}
              />

              <View style={styles.modalActions}>
                <Button title="Опублікувати" color="#4CAF50" onPress={handleCreatePost} />
                <View style={{ marginTop: 10 }}>
                  <Button
                    title="Скасувати"
                    color="#FF5252"
                    onPress={() => setIsModalVisible(false)}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { padding: 12 },
  addPostButton: {
    backgroundColor: '#E1306C',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addPostButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
  postCard: { marginBottom: 20, borderRadius: 12, overflow: 'hidden', elevation: 2 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  avatar: { width: 38, height: 38, borderRadius: 19, marginRight: 10 },
  author: { fontWeight: 'bold', fontSize: 15 },
  postImage: { width: '100%', height: 300, resizeMode: 'cover' },
  footer: { padding: 12 },
  likeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  heartIcon: { fontSize: 22, marginRight: 6 },
  likeCount: { fontWeight: 'bold', fontSize: 15 },
  caption: { fontSize: 14, marginBottom: 8 },
  commentsSection: { marginTop: 6, marginBottom: 10 },
  commentText: { fontSize: 13, marginBottom: 4 },
  commentInputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  commentInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 13,
    marginRight: 8,
  },
  sendButton: { paddingHorizontal: 10 },
  sendButtonText: { color: '#2196F3', fontWeight: 'bold', fontSize: 13 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: { borderRadius: 16, padding: 20, maxHeight: '85%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  pickImageBtn: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  pickImageBtnText: { color: '#ffffff', fontWeight: 'bold' },
  previewImage: { width: '100%', height: 200, borderRadius: 8, marginBottom: 12 },
  captionInput: {
    padding: 12,
    borderRadius: 8,
    minHeight: 80,
    fontSize: 14,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  modalActions: { marginTop: 10 },
});