import { Link, Route, Routes, useSearchParams } from "react-router-dom"
import { getAllProducts, getReviewsByProduct } from "../api"
import { useEffect, useState } from "react"
import SingleProduct from "./SingleProduct"
function AllProducts() {
    //state to be set after API call
    const [products, setProducts] = useState([])
    //useEffect to start State
    useEffect(()=>{
      //async function needed inside useEffect
        const getProductsData = async ()=>{
          //save it to the database
          setProducts( await getAllProducts())
        } 
        //call the async function
        getProductsData()
    },[])
    return (
      <>
        <h1>All Coffee!</h1>
      
        {/* map over the array in state and decide how and what you want to put on the page! */}
        {products.map(product=>{
          return(
            <div key = {product.id}>
              <p>{product.name}</p>
              <img src= {product.imgurl} alt = {product.description}/>
              <button><Link to = {`/reviews/products/${product.id}`}>View product Reviews</Link></button>
            </div>
          )
        })}
      </>
    )
  }
  
  export default AllProducts
  