class Blog {
  id: number;
  author_name: string;
  author_username: string;
  title: string;
  body: string;
  created_date: Date; // Date can be handled as a JavaScript Date object
  blog_cover: string; // Use string for base64-encoded image data or URL

  constructor(
    id: number,
    author_name: string,
    author_username: string,
    title: string,
    body: string,
    created_date: Date,
    blog_cover: string // Update to string to hold base64 or URL
  ) {
    this.id = id;
    this.author_name = author_name;
    this.author_username = author_username;
    this.title = title;
    this.body = body;
    this.created_date = created_date;
    this.blog_cover = blog_cover; // Update to string
  }
}

export default Blog;