import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app, {signInWithGoogle, signInAnonymously} from "../../util/firebase";
import { AuthContext } from "../../util/Auth.js";

const Login = ({ history }) => {

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to={"/questionnaire/" + window.location.search} />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <button onClick={signInWithGoogle}>Sign-in with Google</button>
      <button onClick={signInAnonymously}>Sign-in Anonymously</button>
    </div>
  );
};



export default withRouter(Login);