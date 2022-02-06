import { Link, useLocation, useNavigate } from "react-router-dom";


const NavBar = () => {
    
    let location = useLocation();
    let navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/login');
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                            
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex" onSubmit={handleSubmit}>
                                <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                                <Link className="btn btn-primary" to="/signup" role="button">Sign Up</Link>
                        </form> : <button className="btn btn-primary" onClick = {handleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;