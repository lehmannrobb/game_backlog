const App = () => {
    const [games, setGames] = React.useState([
        {
            id: Math.random(),
            title: 'The Last of Us',
            genre: 'Action-adventure'
        },
        {
            id: Math.random(),
            title: 'Dark Souls',
            genre: 'RPG'
        },
        {
            id: Math.random(),
            title: 'Stardew Valley',
            genre: 'Simulation, RPG'
        }
    ]);
    
    const total = games.length;

    return (
        <div>
            <Header total={total} />
            <Logger games={games} setGames={setGames} />
            <Games games={games} setGames={setGames} />
        </div>
    )
}

const Header = ({ total }) => {
    return (
        <div className="container d-flex justify-content-between">
            <h1>Game Backlog</h1>
            <div className="log">
                <i className="fas fa-gamepad fa-2x"></i>
                <div className="circle">
                    <span id="total">{total}</span>
                </div>
            </div>
        </div>
    )
}

const Logger = ({ games, setGames }) => {
    const updateLog = (e) => {
        e.preventDefault();

        const form = document.getElementById('form');
        const titleInput = document.getElementById('title-input').value;
        const title = document.querySelector('.title').value;
        const genre = document.querySelector('.genre').value;

        if (titleInput === '') {
            alert('No game added. Please enter a title');

        }   else if (games.some(game => game.title.toLowerCase() === titleInput.toLowerCase())) {
                alert('This game is already in your backlog.');

            }   else {
                    setGames(games => [...games, {
                        id: Math.random(),
                        title: title,
                        genre: genre
                    }])
    
                    console.log('click');
                }
        
        form.reset();
    }
    
    return (
        <div className="container">
            <form onSubmit={updateLog} id="form">
                <div className="form-group mt-3">
                    <label htmlFor="game-title">Title</label>
                    <input type="text" className="form-control title" id="title-input"></input>
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="game-genre">Genre(s) (optional)</label>
                    <input type="text" className="form-control genre"></input>
                </div>             
                <button type="submit" className="btn btn-dark mt-3">Add Game</button>
            </form>
        </div>
    )
}

const Games = ({ games, setGames }) => {
    const onDelete = (id) => {
        setGames(games.filter(game => game.id !== id));
    }

    return (
        <div className="container mt-3">
            { games.length > 0 ? <table className="table table-striped table-bordered table-hover table-condensed">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game => {
                        return (
                            <tr key={game.id}>
                                <td>{game.title}</td>
                                <td>{game.genre}</td>
                                <td>
                                    <div className="dlt-btn" onClick={() => {
                                        const id = game.id;
                                        onDelete(id)
                                        }}>
                                        <i className="fas fa-minus-circle"></i>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> : null }
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));