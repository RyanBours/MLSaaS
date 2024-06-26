/* eslint-disable @typescript-eslint/no-misused-promises -- allowed because of timecontraints */
"use client";

import { signOut } from "next-auth/react";

export default function Navbar(): JSX.Element {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a className="flex items-center" href="/dashboard">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ML SaaS</span>
                </a>
                <div className="flex items-center md:order-2">
                    {/* <a className="underline mx-2" href="/token">100 tokens</a>
                    <button aria-expanded="false" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" data-dropdown-placement="bottom" data-dropdown-toggle="user-dropdown" id="user-menu-button" onClick={() => signOut()} type="button">
                        <span className="sr-only">Sign out</span>
                    </button> */}
                    <button onClick={() => signOut()} type="button">
                        <span>Sign out</span>
                    </button>
                    {/* <div className="z-50 my-4 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">[USERNAME]</span>
                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">[USER_EMAIL]</span>
                        </div>
                        <ul aria-labelledby="user-menu-button" className="py-2">
                            <li>
                                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" href="#">Settings</a>
                            </li>
                            <li>
                                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" href="#">Sign out</a>
                            </li>
                        </ul>
                    </div> */}
                    <button aria-controls="navbar-user" aria-expanded="false" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                        <span className="sr-only">Open main menu</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1h15M1 7h15M1 13h15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                    </button>
                </div>
                <div className="items-center  justify-between w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" href="/dashboard">Services</a>
                        </li>
                        <li>
                            <a className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" href="/pricing">Pricing</a>
                        </li>
                        <li>
                            <a className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" href="/contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}