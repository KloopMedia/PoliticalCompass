import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app, {signInWithGoogle, signInAnonymously} from "../util/firebase";
import { AuthContext } from "../util/Auth";

const Login = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    console.log(currentUser)
    return <Redirect to={"/Kloop-compass/" + window.location.search} />;
  }


  return (
    <div>
      <h1>Log in</h1>
      <button onClick={signInWithGoogle}>войти через гугл</button>
      <button onClick={signInAnonymously}>анонимный вход</button>
    </div>
  );
};



export default withRouter(Login);
