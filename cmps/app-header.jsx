const { Link, NavLink, withRouter } = ReactRouterDOM


function _AppHeader(props){
    return <section className="app-header">
        <nav>
            {/* <NavLink></NavLink> */}
            <NavLink to="/email">Email</NavLink>
            <NavLink to="/notes">Notes</NavLink>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
    </section>
}


export const AppHeader = withRouter(_AppHeader)