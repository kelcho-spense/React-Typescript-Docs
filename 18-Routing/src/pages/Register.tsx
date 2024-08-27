import Navbar from "../components/Navbar";
import { Key } from 'lucide-react';
import loginPic from '../assets/login.png';
import { NavLink } from 'react-router-dom';



export default function Register() {
    return (
        <>
            <Navbar />
            <div className="grid sm:grid-cols-2 gap-1 h-screen bg-base-200">
                <div className="flex items-center justify-center sm:order-first m-5 p-6">
                    <form className="card gap-3 place-items-center p-6 rounded-box ">
                        <div className="chat chat-end p-3">
                            <div className="chat-bubble text-4xl m-3 ">Register</div>
                        </div>
                        <label className="input input-bordered flex items-center gap-2 w-full max-w-xs ">
                            <input type="text" className="grow" placeholder="Full Name" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 w-full max-w-xs ">
                            <input type="password" className="grow" placeholder="Phone" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 w-full max-w-xs ">
                            <input type="password" className="grow" placeholder="Address" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 w-full max-w-xs ">
                            <input type="password" className="grow" placeholder="Email" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 w-full max-w-xs ">
                            <input type="password" className="grow" placeholder="Password" />
                        </label>
                        <button type='submit' className='btn btn-outline btn-info w-11/12'>Register</button>
                        <NavLink to="/" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""}>
                            🏡Go to HomePage
                        </NavLink>
                    </form>
                </div>
                <div className="flex items-center justify-center sm:h-full md:h-screen bg-base-300 p-6">
                    <img src={loginPic} alt="nopic" />
                </div>
            </div>

        </>
    );
}  