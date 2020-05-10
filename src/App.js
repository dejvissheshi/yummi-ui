import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import NotFound from "./errorPages/NotFound";
import Home, {HOME_PAGE_PATH} from "./home";
import Login, {LOGIN_PATH} from "./login";
import Register, {REGISTER_PATH} from "./register";
import Menu, {MENU_PATH} from "./menu";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path={HOME_PAGE_PATH} component={Home}/>
                <Route path={MENU_PATH} component={Menu}/>
                <Route path={LOGIN_PATH} component={Login}/>
                <Route path={REGISTER_PATH} component={Register}/>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
