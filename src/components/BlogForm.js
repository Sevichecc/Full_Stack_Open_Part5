const BlogForm = ({
  blogTitle,
  blogAuthor,
  blogUrl,
  handleSubmit,
  handleAuthor,
  handleTitle,
  handleUrl,
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input type='text' value={blogTitle} onChange={handleTitle} />
        </div>
        <div>
          author:
          <input type='text' value={blogAuthor} onChange={handleAuthor} />
        </div>
        <div>
          url:
          <input type='text' value={blogUrl} onChange={handleUrl} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
