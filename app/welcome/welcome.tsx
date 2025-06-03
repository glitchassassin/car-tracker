import { json, type LoaderFunctionArgs } from '@react-router/node'
import { Link, useLoaderData } from 'react-router-dom'
import { type Metadata } from '~/app/types/metadata'
// import { type ReactNode } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
       const data: Metadata = {
               title: 'Welcome',
               description: 'Welcome to the React Router Car Tracker',
               url: request.url,
       }
       return json(data)
}

export default function Welcome() {
       const data = useLoaderData<Metadata>()

       return (
               <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                       <div className="relative flex place-items-center">
                               <a
                                       className="absolute top-0 left-0 p-4 text-white no-underline"
                                       href="https://github.com/remix-run/react-router"
                                       target="_blank"
                                       rel="noreferrer"
                               >
                                       <img
                                               src="https://user-images.githubusercontent.com/1500684/158298995-bdc32c0d-0cb6-47c2-9f79-4dc15b65c37c.png"
                                               alt="React Router"
                                               className="dark:invert"
                                               width="150"
                                               height="150"
                                       />
                               </a>
                               <div className="max-w-xs text-center">
                                       <h1 className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
                                               React Router Car Tracker
                                       </h1>
                                       <p className="text-lg font-semibold text-white">{data.description}</p>
                                       <p className="mt-4 text-sm leading-relaxed text-white">
                                               This is a template for building full-stack web applications with
                                               React Router.
                                       </p>
                                       <div className="mt-8 flex flex-col items-center gap-4">
                                               <Link
                                                       to="/home"
                                                       className="inline-block rounded bg-white/10 px-8 py-3 text-sm font-medium text-white hover:bg-white/20"
                                               >
                                                       Get Started
                                               </Link>
                                               <div className="flex flex-col items-center gap-4">
                                                       <a
                                                               className="flex items-center gap-2 text-sm font-medium text-white"
                                                               href="https://reactrouter.com/docs"
                                                               target="_blank"
                                                               rel="noreferrer"
                                                       >
                                                               <svg
                                                                       xmlns="http://www.w3.org/2000/svg"
                                                                       width="24"
                                                                       height="20"
                                                                       viewBox="0 0 20 20"
                                                                       fill="none"
                                                                       className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
                                                               >
                                                                       <path
                                                                               d="M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z"
                                                                               strokeWidth="1.5"
                                                                               strokeLinecap="round"
                                                                       />
                                                               </svg>
                                                               React Router Docs
                                                       </a>
                                                       <a
                                                               className="flex items-center gap-2 text-sm font-medium text-white"
                                                               href="https://rmx.as/discord"
                                                               target="_blank"
                                                               rel="noreferrer"
                                                       >
                                                               <svg
                                                                       xmlns="http://www.w3.org/2000/svg"
                                                                       width="24"
                                                                       height="20"
                                                                       viewBox="0 0 20 20"
                                                                       fill="none"
                                                                       className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
                                                               >
                                                                       <path
                                                                               d="M10 15.5C12.7614 15.5 15 13.2614 15 10C15 6.73858 12.7614 4.5 10 4.5C7.23858 4.5 5 6.73858 5 10C5 13.2614 7.23858 15.5 10 15.5ZM10 18C13.3137 18 16 15.3137 16 12C16 8.68629 13.3137 6 10 6C6.68629 6 4 8.68629 4 12C4 15.3137 6.68629 18 10 18Z"
                                                                               strokeWidth="1.5"
                                                                               strokeLinecap="round"
                                                                       />
                                                               </svg>
                                                               Join Discord
                                                       </a>
                                               </div>
                                       </div>
                               </div>
                       </div>
               </main>
       )
}
