import React, {useEffect, useState} from 'react';
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
import NoMatch from "./components/NoMatch/NoMatch";
import {Helmet} from "react-helmet";
import {WorkItemModal} from "./components/WorkItemModal/WorkItemModal";
import {WorkItem} from "./components/WorkItemList/WorkItem/WorkItem";

const App: React.FC = () => {
    const [workItems, setWorkItems] = useState<WorkItem[]>([]);

    useEffect(() => {
        fetch('/api/works')
            .then((response) => response.json())
            .then((data) => setWorkItems(data))
    }, []);

    return (
        <Router>
            <Header/>
            <Main>
                <Switch>
                    <Route exact path={`/`}>
                        <Helmet>
                            <title>Vernal Bloom</title>
                        </Helmet>
                        <WorkItemList workItemList={workItems}/>
                    </Route>
                    <Route path={`/work/:fileName`}>
                        <WorkItemModal workItemList={workItems}/>
                    </Route>
                    <Route path="/about">
                        <Helmet>
                            <title>About — Vernal Bloom</title>
                        </Helmet>
                        <About/>
                    </Route>
                    <Route path="*">
                        <Helmet>
                            <title>Page not found — Vernal Bloom</title>
                        </Helmet>
                        <NoMatch/>
                    </Route>
                </Switch>
            </Main>
            <Footer/>
        </Router>
    );
};

export default App;
