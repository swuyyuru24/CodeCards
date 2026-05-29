import { useRef, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { insertCard } from '../db/cards';
import type { RootTabParamList } from '../navigation';

type Nav = BottomTabNavigationProp<RootTabParamList>;

export default function CaptureScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const navigation = useNavigation<Nav>();

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Loading camera…</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Camera access needed</Text>
        <Text style={styles.subtitle}>
          CodeCards needs your camera to snap code and turn it into flashcards.
        </Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant permission</Text>
        </Pressable>
      </View>
    );
  }

  const handleUsePhoto = async () => {
    if (!photoUri || saving) return;
    setSaving(true);
    try {
      await insertCard({
        mode: 'dsa',
        problem: 'Untitled card from photo',
        approach: null,
        timeComplexity: null,
        spaceComplexity: null,
        keyInsight: null,
        edgeCases: null,
        difficulty: null,
        patterns: [],
        confidence: 3,
        nextReviewAt: null,
        photoUri,
      });
      setPhotoUri(null);
      navigation.navigate('Decks');
    } finally {
      setSaving(false);
    }
  };

  if (photoUri) {
    return (
      <View style={styles.preview}>
        <Image source={{ uri: photoUri }} style={styles.previewImage} />
        <View style={styles.previewActions}>
          <Pressable
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => setPhotoUri(null)}
            disabled={saving}
          >
            <Text style={styles.buttonText}>Retake</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={handleUsePhoto}
            disabled={saving}
          >
            <Text style={styles.buttonText}>
              {saving ? 'Saving…' : 'Use photo'}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const handleCapture = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.8 });
    if (photo?.uri) setPhotoUri(photo.uri);
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />
      <View style={styles.controls}>
        <Pressable style={styles.shutter} onPress={handleCapture}>
          <View style={styles.shutterInner} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  controls: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  shutter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 8 },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#1f6feb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonSecondary: { backgroundColor: '#444' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '500' },
  preview: { flex: 1, backgroundColor: '#000' },
  previewImage: { flex: 1, resizeMode: 'contain' },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    backgroundColor: '#000',
  },
});
