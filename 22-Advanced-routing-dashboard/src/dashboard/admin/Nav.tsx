import { Users, SquareUserRound, Menu, LogOut } from "lucide-react"
import { Link } from "react-router-dom"

export default function Nav() {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                <label htmlFor="my-drawer" className="md:hidden lg:hidden  btn btn-sm btn-primary drawer-button ">
                    <Menu />
                </label>
            </div>
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200  min-w-full gap-2 text-base-content min-h-full">
                    <li>
                        <details open >
                            <summary ><Menu />Dashboard</summary>
                            <ul className="flex flex-col">
                                <li> <Link to="">Analytics</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details >
                            <summary><Users />User Profiles </summary>
                            <ul>
                                <li><Link to="users">Users</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <Link to="me"><SquareUserRound />Me</Link>
                    </li>
                    <li>
                        <Link to="#"><LogOut />Logout</Link>
                    </li>
                    <li>
                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                            Home
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
