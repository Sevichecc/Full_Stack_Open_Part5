import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsername,
  handlePassword,
  password,
  username,
  info
}) => {
  return (
    <div>
      <h2>log in to application</h2>
      <Notification info={info} />
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type='text'
            value={username}
            name='Username'
            onChange={handleUsername}
          />
        </div>
        <div>
          password:
          <input
            type='text'
            value={password}
            name='Password'
            onChange={handlePassword}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.PropTyps = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired
}

export default LoginForm
