import { Users, SquareUserRound, HardDriveDownload, Menu } from "lucide-react"
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
                <ul className="menu bg-base-200 rounded-box min-w-fit gap-2 text-base-content min-h-full">
                    <li>
                        <details open >
                            <summary ><Menu />Dashboard</summary>
                            <ul className="flex flex-col">
                                <li> <Link to="analytics">Analytics</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details >
                            <summary><HardDriveDownload />Drive</summary>
                            <ul>
                                <li><Link to="pdfs">Pdfs</Link></li>
                                <li><Link to="add-pdfs">Add Pdf</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details >
                            <summary><Users />User Profiles </summary>
                            <ul>
                                <li><Link to="user-profiles"> UserProfiles</Link></li>
                                <li><Link to="users">Users</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <Link to="me"><SquareUserRound />Me</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
