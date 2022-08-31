import { useState, useEffect } from 'react'
import axios from 'axios'



const Dashboard = () => {

    const [lohnwerkers, setLohnwerkers] = useState([])

    const storedToken = localStorage.getItem('authToken')


    useEffect(() => {

      axios.get('/auth/user', { headers: { Authorization: `Bearer ${storedToken}` } })
          .then(response =>
              setLohnwerkers(response.data.response))

          .catch(err => console.log(err))
           // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <div>
    <article className="message is-success mt-4">
    <div className="message-header">
      <p> Login Success</p>
    </div>
    <div className="message-body">
      Welcome 
      { lohnwerkers.map(lohnwerker => {return <div key={lohnwerker._id}>
            <p>{lohnwerker.name}</p>
        </div>})
        }
       <strong>You successfully Logged in</strong>
    </div>
  </article>
  </div>
  )
}

export default Dashboard