import { authors, posts } from "../db.js";

export const root = {
  posts() {
    return posts;
  },
  addPost({ inputPost }) {
    if (inputPost.title.length < 5) {
      const err = new Error("input Invalid");
      err.status = 422;
      throw err;
    }

    const author = authors.find((author) => author.id === inputPost.authorId);
    const count = posts.push({
      id: +new Date(),
      title: inputPost.title,
      content: inputPost.content,
      author,
    });
    

    const lastindex = count - 1
    return posts[lastindex];
  },
};
 