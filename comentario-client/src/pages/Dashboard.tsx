import Header from '../components/Header'
import PublicBoards from '../components/PublicBoards'
import YourBoards from '../components/YourBoards'

const Dashboard = () => {
  return (
    <div>
        <Header/>
        <YourBoards/>
        <PublicBoards/>
    </div>
  )
}

export default Dashboard