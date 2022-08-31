import { useState, useEffect } from 'react'
import axios from 'axios'



const Dashboard = () => {

    const [lohnwerker, setLohnwerker] = useState([])

    const storedToken = localStorage.getItem('authToken')


    useEffect(() => {

      axios.get('/auth/user', { headers: { Authorization: `Bearer ${storedToken}` } })
          .then(response =>
              setLohnwerker(response.data.response))

          .catch(err => console.log(err))
           // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <article className="message is-success mt-4">
    <div className="message-header">
      <p> Login Success</p>
    </div>
    <div className="message-body">
      Welcome {lohnwerker}  <strong>You successfully Logged in</strong>
    </div>
  </article>
  )
}

export default Dashboard