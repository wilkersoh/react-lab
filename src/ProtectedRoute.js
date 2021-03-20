import React, { useState } from "react";
import {
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "./components/Container";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

export default function ProtectedRoute() {
  const { url } = useRouteMatch();

  return (
    <Container>
      <AuthButton />
      <ul>
        <li>
          <Link to={`${url}/public`}>Public</Link>
        </li>
        <li>
          <Link to={`${url}/protected`}>Protected</Link>
        </li>
      </ul>
      <Route path={`${url}/public`} component={Public} />
      <Route path={`${url}/login`} component={Login} />

      {/* show this component after didMount this page if isAuthenticated is false */}
      <PrivateRoute path={`${url}/protected`}>
        {/* Make it children component */}
        <Protected />
      </PrivateRoute>
    </Container>
  );
}

const PrivateRoute = ({ children, ...rest }) => {
  return (
    // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Route.js route source code, to see where render got location object
    <Route
      {...rest}
      render={({ location }) => {
        return fakeAuth.isAuthenticated === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/protected-route/login",
              /**
               *  from : 控制 下面 Login的 redirect 去的地方
               * 它會 redirect 回去 protected route， 這裡美唷login 被redirect去 login page
               */
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

const Public = () => <Box>Public</Box>;

const Protected = () => <Box>Protected</Box>;

const Login = () => {
  const { state } = useLocation();
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const login = () => {
    fakeAuth.authenticate(() => {
      setRedirectToReferrer(true);
    });
  };

  if (redirectToReferrer)
    return (
      <Redirect to={state?.from || "/protected-route "} /> // 他會自動拿 裡面的pathname 當作 redirect去的地方
    );

  return (
    <Box>
      <Box>You must login to view this page</Box>
      <Button onClick={login} variant='contained' color='primary'>
        Login
      </Button>
    </Box>
  );
};

const AuthButton = () => {
  const history = useHistory();
  return fakeAuth.isAuthenticated ? (
    <Box>
      Welcome!{" "}
      <Button
        onClick={() => fakeAuth.signout(() => history.push("/protected-route"))}
        variant='contained'
        color='secondary'>
        {" "}
        Sign Out
      </Button>
    </Box>
  ) : (
    <Box>You are not login </Box>
  );
};
