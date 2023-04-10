import { useState } from 'react'

const Blog = ({ blog,  handleLike, handleRemove }) => {
  const [visible, setVisibility] = useState(false)

  const removeBtnStyle = {
    backgroundColor: 'blue',
    color: 'white',
  }

  return (
    <div className='blog'>
      {blog.title}{blog.author}
      <button onClick={() => setVisibility(!visible)} id='visibility'>
        {visible ? 'hide' : 'view'}
      </button>
      {visible && (
        <div>
          <a href={blog.url} className='url'>{blog.url}</a>
          <div className='likes'>
            likes {blog.likes}
            <button onClick={() => handleLike(blog)} id='like'>like</button>
          </div>
          <div>{blog.author}</div>
          <button style={removeBtnStyle} onClick={() => handleRemove(blog)}>remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog
