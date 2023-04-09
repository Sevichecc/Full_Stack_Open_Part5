import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [info, setInfo] = useState({ message: null })

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type = 'info') => {
    setInfo({
      message,
      type,
    })
    setTimeout(() => {
      setInfo({ message: null })
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging with', username, password)
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      notifyWith('Wrong username or pass word', 'error')
      console.log(error)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }

    await blogService.create(blogObject)
    setBlogs(blogs.concat(blogObject))
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
    notifyWith(`a new blog ${blogTitle} by ${blogAuthor}`)
  }

  if (!user) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        handleUsername={({ target }) => setUsername(target.value)}
        handlePassword={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
        info={info}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification info={info} />
      <span>{user.username} logged in </span>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new blog">
        <BlogForm
          blogTitle={blogTitle}
          blogAuthor={blogAuthor}
          blogUrl={blogUrl}
          handleSubmit={addBlog}
          handleAuthor={({ target }) => setBlogAuthor(target.value)}
          handleTitle={({ target }) => setBlogTitle(target.value)}
          handleUrl={({ target }) => setBlogUrl(target.value)}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
