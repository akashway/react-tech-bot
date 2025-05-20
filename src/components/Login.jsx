import { useState } from "react"

function Login(props = {}) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  const { type } = props

  function changeHandler(event) {
    const {name, value} = event.target
    setUserData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  function submitHandler(event) {
    event.preventDefault()
    console.log(userData)
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email"
            value={userData.email}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your Password"
            value={userData.password}
            onChange={changeHandler}
          />
        </div>
        <button type="submit">{type}</button>
      </form>
    </div>
  )
}

export default Login
