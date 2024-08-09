//CHILD COMPONENT


type VideoProps = {
    w: number,
    h: number,
    controls?: boolean
}

const Video = ({ w, h, controls }: VideoProps) => {
    return (
        <video
            src={`https://placehold.co/${w}X${h}/orange/white`}
            width={w}
            height={h}
            controls={controls && controls}
            style={{ borderRadius: "5%", padding: "10px" }}
        ></video>
    )
}

export default Video