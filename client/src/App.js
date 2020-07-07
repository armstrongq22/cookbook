import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './scenes/Home';
import Login from './scenes/Login';
import SignUp from './scenes/SignUp';
import NewPost from './scenes/NewPost';
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
                    <Route path='/' component={PageNotFound} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;