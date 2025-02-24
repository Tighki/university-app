import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { LessonCard } from './LessonCard';
import { theme } from '../../theme/theme';

export const AnimatedLessonCard = (props) => {
  const scale = useSharedValue(1);
  const elevation = useSharedValue(theme.shadows.small.elevation);

  // Animation styles for card interaction
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    elevation: elevation.value,
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.98);
    elevation.value = withTiming(theme.shadows.medium.elevation);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
    elevation.value = withTiming(theme.shadows.small.elevation);
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={animatedStyle}>
        <LessonCard {...props} />
      </Animated.View>
    </Pressable>
  );
}; 