import React, {useEffect, useState} from 'react';
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {Main} from "./components/Main/Main";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import {About} from "./components/About/About";
import {WorkItemList} from "./components/WorkItemList/WorkItemList";
import NoMatch from "./components/NoMatch/NoMatch";
import {Helmet} from "react-helmet";
import {WorkItemModal} from "./components/WorkItemModal/WorkItemModal";
import {WorkItem} from "./components/WorkItemList/WorkItem/WorkItem";

// TODO: use better namings
export enum Category {
    ALL,
    VECTOR = 'vector',
    BITMAP = 'bitmap',
    LOGOTYPE = 'logotype'
}

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
                        <WorkItemList workItemList={workItems} currentCategory={Category.ALL}/>
                    </Route>
                    <Route exact path={`/vector-graphic`}>
                        <Helmet>
                            <title>Vernal Bloom</title>
                        </Helmet>
                        <WorkItemList workItemList={workItems} currentCategory={Category.VECTOR}/>
                    </Route>
                    <Route exact path={`/bitmap-graphic`}>
                        <Helmet>
                            <title>Vernal Bloom</title>
                        </Helmet>
                        <WorkItemList workItemList={workItems} currentCategory={Category.BITMAP}/>
                    </Route>
                    <Route exact path={`/logotype`}>
                        <Helmet>
                            <title>Vernal Bloom</title>
                        </Helmet>
                        <WorkItemList workItemList={workItems} currentCategory={Category.LOGOTYPE}/>
                    </Route>
                    <Route path={`/work/:fileName`}>
                        <WorkItemModal workItemList={workItems} currentCategory={Category.ALL}/>
                    </Route>
                    <Route path={`/vector/:fileName`}>
                        <WorkItemModal workItemList={workItems.filter((item => item.category === Category.VECTOR))}
                                       currentCategory={Category.VECTOR}/>
                    </Route>
                    <Route path={`/bitmap/:fileName`}>
                        <WorkItemModal workItemList={workItems.filter((item => item.category === Category.BITMAP))}
                                       currentCategory={Category.BITMAP}/>
                    </Route>
                    <Route path={`/logotype/:fileName`}>
                        <WorkItemModal workItemList={workItems.filter((item => item.category === Category.LOGOTYPE))}
                                       currentCategory={Category.LOGOTYPE}/>
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
