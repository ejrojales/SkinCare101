import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import ocean from "../assets/ocean.jpg"


export default function LandingPage() {
    return (
        <>
            <section className="flex h-[100vh]">
                <div className="w-full relative flex justify-center items-center">
                    <img className="absolute h-full w-full" src={ocean} />
                    <div className="flex flex-col absolute w-3/4 justify-center mx-8">
                        <Typography className="flex text-left" variant="h1" color="white">
                            Perfect your skin care routine with SkinCarePal
                        </Typography>

                        <Typography className="flex my-8" variant="h5" color="white">
                            Build custom routines for morning or night.
                        </Typography>

                        <Button color="white" variant="filled" className="rounded-full flex justify-center w-1/5">
                            <Typography variant="h5" color="blue">
                                <Link to='/routines'>
                                    Get Started
                                </Link>
                            </Typography>
                        </Button>
                    </div>
                </div>
            </section >


            <section className="bg-white h-[80vh]">
                <h1>
                    Second!
                </h1>
            </section>

        </>
    )
}