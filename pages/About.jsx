const { NavLink, Route, Switch } = ReactRouterDOM;

function AboutTeam() {
  return (
    <div className="about-team">
      <h4>The Team</h4>
      <ol className="clean-list">
        <li>Natali Avshalom</li>
        <li>Yonatan Shamaev</li>
      </ol>
    </div>
  );
}

export function About() {
  return (
    <section className="about-container  container flex column flex-start align-center">
      <h2>About Us</h2>
      <nav>
        <NavLink to="/about/team">Team</NavLink>
      </nav>

      <Switch>
        <Route component={AboutTeam} path="/about/team" />
      </Switch>
    </section>
  );
}
