import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <span><Link to="/">Home </Link></span>
                <span><Link to="/browse">Browse </Link></span>
                <span><Link to="/">Login</Link></span>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;