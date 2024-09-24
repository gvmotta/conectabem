import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Comment, Meta } from '@/types/api';

export const getComments = ({
  discussionId,
  page = 1,
  cookie,
}: {
  discussionId: string;
  page?: number;
  cookie?: string;
}): Promise<{ data: Comment[]; meta: Meta }> => {
  return api.get(`/comments`, {
    params: {
      discussionId,
      page,
    },
    cookie,
  });
};

export const getInfiniteCommentsQueryOptions = (
  discussionId: string,
  cookie?: string,
) => {
  return infiniteQueryOptions({
    queryKey: ['comments', discussionId],
    queryFn: ({ pageParam = 1 }) => {
      return getComments({ discussionId, page: pageParam as number, cookie });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.page === lastPage?.meta?.totalPages) return undefined;
      const nextPage = lastPage.meta.page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  });
};

type UseCommentsOptions = {
  discussionId: string;
  page?: number;
  queryConfig?: QueryConfig<typeof getComments>;
};

export const useInfiniteComments = ({ discussionId }: UseCommentsOptions) => {
  return useInfiniteQuery({
    ...getInfiniteCommentsQueryOptions(discussionId),
  });
};
