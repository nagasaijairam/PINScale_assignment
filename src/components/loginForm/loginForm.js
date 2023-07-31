import { Component } from "react";

import "../../loginForm.css";

class LoginForm extends Component {
  state = { email: "", password: "", userId: "" };

  onSuccesfulLogin = () => {
    const { history } = this.props;
    history.replace("/");
  };

  onFormSubmit = async (event) => {
    const { email, password, userId } = this.state;
    event.preventDefault();
    // console.log("login Successful");
    const details = {
      email: email,
      password: password,
      get_user_id: `["id":${userId}]`
    };
    const url = `https://bursting-gelding-24.hasura.app/api/rest/get-user-id?user_id=${userId}`;
    const options = {
      method: "GET",
      body: JSON.stringify(details)
    };
    const response = await fetch({ url, options });
    console.log(response);
    const data = await response.json();
    console.log(data.get_user_id);
    if (response.ok === true) {
      this.onSuccesfulLogin();
    }
  };

  onEmailEntered = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordEntered = (event) => {
    this.setState({ password: event.target.value });
  };

  onChangeUserId = (event) => {
    this.setState({ userId: event.target.value });
  };

  render() {
    const { email, password, userId } = this.state;
    return (
      <div className="md1">
        <form onSubmit={this.onFormSubmit} className="form1">
          <input
            placeholder="Email_id"
            type="email"
            onChange={this.onEmailEntered}
            value={email}
          />
          <br />
          <input
            type="password"
            onChange={this.onPasswordEntered}
            value={password}
            placeholder="Password"
          />
          {/* <input type="input" onChange={this.onChangeUserId} value={userId} /> */}
          <br />
          <button type="submit">Login </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
