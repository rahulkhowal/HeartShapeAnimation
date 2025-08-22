import React, {useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Text,
} from 'react-native';

interface HeartAnimationProps {
  size?: number;
  onPress?: () => void;
}

const HeartAnimation: React.FC<HeartAnimationProps> = ({
  size = 60,
  onPress,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showExtraView, setShowExtraView] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const extraViewOpacity = useRef(new Animated.Value(0)).current;
  const extraViewScale = useRef(new Animated.Value(0.5)).current;

  const handlePress = () => {
    setIsLiked(!isLiked);
    
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();


    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();


    if (!isLiked) {
      setShowExtraView(true);
      extraViewOpacity.setValue(0);
      extraViewScale.setValue(0.5);

      Animated.parallel([
        Animated.timing(extraViewOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(extraViewScale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

    
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(extraViewOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(extraViewScale, {
            toValue: 0.5,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setShowExtraView(false);
        });
      }, 1500);
    }

    if (onPress) {
      onPress();
    }
  };


  const heartColor = '#2ed573'; 
  const shakeTranslate = shakeAnim.interpolate({
    inputRange: [-10, 10],
    outputRange: ['-10deg', '10deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        style={styles.touchable}>
        <Animated.View
          style={[
            styles.heartContainer,
            {
              width: size,
              height: size,
              transform: [
                {scale: scaleAnim},
                {rotate: shakeTranslate}, 
              ],
              opacity: opacityAnim,
            },
          ]}>
          <View style={[styles.heart, {borderColor: heartColor}]}>
            <Text style={[styles.heartText, {color: heartColor}]}>
              {isLiked ? '❤️' : '♡'}
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
      
      {showExtraView && (
        <Animated.View
          style={[
            styles.extraView,
            {
              opacity: extraViewOpacity,
              transform: [{scale: extraViewScale}],
            },
          ]}>
          <View style={styles.extraStarContainer}>
            <Text style={styles.extraStarText}>⭐</Text>
          </View>
        </Animated.View>
      )}
      
      <Text style={styles.statusText}>
        {isLiked ? 'Liked!' : 'Tap to like'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heart: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 25,
    width: 50,
    height: 50,
    backgroundColor: 'white',
  },
  heartText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  extraView: {
    position: 'absolute',
    left: -50, 
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extraStarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#2ed573', 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  extraStarText: {
    fontSize: 20,
    color: '#2ed573', 
  },
  extraText: {
    fontSize: 14,
    color: '#2ed573',
    fontWeight: 'bold',
  },
  statusText: {
    marginTop: 16,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default HeartAnimation;
