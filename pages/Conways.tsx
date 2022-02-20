import Title from "../components/Headers/Title"

interface Props {}

const Conways = (props: Props) => {
    return (
        <div>
            <Title>Conway&apos;s Game of Life</Title>

            <div>
                <div>
                    <canvas />
                </div>
                <div>width, height, reset, start/stop</div>
            </div>
        </div>
    )
}

export default Conways
