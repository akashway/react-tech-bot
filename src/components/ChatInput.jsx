function ChatInput(props = {}) {
  const {
    input = "",
    inputChangeHandler = () => {},
    inputSubmitHandler = () => {},
  } = props

  function changeHandler(e) {
    inputChangeHandler(e.target.value)
  }

  function submitHandler(e) {
    e.preventDefault()
    inputSubmitHandler()
  }

  return (
    <div className="input-container">
      <div className="textarea-wrapper">
        <form onSubmit={submitHandler}>
          <textarea
            name="input"
            id="input"
            value={input}
            onChange={changeHandler}
          ></textarea>
          <button type="submit" className="submit-button">Send</button>
        </form>
      </div>
    </div>
  )
}

export default ChatInput
