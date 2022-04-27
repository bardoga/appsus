import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./pages/app-about.jsx"
import { Home } from "./pages/app-home.jsx"
import { Keep } from "./apps/keep/pages/note-index.jsx"
import { EmailApp } from "./apps/mail/pages/mail-index.jsx"



const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export function App(){
    return <Router >
        <AppHeader />
        <section className="app">
            <Switch>
                <Route path="/email" component={EmailApp} />
                <Route path="/notes" component={Keep} />
                <Route path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
    </section>
    </Router>
}