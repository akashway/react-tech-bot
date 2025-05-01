import { useRef, useState } from "react"
import "./App.css"
import ChatInput from "./components/ChatInput"
import ChatWindow from "./components/ChatWindow"
import searchService from "./services/searchService"
import APIConnection from "./services/APIConnection"
import { EXACT_MATCH, REACT_KEYWORD_MATCH, NO_MATCH } from "./constant/constant"

function App() {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState([])

  function getQuestionAnswerFromResponse() {
    const result = response.map((item) => {
      return (
        <ChatWindow
          key={item.question}
          question={item.question}
          answer={item.answer}
        />
      )
    })
    return result
  }

  function submitClickHandler() {
    let promptMatching = searchService(input)
    if (promptMatching.matchStatus === EXACT_MATCH) {
      setResponse((prevState) => {
        return [
          ...prevState,
          { question: promptMatching.prompt, answer: promptMatching.response },
        ]
      })
    }

    if (promptMatching.matchStatus === REACT_KEYWORD_MATCH) {
      let promptToLLM = promptMatching.response
      const llmResponsePromise = APIConnection(promptToLLM)
      llmResponsePromise.then(function (data) {
        setResponse((prevState) => {
          return [...prevState, { question: promptToLLM, answer: data }]
        })
      })
    }

    if (promptMatching.matchStatus === NO_MATCH) {
      alert("Please ask question related to React Only. Thank you")
    }

    setInput("")
    return
  }

  function inputOnChangeHandler(value) {
    console.log("onchange")
    setInput(value)
  }

  return (
    <div className="container">
      <div className="chat-window">
        Chat Window
        {response.length > 0 && getQuestionAnswerFromResponse()}
      </div>
      <ChatInput
        value={input}
        onChange={inputOnChangeHandler}
        onClick={submitClickHandler}
      />
    </div>
  )
}

export default App
