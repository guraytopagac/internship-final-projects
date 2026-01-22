import './css/App.css'
import Header from './Header'
import Footer from './footer'
import { gamesData } from './data'
import Game from './Game'

function App() {
  return (
    <div className="page">
      <Header />
      <main className="content">
        <section className="allGames">
          {gamesData.map(game => (
            <Game key={game.id} game={game} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App