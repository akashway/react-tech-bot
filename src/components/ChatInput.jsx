import React from "react";


function ChatInput(props = {}) {
    const { value = "", onChange = () => { }, onClick = () => { } } = props

    function changaHandler(event) {
        onChange(event.target.value)
    }

    function clickHandler(event) {
        event.preventDefault()
        onClick()
    }

    return (
        <form className="input-box">
            <textarea type="text" placeholder="Type Your Question Here..." value={value} onChange={changaHandler}></textarea>
            <button type="submit" onClick={clickHandler} disabled={value?false:true}>Submit</button>
        </form>
    )
}

export default ChatInput