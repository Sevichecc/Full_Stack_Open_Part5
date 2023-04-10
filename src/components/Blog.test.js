import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const mockBlog = {
  title: 'Test Blog',
  author: 'John Doe',
  url: 'https://test-blog.com',
  likes: 5,
}
test('renders title and author but not url and likes by default', () => {
  render(<Blog blog={mockBlog} />)
  // Check if title and author are rendered
  expect(screen.getByText(mockBlog.title + mockBlog.author)).toBeDefined()

  // Check if url and likes are not rendered by default
  expect(screen.queryByTestId('url')).not.toBeInTheDocument()
  expect(screen.queryByTestId('likes')).not.toBeInTheDocument()
})

test('shows url and likes when view button is clicked', async () => {
  render(<Blog blog={mockBlog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.queryByTestId('url')).toBeDefined()
  expect(screen.queryByTestId('likes')).toBeDefined()
})
