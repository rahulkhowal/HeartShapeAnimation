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
  const extraViewScale = useRef(new Animated.Value(0)).current;
  const extraViewPosition = useRef(new Animated.Value(0)).current;

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
        toValue: 25,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -25,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 25,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -25,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 15,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -15,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 60,
        useNativeDriver: true,
      }),
    ]).start();

 
    if (!isLiked) {
      setShowExtraView(true);
      extraViewOpacity.setValue(0);
      extraViewScale.setValue(0);
      extraViewPosition.setValue(0);
      

      Animated.parallel([
        Animated.timing(extraViewOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(extraViewScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(extraViewPosition, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(extraViewOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(extraViewScale, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(extraViewPosition, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setShowExtraView(false);
        });
      }, 3500);
    }

    if (onPress) {
      onPress();
    }
  };

 
  const heartColor = '#2ed573'; 
  const shakeTranslate = shakeAnim.interpolate({
    inputRange: [-25, 25],
    outputRange: ['-25deg', '25deg'],
  });


  const extraViewLeft = extraViewPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50], 
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
      
      {/* Extra view that generates from heart and shakes together with heart */}
      {showExtraView && (
        <Animated.View
          style={[
            styles.extraView,
            {
              opacity: extraViewOpacity,
              transform: [
                {scale: extraViewScale},
                {translateX: extraViewLeft}, 
                {rotate: shakeTranslate}, 
              ],
            },
          ]}>
          <View style={styles.extraStarContainer}>
            <Text style={styles.extraStarText}>⭐</Text>
          </View>
          <Text style={styles.extraText}>Liked!</Text>
        </Animated.View>
      )}
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
    backgroundColor: '#f0f0f0', 
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  heart: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 25,
    width: 50,
    height: 50,
    backgroundColor: 'transparent', 
  },
  heartText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  extraView: {
    position: 'absolute',
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
});

export default HeartAnimation;
