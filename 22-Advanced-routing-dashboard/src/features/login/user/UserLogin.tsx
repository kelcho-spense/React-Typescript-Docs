import { useForm } from "react-hook-form"
import { NavLink } from "react-router-dom";



type FormValues = {
    email: string;
    password: string;
}

function UserLogin() {

   

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const onSubmit = async (data: FormValues) => {
        
    };
    return (
        <div className="flex flex-col gap-2">
            <form onSubmit={handleSubmit(onSubmit)} className="card max-w-fit grid grid-cols-1 gap-2 ">
                <div className="chat chat-end place-items-center">
                    <div className="chat-bubble text-3xl ">User Login</div>
                </div>
                <div className='grid grid-cols-1 gap-2 place-items-center rounded-box max-w-fit'>
                    <label className="input input-bordered flex items-center gap-2 w-full max-w-xs ">
                        <input {...register("email", { required: true })} type="email" className="grow" placeholder="Email" />
                    </label>
                    {errors.email && <span className="text-red-600">email is required</span>}
                    <label className="input input-bordered flex items-center gap-2 w-full max-w-xs ">
                        <input {...register("password", { required: true })} type="password" className="grow" placeholder="Password" />
                    </label>
                    {errors.password && <span className="text-red-600">password is required</span>}
                </div>
                <button type='submit' className='btn btn-outline w-full btn-info '>Login</button>
            </form>
            <div className="flex gap-2 items-center justify-center">
                <button className='btn btn-info btn-outline btn-sm'>
                    <NavLink to="/register/user"
                        className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""
                        }>Need an account?
                    </NavLink>
                </button>
                <button className='btn btn-sm btn-warning btn-outline'>
                    <NavLink to="/login/admin"
                        className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""
                        }>🅰️Admin ?
                    </NavLink>
                </button>
            </div>
        </div>
    )
}

export default UserLogin