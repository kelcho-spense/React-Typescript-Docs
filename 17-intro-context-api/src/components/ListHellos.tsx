import Hello from './Hello'

const ListHellos = () => {
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            <Hello desc="Hello world!" />
            <Hello desc="Hello world!" />
            <Hello desc="Hello world!" />
            <Hello desc="Hello world!" />
        </div>
    )
}

export default ListHellos