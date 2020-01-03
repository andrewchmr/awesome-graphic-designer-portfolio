import React from 'react';
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {Main} from "./components/Main/Main";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {About} from "./components/About/About";
import {WorkItemList} from "./components/WorkItemList/WorkItemList";

const App: React.FC = () => {
    return (
        <Router>
            <Header/>
            <Main>
                <Switch>
                    <Route path="/work">
                        <WorkItemList/>
                    </Route>
                    <Route exact path="/">
                        <WorkItemList/>
                    </Route>
                    <Route path="/about">
                        <About/>
                    </Route>
                </Switch>
            </Main>
            <Footer/>
        </Router>
    );
};

export default App;
