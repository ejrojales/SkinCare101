import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import RoutineCard from "../components/RoutineCard";
import { List, ListItem } from "@material-tailwind/react";
import 'animate.css';



export default function LandingPage() {
    const exampleAmRoutine = [
        {
            "products": {
                "cleanse": [
                    {
                        "id": 5,
                        "step": "Cleanse",
                        "name": "Round Lab Dokdo Cleanser"
                    }
                ],
                "moisturize": [
                    {
                        "id": 6,
                        "step": "Moisturize",
                        "name": "Illiyoon Ceramide Ato Gel"
                    }
                ],
                "protect": [
                    {
                        "id": 7,
                        "step": "Protect",
                        "name": "Round Lab Birch Juice Sunscreen"
                    }
                ]
            },
            "_id": "655b00d3b93d956761cf4e21",
            "title": "AM Routine",
            "author": "Emmanuel Rojales",
            "author_ID": "google-oauth2|111493949414557487066",
            "tag": "AM",
            "comments": [
                {
                    "body": "No comment",
                    "_id": "655b00d3b93d956761cf4e22"
                }
            ],
            "date": "2023-11-20T06:46:43.252Z",
            "hidden": false,
            "__v": 0
        }
    ]

    return (
        <>
            <section className="flex h-[100vh]">
                <div className="w-full relative flex justify-center items-center">

                    <div className="flex flex-col absolute w-3/4 justify-center mx-8" x-intersect="$el.classList.add('animate__animated', 'animate__fadeIn', 'animate__slower', 'animate__delay-1s')">
                        <Typography className="flex text-left" variant="h1" color="black">
                            Perfect your skin care routine with SkinCarePal
                        </Typography>

                        <Typography className="flex my-8" variant="h5" color="black">
                            Build custom routines for morning or night.
                        </Typography>

                        <Button variant="gradient" className="rounded-full flex justify-center w-1/5">
                            <Typography variant="h5" color="white">
                                <Link to='/routines'>
                                    Get Started
                                </Link>
                            </Typography>
                        </Button>
                    </div>
                </div>
            </section >


            <section className="h-[100vh] flex">
                <div className="flex p-8 h-full w-full">

                    <div className="flex flex-col justify-center p-8" x-intersect="$el.classList.add('animate__animated', 'animate__fadeIn', 'animate__slower')">
                        <Typography className="flex text-left mb-4" variant="h1">
                            Keep it simple with one routine for morning and night
                        </Typography>
                        <Typography className="flex text-left mb-4" variant="lead">
                            Simplicity is best. Whether you are starting your skin care journey or looking to build a minimalist routine that gets the job done, keeping one routine for morning and night can help you see if the routine works for you.
                        </Typography>
                        <ul className="flex flex-col text-left">
                            <li>
                                <Typography className="flex text-left mb-2" variant="paragraph">
                                    Essential products only
                                </Typography>

                            </li>
                            <li>
                                <Typography className="flex text-left mb-2" variant="paragraph">
                                    Save money
                                </Typography>
                            </li>
                            <li>
                                <Typography className="flex text-left mb-2" variant="paragraph">
                                    Worry free
                                </Typography>
                            </li>
                        </ul>
                    </div>

                    <div className="flex justify-around items-center h-full w-full p-8" x-intersect="$el.classList.add('animate__animated', 'animate__fadeIn', 'animate__slower')">

                        <div className="flex flex-col p-4">
                            <RoutineCard routines={exampleAmRoutine} page={"landing"} setUserRoutines={"None"} />
                        </div>

                        <div className="flex flex-col">
                            <RoutineCard routines={exampleAmRoutine} page={"landing"} setUserRoutines={"None"} />
                        </div>

                    </div>

                </div>
            </section>

            <section className="h-[100vh] flex">
                <div className="flex p-8 h-full w-full">

                    <div className="flex flex-col justify-around content-around h-full w-full p-8" x-intersect="$el.classList.add('animate__animated', 'animate__fadeIn', 'animate__slower')">

                        <div className="flex h-full w-full m-4">
                            <div className="flex flex-col p-4">
                                <RoutineCard routines={exampleAmRoutine} page={"landing"} setUserRoutines={"None"} />
                            </div>

                            <div className="flex flex-col p-4">
                                <RoutineCard routines={exampleAmRoutine} page={"landing"} setUserRoutines={"None"} />
                            </div>
                        </div>


                        <div className="flex h-full w-full m-4">
                            <div className="flex flex-col p-4">
                                <RoutineCard routines={exampleAmRoutine} page={"landing"} setUserRoutines={"None"} />
                            </div>

                            <div className="flex flex-col p-4">
                                <RoutineCard routines={exampleAmRoutine} page={"landing"} setUserRoutines={"None"} />
                            </div>
                        </div>



                    </div>

                    <div className="flex flex-col justify-center p-8" x-intersect="$el.classList.add('animate__animated', 'animate__fadeIn', 'animate__slower')">
                        <Typography className="flex text-left mb-4" variant="h1">
                            Switch between multiple routines with different focuses
                        </Typography>
                        <Typography className="flex text-left mb-4" variant="lead">
                            Looking to build a routine with specific concerns? Organize and build routines to prevent conflicting active ingredients. Some products work best in the morning while others are recommended for night time use only.
                        </Typography>
                        <ul className="flex flex-col text-left">
                            <li>
                                <Typography className="flex text-left mb-2" variant="paragraph">
                                    Prevent mixing too much active ingredients
                                </Typography>

                            </li>
                            <li>
                                <Typography className="flex text-left mb-2" variant="paragraph">
                                    A specific purpose for certain days
                                </Typography>
                            </li>
                            <li>
                                <Typography className="flex text-left mb-2" variant="paragraph">
                                    Experiment with new products
                                </Typography>
                            </li>
                        </ul>
                    </div>

                </div>
            </section>

            <section className="h-[100vh] flex">
                <div className="flex flex-col p-8 h-full w-full" >

                    <div className="flex justify-center my-28" x-intersect="$el.classList.add('animate__animated', 'animate__fadeIn', 'animate__slower')">
                        <Typography className="flex text-center" variant="h1" color="black">
                            Browse routines made by others
                        </Typography>
                    </div>

                    <div className="flex justify-around h-full w-full" x-intersect="$el.classList.add('animate__animated', 'animate__fadeInUp', 'animate__slower')">

                        <div className="flex flex-col max-w-md">
                            <RoutineCard routines={exampleAmRoutine} page={"landing"} setUserRoutines={"None"} />

                            <Typography className="flex justify-center text-center" variant="lead" color="black">
                                Description
                            </Typography>
                            <Typography className="flex text-center" variant="paragraph" color="black">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio accusantium fugiat ipsa quos. Nobis qui similique tenetur laborum odio, tempora nulla harum illo a doloribus quam, inventore dignissimos non! Similique.
                            </Typography>
                        </div>

                        <div className="flex flex-col max-w-md">
                            <RoutineCard routines={exampleAmRoutine} page={"landing"} setUserRoutines={"None"} />
                            <Typography className="flex justify-center text-center" variant="lead" color="black">
                                Description
                            </Typography>
                            <Typography className="flex text-center" variant="paragraph" color="black">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio accusantium fugiat ipsa quos. Nobis qui similique tenetur laborum odio, tempora nulla harum illo a doloribus quam, inventore dignissimos non! Similique.
                            </Typography>
                        </div>

                        <div className="flex flex-col max-w-md">
                            <RoutineCard routines={exampleAmRoutine} page={"landing"} setUserRoutines={"None"} />
                            <Typography className="flex justify-center text-center" variant="lead" color="black">
                                Description
                            </Typography>
                            <Typography className="flex text-center" variant="paragraph" color="black">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio accusantium fugiat ipsa quos. Nobis qui similique tenetur laborum odio, tempora nulla harum illo a doloribus quam, inventore dignissimos non! Similique.
                            </Typography>
                        </div>

                    </div>



                </div>
            </section>

            <section className="h-[80vh] flex">
                <div className="flex justify-center p-8 h-full w-full">

                    <div className="flex flex-col w-3/5 items-center justify-center my-28">
                        <Typography className="flex text-center" variant="h4" color="black">
                            With so many skin care products on the market, its hard to know what, when, and how to use them. SkinCarePal can help you track and achieve your goals.
                        </Typography>

                        <Button variant="gradient" className="rounded-full w-1/5 mt-8">
                            <Typography variant="h5" color="white">
                                <Link to='/routines'>
                                    Get Started
                                </Link>
                            </Typography>
                        </Button>

                    </div>

                </div>
            </section>
        </>
    )
}