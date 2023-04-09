import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisble] = useState(false)

  const hideWhenVisble = { display: visible ? 'none' : '' }
  const showWhenVisble = { display: visible ? '' : 'none' }

  const toggleVisbility = () => setVisble(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisbility
    }
  })

  return (
    <div>
      <div style={hideWhenVisble}>
        <button onClick={toggleVisbility}>{ props.buttonLabel}</button>
      </div>
      <div style={showWhenVisble}>
        {props.children}
        <button onClick={toggleVisbility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable