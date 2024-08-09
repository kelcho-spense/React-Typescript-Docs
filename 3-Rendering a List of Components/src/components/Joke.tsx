import './joke.scss'
interface jokeProp {
    id: number;
    joke: string;
    rating: number;
}

const Joke = ({ joke }: jokeProp) => {
    const rating = (rating:number) => {
        if (rating === 1) {
            return <span>★☆☆☆☆</span>
        } else if (rating === 2) {
            return <span>★★☆☆☆</span>
        } else if (rating === 3) {
            return <span>★★★☆☆</span>
        } else if (rating === 4) {
            return <span>★★★★☆</span>
        } else if (rating === 5) {
            return <span>★★★★★</span>
        }
    }

    return (
        <div className='joke'>
            <h4 className='jokename'>{joke.joke}</h4>
            <p className='rating'>{rating(joke.rating)}</p>
        </div>
    )
}

export default Joke