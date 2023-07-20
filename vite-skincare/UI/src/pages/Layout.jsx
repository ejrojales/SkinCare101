import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <h1>SkinCare 101</h1>
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