import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { LoginButton } from "../components/LoginButton";
import { SignupButton } from "../components/SignupButton";
import { LogoutButton } from "../components/LogoutButton";
import { PageLoader } from "../components/PageLoader";
import { Auth0ProviderWithNavigate } from "../auth0-provider-with-navigate";
import { useAuth0 } from "@auth0/auth0-react";
import { FooterWithSocialLinks } from "../components/Footer";


function NavList() {
    const { isAuthenticated } = useAuth0();
    const { isLoading } = useAuth0();

    if (isLoading) {
        return (
            <div className="page-layout">
                <PageLoader />
            </div>
        );
    }


    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to='/' className="flex items-center hover:text-blue-500 transition-colors">
                    Home
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to="/browse" className="flex items-center hover:text-blue-500 transition-colors">
                    Browse
                </Link>
            </Typography>
            {!isAuthenticated && (
                <>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-medium"
                    >
                        <LoginButton className="flex items-center hover:text-blue-500 transition-colors" />
                    </Typography>

                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-medium"
                    >
                        <SignupButton className="flex items-center hover:text-blue-500 transition-colors" />
                    </Typography>
                </>
            )}
            {isAuthenticated && (
                <>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-medium"
                    >
                        <Link to="/profile" className="flex items-center hover:text-blue-500 transition-colors">
                            Profile
                        </Link>
                    </Typography>

                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-medium"
                    >
                        <LogoutButton className="flex items-center hover:text-blue-500 transition-colors" />
                    </Typography>
                </>
            )}

        </ul>
    );
}

const Layout = () => {
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <>
            <Auth0ProviderWithNavigate>
                <Navbar className="mx-auto w-full px-6 py-3">
                    <div className="flex items-center justify-between text-blue-gray-900">
                        <Typography
                            as="a"
                            variant="h6"
                            className="mr-4 cursor-pointer py-1.5"
                        >
                            Skin Care 101
                        </Typography>
                        <div className="hidden lg:block">
                            <NavList />
                        </div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                            ) : (
                                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                            )}
                        </IconButton>
                    </div>
                    <Collapse open={openNav}>
                        <NavList />
                    </Collapse>
                </Navbar>

                <Outlet />
                <FooterWithSocialLinks></FooterWithSocialLinks>

            </Auth0ProviderWithNavigate>
        </>

    );
};

export default Layout;