

function Form({ setEmail }) {
    const handleSubmit = (e) => {
        e.preventDefault()
        setEmail(e.target[0].value)
    }
    return (
        <section className="rounded-md bg-black/70 p-2">
            <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">

                    <form onSubmit={handleSubmit} className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <div className="mt-2">
                                    <input className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email"
                                        placeholder="Email"
                                    >
                                    </input>
                                </div>
                            </div>
                            <div>
                                <button type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                > Register  </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default Form