import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  SetNotification,
  useNotificationDispatch,
} from "../components/NotificationContext";
import { likeBlog, createBlog, getBlogs, deleteBlog } from "./requests";


export const useBlog = () => {
  const fetchQuery = useQuery("blogs", getBlogs, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { blogs: fetchQuery };
};

export const usePostBlog = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newBlogMutation = useMutation(createBlog, {
    onSuccess: (newBlog) => {
      const anecdotes = queryClient.getQueryData("blogs");
      queryClient.setQueryData("blogs", anecdotes.concat(newBlog));
      SetNotification(notificationDispatch, { content: "Success!" }, 3);
    },
    onError: () => {
      SetNotification(
        notificationDispatch,
        { content: "Some error occured!", type: "Error" },
        3
      );
    },
  });

  return (blog) => newBlogMutation.mutate(blog);
};


export const useLikeBlog = () => {
  const queryClient = useQueryClient();

  const likeBlogMutation = useMutation(likeBlog, {
    onSuccess: (likedBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      const blogToLike = blogs.find((e) => e.id === likedBlog.id);
      blogToLike.likes = likedBlog.likes;
      queryClient.setQueryData("blogs", blogs);
    },
  });

  return (blog) => likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const deleteBlogHandler = (id) => {
    deleteBlog(id)
      .then(() => {
        const blogs = queryClient.getQueryData("blogs");
        const filteredBlogs = blogs.filter((e) => e.id !== id);
        queryClient.setQueryData("blogs", filteredBlogs);
        SetNotification(notificationDispatch, { content: "Blog deleted succesfully!" }, 3);
      })
      .catch(() => {
        SetNotification(
          notificationDispatch,
          { content: "Some error occured!", type: "Error" },
          3
        );
      });
  };

  const deleteBlogMutation = useMutation(deleteBlogHandler);

  return (id) => deleteBlogMutation.mutate(id);
};
