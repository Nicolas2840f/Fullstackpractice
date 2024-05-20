import { useState, useEffect } from "react";
import blogService from "./services/blogs";

const Blog = ({ blog, updateBlog }) => {
  const [likes, setLikes] = useState(blog.likes);

  const handleCheckboxChange = (e) => {
    console.log(e.target.checked);
    if (e.target.checked == true) {
      const updatedBlog = {
        ...blog,
      };
      updateBlog(updatedBlog);
    } else {
      const updatedBlog = {
        ...blog,
        likes: likes - 1,
      };
      updateBlog(updatedBlog);
    }
  };

  return (
    <div>
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <label className="like">
        <input type="checkbox" onChange={handleCheckboxChange} />
        <span></span>
      </label>
      <p>{blog.likes}</p>
    </div>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setTitle] = useState("");
  const [newAuthor, setAuthor] = useState("");
  const [newUrl, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeAutor = (e) => {
    setAuthor(e.target.value);
  };

  const changeUrl = (e) => {
    setUrl(e.target.value);
  };

  const updateBlog = (updatedBlog) => {
    blogService.updateBlog(updatedBlog.id, updatedBlog).then((returnedBlog) => {
      setBlogs(
        blogs.map((blog) => (blog.id !== returnedBlog.id ? blog : returnedBlog))
      );
    });
  };
  const addBlog = (event) => {
    event.preventDefault();
    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    };
    blogService.addBlog(blog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
    });
  };
  return (
    <>
      <div>
        <h1>Blogs</h1>
        <ul>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
          ))}
        </ul>
      </div>
      <div>
        <form className="form" onSubmit={addBlog}>
          <h2>New Blog</h2>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            className="box"
            value={newTitle}
            onChange={changeTitle}
          />
          <label htmlFor="autor">Author</label>
          <input
            id="autor"
            type="text"
            className="box"
            value={newAuthor}
            onChange={changeAutor}
          />
          <label htmlFor="url">Blog link</label>
          <input
            id="url"
            type="text"
            className="box"
            value={newUrl}
            onChange={changeUrl}
          />
          <button className="box">Add</button>
        </form>
      </div>
    </>
  );
};

export default App;
