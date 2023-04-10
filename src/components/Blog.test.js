import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url and likes by default', () => {
  const mockBlog = {
    title: 'Test Blog',
    author: 'John Doe',
    url: 'https://test-blog.com',
    likes: 5,
  }
  render(<Blog blog={mockBlog} />)

  // Check if title and author are rendered
  expect(screen.getByText(mockBlog.title + mockBlog.author)).toBeDefined()

  // Check if url and likes are not rendered by default
  expect(screen.queryByTestId('url')).not.toBeInTheDocument()
  expect(screen.queryByTestId('likes')).not.toBeInTheDocument()
})
