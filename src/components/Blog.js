import { useState } from 'react'

const Blog = ({ blog,  handleLike, handleRemove }) => {
  const [visible, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const removeBtnStyle = {
    backgroundColor: 'blue',
    color: 'white',
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setVisibility(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible && (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div>
            likes {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>{blog.author}</div>
          <button style={removeBtnStyle} onClick={() => handleRemove(blog)}>remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog
