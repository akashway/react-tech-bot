import { useState } from "react"
import ChatInput from "./ChatInput"
import ChatWindow from "./ChatWindow"
import APIConnection from "../services/APIConnection"


function Dashboard() {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState([])

  function inputChangeHandler(value) {
    setInput(value)
  }

  async function inputSubmitHandler() {
    const streamData = APIConnection(input)
    setInput("")
    let setLoadingFalse=false
    for await (const chunk of streamData) {
      if (chunk == "loading_start") {
        setResponse((prevState) => {
          prevState.push({ loading: true, user: input, bot: "" })
          return [...prevState]
        })
      } else if (chunk == "loading_end") {
        setResponse((prevState) => {
          const length = prevState.length - 1
          prevState[length].loading=false
          return [...prevState]
        })
      } else {
          setResponse((prevState) => {
            const length = prevState.length - 1
            if(!setLoadingFalse){
              prevState[length].loading=false
              setLoadingFalse=true
            }
            prevState[length].bot += chunk
            return [...prevState]
          })
      }
    }
  }

  return (
    <div className="container">
      <ChatWindow response={response} />
      <ChatInput
        input={input}
        inputChangeHandler={inputChangeHandler}
        inputSubmitHandler={inputSubmitHandler}
      />
    </div>
  )
}

export default Dashboard
