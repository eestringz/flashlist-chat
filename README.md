# FlashList Chat (React Native)

React Native 환경에서 **[@shopify/flash-list](https://github.com/Shopify/flash-list)** 를 사용해 구현한 **채팅 리스트 데모**입니다.  
특정 메시지로 바로 점프(앵커)하고, **양방향 페이지네이션**을 지원하는 구조를 실험했습니다.

---

## 📌 왜 이 프로젝트를 했나?

이 레포는 제가 실제로 진행 중인 채팅 프로젝트의 일부 아이디어를 **실험적으로 검증**하기 위해 만든 **데모 프로젝트**입니다.

- 기존 프로젝트에서는 `FlatList`를 사용했지만, inverted 모드/scrollToIndex 제약, 위쪽 무한 스크롤(`onStartReached` 미지원) 문제로 어려움을 겪었습니다.
- 그래서 FlashList를 활용해 **성능 최적화**와 **양방향 무한 스크롤**, **앵커 기반 점프(특정 메시지 중심으로 열기)** 를 어떻게 구현할 수 있는지 테스트했습니다.

👉 즉, 단순히 "채팅앱을 처음부터 만드는 것"이 아니라,  
**실제 서비스에서 발생한 문제를 풀기 위한 연구/실험용 레포**입니다.

---

## ✨ 주요 기능

- FlashList 기반 채팅 UI
- **Anchor Jump**: 특정 메시지 ID를 기준으로 바로 스크롤
- **Bi-directional Pagination**: 위/아래 방향 모두 무한 스크롤(load more)
- 초기 렌더링 시 `onEndReached` / `onStartReached`가 불필요하게 실행되지 않도록 제어
- `@tanstack/react-query`의 `useInfiniteQuery` 패턴을 적용해 더미 데이터 페이지네이션 구현

---

## 📂 프로젝트 구조

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
