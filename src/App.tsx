import * as React from "react"
import { useContext } from "react"
import { Route, Switch, useHistory, useLocation } from "react-router-dom"
import Layout from "./components/Layout"
import AddBikePage from "./pages/AddBikePage"
import AddUserPage from "./pages/AddUserPage"
import Auth from "./pages/Auth"
import BikesPage from "./pages/BikesPage"
import EditBikePage from "./pages/EditBikesPage"
import EditUserPage from "./pages/EditUserPage"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import UsersPage from "./pages/UsersPage"
import AuthContext from "./store/auth-context"


export const App = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  if (location.pathname !== '/' && location.pathname !== '/login' && !authContext.isLoggedIn) {
    history.push('/login');
  }

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage/>
        </Route>
        {
          !authContext.isLoggedIn &&
          <Route path="/login">
            <Auth />
          </Route>
        }
        {
          authContext.isLoggedIn && authContext.role === 'manager' &&
          <Route path="/users/:id">
            <EditUserPage />
          </Route>
        }
        {
          authContext.isLoggedIn && authContext.role === 'manager' &&
          <Route path="/users">
            <UsersPage />
          </Route>
        }
        {
          authContext.isLoggedIn && authContext.role === 'manager' &&
          <Route path="/add-user">
            <AddUserPage />
          </Route>
        }
        {
          authContext.isLoggedIn && authContext.role === 'manager' &&
          <Route path="/bikes/:id">
            <EditBikePage />
          </Route>
        }
        {
          authContext.isLoggedIn &&
          <Route path="/bikes">
            <BikesPage />
          </Route>
        }
        {
          authContext.isLoggedIn && authContext.role === 'manager' &&
          <Route path="/add-bike">
            <AddBikePage />
          </Route>
        }
        <Route path='*'>
          <NotFoundPage />
        </Route>
      </Switch>
    </Layout>
  )
}
