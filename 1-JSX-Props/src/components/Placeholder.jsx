
const Placeholder = ({w,h}) => {
    return (
        // https://placehold.co/600x400
        <img
            src={`https://placehold.co/${w}x${h}`}
            alt="no img"           
        />
    )
}

export default Placeholder