
interface HelloProps {
    desc: string
}

const Hello = ({ desc }: HelloProps) => {
    return (
        <h1 className="border-2 border-indigo-400 shadow-lg text-3xl text-orange-100 font-bold underline">
            {desc}
        </h1>
    )
}

export default Hello