import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import HeartAnimation from './HeartAnimation';

const HeartRow: React.FC = () => {
  const [likedHearts, setLikedHearts] = useState<boolean[]>([false, false, false, false, false, false]);

  const handleHeartPress = (index: number) => {
    const newLikedHearts = [...likedHearts];
    newLikedHearts[index] = !newLikedHearts[index];
    setLikedHearts(newLikedHearts);
  };

  const getLikedCount = () => {
    return likedHearts.filter(liked => liked).length;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heart Animation Row</Text>
      <Text style={styles.subtitle}>Click any combination of hearts!</Text>
      
      <View style={styles.heartRow}>
        {likedHearts.map((isLiked, index) => (
          <View key={index} style={styles.heartWrapper}>
            <HeartAnimation
              size={50}
              onPress={() => handleHeartPress(index)}
            />
            <Text style={styles.heartNumber}>{index + 1}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Hearts Liked: {getLikedCount()}/6
        </Text>
        <Text style={styles.instructionText}>
          Tap any heart to see individual animations!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 30,
    textAlign: 'center',
  },
  heartRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  heartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartNumber: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 8,
    fontWeight: '500',
  },
  statsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ed573',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default HeartRow;
