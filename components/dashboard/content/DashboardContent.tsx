"use client"

import { cn } from "@/lib/utils"
import { useUIStore } from "@/store/ui/ui-store"
import { useState } from "react"
import styles from '@/styles/dashboard.module.css';

export const DashboardContent = () => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)
  const isSettingsBarOpen = useUIStore( state => state.isSettingsBarOpen)
  const changeSidebar = useUIStore((state) => state.changeSidebar)
  const changeSettingsBar = useUIStore( state => state.changeSettingsBar)
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false)
  const toggleSearchBox = () => {
    setIsSearchBoxOpen(!isSearchBoxOpen)
  }
  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }
  const toggleSettingsBarOpen = () => {
    changeSettingsBar()
  }
  return (
    <>
    <div className="flex flex-col flex-1 h-full overflow-hidden">
          {/* Navbar*/}
          <header className="flex-shrink-0 border-b">
            <div className="flex items-center justify-between p-2">
              {/* Navbar left */}
              <div className="flex items-center space-x-3">
                <span className="p-2 text-xl font-semibold tracking-wider uppercase lg:hidden">
                  K-WD
                </span>
                {/* Toggle sidebar button */}
                <button
                  onClick={changeSidebar}
                  className="p-2 rounded-md focus:outline-none focus:ring"
                >
                  <svg
                    className={cn("w-4 h-4 text-gray-600", {
                      "transform transition-transform -rotate-180":
                        isSidebarOpen,
                    })}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              {/* Mobile Search Box */}
              {isSearchBoxOpen && (
                <div
                  className={cn(
                    "fixed inset-0 z-10 bg-opacity-20",
                    styles.blur
                  )}
                >
                  <div className="absolute inset-x-0 flex items-center justify-between p-2 shadow-md">
                    <div className="flex items-center flex-1 px-2 space-x-2">
                      <span>
                        <svg
                          className="w-6 h-6 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-4 py-3 text-gray-600 rounded-md focus:bg-gray-100 focus:outline-none"
                      />
                    </div>
                    {/* close button */}
                    <button
                      onClick={toggleSearchBox}
                      className="flex-shrink-0 p-4 rounded-md"
                    >
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              {/* Desktop search box */}
              <div className="items-center hidden px-2 space-x-2 md:flex-1 md:flex md:mr-auto md:ml-5">
                {/* search icon */}
                <span>
                  <svg
                    className="w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search"
                  className="px-4 py-3 rounded-md hover:bg-gray-100 lg:max-w-sm md:py-2 md:flex-1 focus:outline-none md:focus:bg-gray-100 md:focus:shadow md:focus:border"
                />
              </div>
              {/* Navbar right */}
              <div className="relative flex items-center space-x-3">
                {/* search Button */}
                <button
                  onClick={toggleSearchBox}
                  className="p-2 bg-gray-100 rounded-full md:hidden focus:outline-none focus:ring hover:bg-gray-200"
                >
                  <svg
                    className="w-6 h-6 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
                <div className="items-center hidden space-x-3 md:flex">
                  {/* Notification Button */}
                  <div className="relative">
                    {/* red dot */}
                    <div className="absolute right-0 p-1 bg-red-400 rounded-full animate-ping"></div>
                    <div className="absolute right-0 p-1 bg-red-400 border rounded-full"></div>
                    <button
                      onClick={toggleIsOpen}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring"
                    >
                      <svg
                        className="w-6 h-6 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </button>
                    {/* Dropdown card */}
                    {isOpen && (
                      <div className="absolute w-48 max-w-md mt-3 transform bg-white rounded-md shadow-lg -translate-x-3/4 min-w-max">
                        <div className="p-4 font-medium border-b">
                          <span className="text-gray-800">Notification</span>
                        </div>
                        <ul className="flex flex-col p-2 my-2 space-y-1">
                          <li>
                            <a
                              href="#"
                              className="block px-2 py-1 transition rounded-md hover:bg-gray-100"
                            >
                              Link
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-2 py-1 transition rounded-md hover:bg-gray-100"
                            >
                              Another Link
                            </a>
                          </li>
                        </ul>
                        <div className="flex items-center justify-center p-4 text-blue-700 underline border-t">
                          <a href="#">See All</a>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Services Button */}
                  <div x-data="{ isOpen: false }">
                    <button
                      onClick={toggleIsOpen}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring"
                    >
                      <svg
                        className="w-6 h-6 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                    </button>

                    {/* <!-- Dropdown --> */}
                    {isOpen && (
                      <div className="absolute mt-3 transform bg-white rounded-md shadow-lg -translate-x-3/4 min-w-max">
                        <div className="p-4 text-lg font-medium border-b">
                          Web apps & services
                        </div>
                        <ul className="flex flex-col p-2 my-3 space-y-3">
                          <li>
                            <a
                              href="#"
                              className="flex items-start px-2 py-1 space-x-2 rounded-md hover:bg-gray-100"
                            >
                              <span className="block mt-1">
                                <svg
                                  className="w-6 h-6 text-gray-500"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    fill="#fff"
                                    d="M12 14l9-5-9-5-9 5 9 5z"
                                  />
                                  <path
                                    fill="#fff"
                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                  />
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                  />
                                </svg>
                              </span>
                              <span className="flex flex-col">
                                <span className="text-lg">Atlassian</span>
                                <span className="text-sm text-gray-400">
                                  Lorem ipsum dolor sit.
                                </span>
                              </span>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="flex items-start px-2 py-1 space-x-2 rounded-md hover:bg-gray-100"
                            >
                              <span className="block mt-1">
                                <svg
                                  className="w-6 h-6 text-gray-500"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                  />
                                </svg>
                              </span>
                              <span className="flex flex-col">
                                <span className="text-lg">Slack</span>
                                <span className="text-sm text-gray-400">
                                  Lorem ipsum, dolor sit amet consectetur
                                  adipisicing elit.
                                </span>
                              </span>
                            </a>
                          </li>
                        </ul>
                        <div className="flex items-center justify-center p-4 text-blue-700 underline border-t">
                          <a href="#">Show all apps</a>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Avatar Button */}
                  <div className="relative" x-data="{ isOpen: false }">
                    <button
                      onClick={toggleIsOpen}
                      className="p-1 bg-gray-200 rounded-full focus:outline-none focus:ring"
                    >
                      <img
                        className="object-cover w-8 h-8 rounded-full"
                        src="https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                        alt="Ahmed Kamel"
                      />
                    </button>
                    {/* <!-- green dot --> */}
                    <div className="absolute right-0 p-1 bg-green-400 rounded-full bottom-3 animate-ping"></div>
                    <div className="absolute right-0 p-1 bg-green-400 border border-white rounded-full bottom-3"></div>

                    {/* <!-- Dropdown card --> */}
                    {isOpen && (
                      <div className="absolute mt-3 transform -translate-x-full bg-white rounded-md shadow-lg min-w-max">
                        <div className="flex flex-col p-4 space-y-1 font-medium border-b">
                          <span className="text-gray-800">Ahmed Kamel</span>
                          <span className="text-sm text-gray-400">
                            ahmed.kamel@example.com
                          </span>
                        </div>
                        <ul className="flex flex-col p-2 my-2 space-y-1">
                          <li>
                            <a
                              href="#"
                              className="block px-2 py-1 transition rounded-md hover:bg-gray-100"
                            >
                              Link
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-2 py-1 transition rounded-md hover:bg-gray-100"
                            >
                              Another Link
                            </a>
                          </li>
                        </ul>
                        <div className="flex items-center justify-center p-4 text-blue-700 underline border-t">
                          <a href="#">Logout</a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>
          {/* Main content */}
          <main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
            {/* main Content header */}
            <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
              <h1 className="text-2xl font-semibold whitespace-nowrap">
                Dashboard
              </h1>
              <div className="space-y-6 md:space-x-2 md:space-y-0">
                <a
                  href="https://github.com/Kamona-WD/starter-dashboard-layout"
                  target="_blank"
                  className="inline-flex items-center justify-center px-4 py-1 space-x-1 bg-gray-200 rounded-md shadow hover:bg-opacity-20"
                >
                  <span>
                    <svg
                      className="w-4 h-4 text-gray-500"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                      ></path>
                    </svg>
                  </span>
                  <span>View on Github</span>
                </a>
              </div>
            </div>

            {/* Start Content */}
            <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
              <template x-for="i in 4">
                <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col space-y-2">
                      <span className="text-gray-400">Total Users</span>
                      <span className="text-lg font-semibold">100,221</span>
                    </div>
                    <div className="p-10 bg-gray-200 rounded-md"></div>
                  </div>
                  <div>
                    <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">
                      14%
                    </span>
                    <span>from 2019</span>
                  </div>
                </div>
              </template>
            </div>

            {/* Table */}
            <h3 className="mt-6 text-xl">Users</h3>
            <div className="flex flex-col mt-6">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
                    <table className="min-w-full overflow-x-scroll divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Role
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <template x-for="i in 10">
                          <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 w-10 h-10">
                                  <img
                                    className="w-10 h-10 rounded-full"
                                    src="https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    Ahmed Kamel
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    ahmed.kamel@example.com
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                Regional Paradigm Technician
                              </div>
                              <div className="text-sm text-gray-500">
                                Optimization
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              Admin
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                              </a>
                            </td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
          {/* Main footer */}
          <footer className="flex items-center justify-between flex-shrink-0 p-4 border-t max-h-14">
            <div>K-WD &copy; 2020</div>
            <div className="text-sm">
              Made by
              <a
                className="text-blue-400 underline"
                href="https://github.com/Kamona-WD"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ahmed Kamel
              </a>
            </div>
            <div>
              {/* <!-- Github svg --> */}
              <a
                href="https://github.com/Kamona-WD/starter-dashboard-layout"
                target="_blank"
                className="flex items-center space-x-1"
              >
                <svg
                  className="w-6 h-6 text-gray-400"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                  ></path>
                </svg>
                <span className="hidden text-sm md:block">View on Github</span>
              </a>
            </div>
          </footer>
        </div>
    </>
  )
}
export default DashboardContent
