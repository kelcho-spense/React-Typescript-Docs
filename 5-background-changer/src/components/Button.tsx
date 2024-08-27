import './button.scss';

export default function Button({ color, changeBGFunc }) {
    return (
        <button className='button' onClick={() => changeBGFunc(color)}>
            {color}
        </button>
    )
}

