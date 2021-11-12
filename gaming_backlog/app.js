const App = () => {
    const [games, setGames] = React.useState([
        // (Static) Will implement db
        {
            id: 1,
            title: 'The Last of Us',
            genre: 'Action-adventure'
        },
        {
            id: 2,
            title: 'Dark Souls',
            genre: 'RPG'
        },
        {
            id: 3,
            title: 'Stardew Valley',
            genre: 'Simulation, RPG'
        }
    ]);

    const lightTheme = {
        backgroundColor: "#fff",
        color: "#000"
    }

    const darkTheme = {
        backgroundColor: "#000",
        color: "#fff"
    }

    const [theme, setTheme] = React.useState('light');
    
    const total = games.length;

    return (
        <div className="app" style={theme === 'light' ? lightTheme : darkTheme}>
            <Header total={total} />
            <Logger games={games} setGames={setGames} theme={theme} setTheme={setTheme} />
            <Games games={games} setGames={setGames} theme={theme} />
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

const Logger = ({ games, setGames, theme, setTheme }) => {
    const [showForm, setShowForm] = React.useState(false);
    // Update game log
    const updateLog = (e) => {
        e.preventDefault();

        const form = document.getElementById('form');
        const titleInput = document.getElementById('title-input').value;
        const title = document.querySelector('.title').value;
        const genre = document.querySelector('.genre').value;

        // Check for empty string
        if (titleInput === '') {
            alert('No game added. Please enter a title.');

        }   // Check if title exists
            else if (games.some(game => game.title.toLowerCase() === titleInput.toLowerCase())) {
                alert('This game is already in your backlog.');

            }   else {
                    setGames(games => [...games, {
                        id: Math.floor(Math.random() * 1000),
                        title: title,
                        genre: genre
                    }])
                }
        
        form.reset();
    }

    const toggleTheme = () => {
        if (theme == 'light') {
            setTheme('dark');
        }   else {
            setTheme('light');
        }
    }
    
    return (
        <div className="container">
            <div className="btn-wrapper">
                {/* Form Add/Cancel Btns */}
                <button type="submit" id="add-btn" className={!showForm ? "btn btn-dark mt-3" : "btn btn-danger mt-3"} onClick={() => setShowForm(!showForm)}>{!showForm ? 'Add a Game' : 'Cancel'}</button>
                {/* Theme Toggler Btn */}
                <button className={theme === 'light' ? "btn btn-dark mt-3" : "btn btn-light mt-3" } id="theme-toggler" onClick={toggleTheme}>
                <i className={theme === 'light' ? "far fa-moon" : "fas fa-sun"}></i>
                </button>
            </div>

            {showForm && <form onSubmit={updateLog} id="form">
                <div className="form-group mt-3">
                    <label htmlFor="game-title">Title</label>
                    <input type="text" className="form-control title" id="title-input"></input>
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="game-genre">Genre(s) (optional)</label>
                    <input type="text" className="form-control genre"></input>
                </div>             
                <button type="submit" className="btn btn-dark mt-3">Add to Backlog</button>
            </form>
            }
        </div>
    )
}

const Games = ({ games, setGames, theme }) => {
    // Delete game from log
    const onDelete = (id) => {
        setGames(games.filter(game => game.id !== id));
    }

    return (
        <div className="container mt-3">
            { games.length > 0 ? <table className={theme === 'light' ? "table table-striped table-bordered table-hover table-condensed" : "table table-dark table-striped table-bordered table-condensed"}>
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
            </table> : <h5>You have no games in your backlog.</h5> }
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
