/* eslint-disable @typescript-eslint/no-unused-vars */

import {useInfiniteQuery} from '@tanstack/react-query';
import {useCallback} from 'react';

interface FetchChatMessagesProps {
  roomId: string;
  enableApiCall: boolean;
  startPage?: number;
}

// ChatMessageType 은 기존 타입을 그대로 써도 되고, 간단히 흉내내도 됨
export interface ChatMessageType {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

// 전체 더미 데이터 (최신 → 과거 정렬)
const TOTAL_COUNT = 3;
const PAGE_SIZE = 100;

const ALL_MESSAGES: ChatMessageType[] = Array.from({length: TOTAL_COUNT}).map(
  (_, i) => {
    const idx = TOTAL_COUNT - i; // 최신이 앞쪽
    return {
      id: `msg-${idx}`,
      text: `더미 메시지 ${idx}`,
      sender: idx % 2 === 0 ? 'user' : 'other',
      timestamp: new Date(Date.now() - i * 60000),
    };
  },
);

// 실제 API 흉내내는 타입
export interface FetchPreviouseMessageResponse {
  list: ChatMessageType[];
  cur_page: number;
  total_pages: number;
  total_size: number;
  per_page: number;
  success: boolean;
  code: number;
  msg: string;
}

const fetchMessages = async ({
  roomId,
  page,
}: {
  roomId: string;
  page: number;
}): Promise<FetchPreviouseMessageResponse> => {
  const totalPages = Math.ceil(TOTAL_COUNT / PAGE_SIZE);

  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const slice = ALL_MESSAGES.slice(start, end); // 최신 → 과거

  return {
    list: slice,
    cur_page: page,
    total_pages: totalPages,
    total_size: TOTAL_COUNT,
    per_page: PAGE_SIZE,
    success: true,
    code: 200,
    msg: 'ok',
  };
};

const useChatMessages = ({
  roomId,
  enableApiCall,
  startPage,
}: FetchChatMessagesProps) => {
  const {
    data: chatMessages,
    isLoading,
    error,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetched,
    isFetching,
  } = useInfiniteQuery<FetchPreviouseMessageResponse>({
    queryKey: ['CHAT_MESSAGES', roomId],
    queryFn: ({pageParam = 0}) => {
      return fetchMessages({roomId, page: pageParam as number});
    },

    initialPageParam: startPage ?? 0,
    getNextPageParam: lastPage =>
      lastPage.cur_page + 1 < lastPage.total_pages
        ? lastPage.cur_page + 1
        : null, // 과거
    getPreviousPageParam: firstPage =>
      firstPage.cur_page - 1 >= 0 ? firstPage.cur_page - 1 : null, // 최신

    enabled: enableApiCall,
    staleTime: 1000 * 60 * 5,
  });

  const loadMoreTop = useCallback(() => {
    if (hasNextPage && !isFetching) fetchNextPage();
  }, [hasNextPage, isFetching, fetchNextPage]);

  const loadMoreBottom = useCallback(() => {
    if (hasPreviousPage && !isFetching) fetchPreviousPage();
  }, [hasPreviousPage, isFetching, fetchPreviousPage]);

  return {
    chatMessages,
    loadMoreTop,
    loadMoreBottom,
    isFetched,
    isLoading,
    error,
    hasNextPage,
  };
};

export default useChatMessages;
