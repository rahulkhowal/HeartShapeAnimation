# Heart Animation React Native App

A React Native app featuring an interactive heart animation component that responds to user taps with smooth animations.

## Features

- **Heart Animation Component**: A customizable heart icon with click animations
- **Multiple Animation Types**: Scale, opacity, and rotation animations
- **Interactive Feedback**: Visual feedback on tap with color changes
- **Responsive Design**: Adapts to different screen sizes
- **Modern UI**: Clean, modern interface with proper spacing and typography

## Animation Details

The heart animation includes:
- **Scale Animation**: Heart grows to 1.3x size and returns to normal
- **Opacity Animation**: Brief opacity change for visual feedback
- **Rotation Animation**: 360-degree rotation on each tap
- **Color Change**: Toggles between green (unliked) and red (liked)

## Project Structure

```
HeartAnimationApp/
├── src/
│   └── components/
│       └── HeartAnimation.tsx    # Main heart animation component
├── App.tsx                       # Main app component
├── package.json                  # Dependencies
└── README_HEART_ANIMATION.md    # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- React Native CLI
- iOS Simulator (for iOS) or Android Emulator (for Android)
- CocoaPods (for iOS)

### Installation

1. Navigate to the project directory:
   ```bash
   cd HeartAnimationApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. For iOS, install CocoaPods dependencies:
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App

#### iOS
```bash
npx react-native run-ios
```

#### Android
```bash
npx react-native run-android
```

## Usage

The app displays a heart icon in the center of the screen. Simply tap the heart to see the animation:

1. **First Tap**: Heart animates and changes to red (liked state)
2. **Second Tap**: Heart animates and changes back to green (unliked state)
3. **Each Tap**: Triggers scale, opacity, and rotation animations

## Customization

The `HeartAnimation` component accepts the following props:

- `size`: Number - Size of the heart container (default: 60)
- `onPress`: Function - Callback function when heart is pressed

## Technologies Used

- React Native 0.81.0
- TypeScript
- React Native Animated API
- React Native Safe Area Context

## License

This project is created for educational purposes.
