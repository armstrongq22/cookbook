import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './scenes/Home';
import Login from './scenes/Login';
import SignUp from './scenes/SignUp';
import NewPost from './scenes/NewPost';

function App() {
    return (
        <Router>
            <div className='App'>
                <Switch>
                    <Route path='/' exact component={Login} />
                    <Route path='/Signup' component={SignUp} />
                    <Route path='/Home' component={Home} />
                    <Route path='/NewPost' component={NewPost} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;