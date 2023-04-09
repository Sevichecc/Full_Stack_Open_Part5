import Notification
  from "./Notification"
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

export default LoginForm
