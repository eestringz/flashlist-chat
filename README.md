# FlashList Chat Demo (React Native)

A **React Native** demo project showcasing how to build a **chat UI with [@shopify/flash-list](https://github.com/Shopify/flash-list)**.  
This experiment focuses on supporting **anchor jump** (scrolling directly to a target message) and **bi-directional pagination**.

---

## 📌 Why this project?

This repository is not a generic chat template.  
It was created as an **experimental playground** while working on a real chat project where we faced limitations with `FlatList`:

- FlatList’s `inverted` mode made it difficult to maintain scroll position.
- FlatList does not support `onStartReached`, making top pagination harder.
- Jumping to a specific message (`scrollToIndex`) was unreliable in long lists.

So I explored FlashList to see how we can solve these issues and improve performance in chat UIs.

👉 This repo is intentionally structured for **testing** these behaviors, not as a production-ready app.

---

## ✨ Features

- Chat UI built with **FlashList**
- **Anchor Jump**: jump directly to a given message by ID
- **Bi-directional Infinite Scroll** (`onStartReached` + `onEndReached`)
- Initial render skips auto-triggering `onStartReached` / `onEndReached`
- Pagination powered by **`useInfiniteQuery`** from [@tanstack/react-query](https://tanstack.com/query)

---

## 🚀 Getting Started

### 1) Install dependencies

```bash
npm install
# or
yarn install
```

### 2) Start Metro

```bash
npm start
# or
yarn start
```

### 3) Run the app

```bash
# Android
npm run android
# iOS
npm run ios
```

---

## 📝 Sample Code

```tsx
<FlashList
  ref={listRef}
  data={messages}
  renderItem={({item}) => <MessageBubble message={item} />}
  keyExtractor={item => item.id}
  estimatedItemSize={60}
  onStartReached={() => {
    if (!userScrolling.current) return;
    loadMoreTop();
  }}
  onEndReached={() => {
    if (!userScrolling.current) return;
    loadMoreBottom();
  }}
  onMomentumScrollBegin={() => {
    userScrolling.current = true;
  }}
  maintainVisibleContentPosition={{
    autoscrollToTopThreshold: 50,
    startRenderingFromBottom: true,
  }}
/>
```

---

## 🔗 References

- [React Native Documentation](https://reactnative.dev)
- [FlashList GitHub](https://github.com/Shopify/flash-list)

---
