

const Personal = ({ name, moreDetails, isLogged, langs }) => {
    return (
        <>
            <h2>My name is {name}</h2>
            <p>My height is {moreDetails.age}</p>
            <p>{isLogged ? "I'm logged in" : "i'm not logged in"}</p>
            <div>Favorite programming Languages</div>
            <ul style={{ listStyle: 'none', backgroundColor: 'lightGreen' }}>
                {
                    langs && langs.map((lang,index) => {
                        return (
                            <li key={index}>{lang}</li>            
                        )
                    })
                }
            </ul>
        </>
    )

}

export default Personal