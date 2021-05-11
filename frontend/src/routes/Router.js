import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'
import { Posts } from '../pages/Posts'
import { Profile } from '../pages/Profile'
export const Router = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <Route exact path="/posts">
                    <Posts />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}