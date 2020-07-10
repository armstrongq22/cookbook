import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './scenes/Home';
import Login from './scenes/Login';
import SignUp from './scenes/SignUp';
import NewPost from './scenes/NewPost';
import Profile from './scenes/Profile';
import Favorites from './scenes/Favorites';
import UserRecipes from './scenes/UserRecipes';
import PageNotFound from './scenes/PageNotFound';

function App() {
    return (
        <Router>
            <div className='App'>
                <Switch>
                    <Route path='/' exact component={Login} />
                    <Route path='/Signup' component={SignUp} />
                    <Route path='/Home' component={Home} />
                    <Route path='/NewPost' component={NewPost} />
                    <Route path='/Profile' component={Profile} />
                    <Route path='/Favorites' component={Favorites} />
                    <Route path='/UserRecipes' component={UserRecipes} />
                    <Route path='/' component={PageNotFound} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;