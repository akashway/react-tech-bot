import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"

function ChatWindow(props = {}) {
  const { response } = props
  
  return (
    <div className="chat-container">
      {response.length > 0 ? (
        response.map((data, index) => {
          return (
            <div key={index}>
              <div className="chat-user">{data.user}</div>
              <div className="chat-bot">
                {data.loading ? (
                  "Generating..."
                ) : (
                  <ReactMarkdown rehypePlugins={rehypeHighlight}>
                    {data.bot}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          )
        })
      ) : (
        <p className="placeholder">Ask something to get started..</p>
      )}
    </div>
  )
}

export default ChatWindow
