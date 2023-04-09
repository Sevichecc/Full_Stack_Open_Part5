import { useState } from 'react'
const Blog = ({ blog }) => {
  const [visible, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisibility(!visible)}> { visible ? "hide" :" view"}</button>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button>like</button>
          </p>
          <p>{blog.author}</p>
        </div>
      )}
    </div>
  )
}

export default Blog
