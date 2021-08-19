import * as React from "react"
import { useContext } from "react"
import { Route, Switch } from "react-router-dom"
import Layout from "./components/Layout"
import AddUserPage from "./pages/AddUserPage"
import Auth from "./pages/Auth"
import BikesPage from "./pages/BikesPage"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import AuthContext from "./store/auth-context"


export const App = () => {
  const authContext = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage/>
        </Route>
        <Route path="/add-user" exact>
          <AddUserPage />
        </Route>
        {
          !authContext.isLoggedIn &&
          <Route path="/login">
            <Auth />
          </Route>
        }
        {
          authContext.isLoggedIn &&
          <Route path="/bikes">
            <BikesPage />
          </Route>
        }
        <Route path='*'>
          <NotFoundPage />
        </Route>
      </Switch>
    </Layout>
  )
}
