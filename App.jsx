const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;
import { AppHeader } from "./cmps/AppHeader.jsx";
import { Home } from "./pages/Home.jsx";
import { About } from "./pages/About.jsx";
import { NoteApp } from './apps/keep-app/pages/note-index.jsx';
import { MailApp } from "./apps/mail-app/pages/mail-app.jsx";

export function App() {
  return (
    <Router>
      <header>
        <AppHeader />
      </header>
      <main>
        <Switch>
          <Route component={NoteApp} path="/keep" />
          <Route component={MailApp} path="/mail" />
          <Route component={About} path="/about/" />
          <Route component={Home} path="/" />
        </Switch>
      </main>
    </Router>
  );
}
