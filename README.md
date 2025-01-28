# TubeViewer App

## Overview

TubeViewer is a React Native application built with Expo that allows users to search for YouTube videos, play the video within the app, and manage a list of recently viewed and favorite videos. The app provides a seamless user experience with light/dark theme switching and persistent storage of user preferences.

---

## Technologies and Libraries Used

- **React Native**: For building the mobile application.
- **Expo**: To simplify app development and testing.
- **React Navigation**: For managing navigation between screens.
- **React TanStack Query**: For fetching and caching data from YouTube's API.
- **AsyncStorage**: To persist user data locally (e.g., favorites, recent videos, and theme preferences).
- **YouTube Data API**: For fetching video search results and details.
- **react-native-youtube-iframe**: For playing YouTube videos directly within the app.
- **SwipeListView**: For managing swipeable lists (e.g., recent videos and favorites).

---

## Features

1. **YouTube Video Search**: Users can search for videos and view search results instantly.
2. **Video Playback**: Videos can be played directly within the app.
3. **Favorites Management**: Add videos to favorites for quick access with a limit to prevent overflow.
4. **Recently Viewed Videos**: Automatically tracks the last 10 videos viewed.
5. **Search History**: Displays previous search queries for easy reuse.
6. **Theme Switching**: Supports light and dark themes with the ability to toggle dynamically.
7. **Persistent Storage**: Saves user preferences (favorites, recent videos, and theme) locally.

---

## Installation

### Download as a ZIP File

1. Go to the repository page on GitHub.

2. Click the green **Code** button and select **Download ZIP**.

3. Extract the ZIP file to your local machine.

4. Navigate to the extracted folder:

   ```bash
   cd tubeViewer-app
   ```

5. Install dependencies:

   ```bash
   npm install
   ```

6. Start the application:

   ```bash
   npx expo start
   ```

---

## How to Use

1. Launch the app and search for videos using the search bar.
2. Tap on a video to play it within the app and view its details.
3. Add videos to your favorites for quick access later.
4. Access your favorite and recently viewed videos from the home screen.
5. Switch between light and dark themes using the toggle button in the header.
