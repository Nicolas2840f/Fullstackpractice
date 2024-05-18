import { useState, useEffect } from "react";
import blogService from "./services/blogs";

const Blog = ({ blog, changeLike }) => {
  const [check, setCheck] = useState(blog.check);

  const handleCheckboxChange = (e) => {
    setCheck(e.target.checked);
    changeLike(e);
  };

  return (
    <div>
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <input
        type="checkbox"
        onChange={handleCheckboxChange}
        checked={check}
      />
      <p>{blog.likes}</p>
    </div>
  );
};


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setTitle] = useState("");
  const [newAutor, setAutor] = useState("");
  const [newUrl, setUrl] = useState("");
  const [check, setCheck] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    blogService.getAll().then((initialBlogs) =>{
      console.log(initialBlogs)
      setBlogs(initialBlogs)
    });
  }, []);

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeAutor = (e) => {
    setAutor(e.target.value);
  };

  const changeUrl = (e) => {
    setUrl(e.target.value);
  };

  const changeLike = (e) => {
    if (e.target.checked == true) {
      setCheck((check) => !check);
      setLikes((newLike) => newLike + 1);
      console.log(likes);
    } else {
      setCheck((check) => check);
      console.log(check);
      setLikes((newLike) => newLike - 1);
      console.log(likes);
    }
  };
  const addBlog = (event) => {
    event.preventDefault();
    const blog = {
      title: newTitle,
      autor: newAutor,
      url: newUrl,
      likes: 0
    };
    blogService.addBlog(blog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setTitle("");
      setAutor("");
      setUrl("");
      setCheck(false);
    });
  };
  return (
    <>
      <div>
        <h1>Blogs</h1>
        <ul>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={{...blog,changeLike}} />
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
            value={newAutor}
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
