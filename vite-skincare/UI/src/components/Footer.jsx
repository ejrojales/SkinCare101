import { Typography } from "@material-tailwind/react";

export default function SimpleFooter() {
    return (
        <footer className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between mt-auto fixed inset-x-0 bottom-0 bg-blue-gray-600">
            <Typography color="blue-gray" className="font-normal">
                &copy; 2023 Emmanuel Rojales
            </Typography>
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                <li>
                    <Typography
                        as="a"
                        href="#"
                        color="blue-gray"
                        className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                        Email
                    </Typography>
                </li>
                <li>
                    <Typography
                        as="a"
                        href="#"
                        color="blue-gray"
                        className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                        LinkedIn
                    </Typography>
                </li>
                <li>
                    <Typography
                        as="a"
                        href="#"
                        color="blue-gray"
                        className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                        GitHub
                    </Typography>
                </li>
            </ul>
        </footer>
    );
}