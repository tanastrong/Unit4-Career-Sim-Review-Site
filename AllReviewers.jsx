import { useEffect, useState } from "react"
import { getAllReviewers } from "../api"


function AllReviewers({id, prodOrreviewer}) {
  const [reviewers, setReviewers] = useState()
  useEffect(()=>{
      //follow the logic in the already completed all products page, just do it for reviewres instead!
      const [reviewers, setReviewers] = useState([])
      useEffect(()=>{
        const getReviewers = async ()=>{
          setReviewers(await getAllReviewers())
        }
        getReviewers()
      }
      )
  }, [])
  const handleClick = (id)=>{

  }

    return (
      <>
      {reviewers.map(reviewer=>
      <div onClick = {(nav)}>

      </div>
      )}
      <h1>Reviewers</h1>
      <p> A user should see all the reviewers in the database and if they click on, the should be able to see a reviewers details, AND all the reviews by that reviewer.</p>
      </>
    )
  }
  
  export default AllReviewers
  