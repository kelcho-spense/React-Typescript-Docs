export const ratingFun = (rating: number) => {
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
    } else {
      return <span>☆☆☆☆☆</span>
    }

  }