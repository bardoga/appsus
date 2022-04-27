const { NavLink } = ReactRouterDOM

export function AppHeader() {

  return (
    <nav className="app-header container">
      <ul className="clean-list flex space-between align-center">
        <li><NavLink to="/" exact={true}>Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/mail">Email</NavLink></li>
        <li><NavLink to="/keep">Keeps</NavLink></li>
      </ul>
    </nav>
  )
}