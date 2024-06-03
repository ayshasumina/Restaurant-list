import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Card from 'react-bootstrap/Card';
import './Home.css'
import { Col,Row,Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../redux/restaurantSlice';





function Home() {
  const dispatch = useDispatch()
  const {allRestaurants,error,loading} = useSelector(state=>state.restaurantReducer)
  useEffect(()=>{
  dispatch(fetchRestaurants())
  },[])

  //setting-pagination-variables
  const [currentPage,setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allRestaurants.slice(firstIndex,lastIndex);
  const npage = Math.ceil(allRestaurants.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

  function prevPage(){
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    } 
  }

  function changeCPage(id){
    setCurrentPage(id);
  }


  function nextPage(){
    if(currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    } 
  }
  return (
    <>
      <Header insideHome={true}/>
   <div className="container-fluid cardContainer" >
  {

    loading ?
    <div className="text-center mt-5 fw-bolder">
          <Spinner className='me-2' animation="border" variant="secondary" /> Loading...
    </div>
    :
      <Row className='my-5 d-flex align-items-center justify-content-center'>
     {

      allRestaurants?.length>0 ?
       records?.map(restaurant=>(
         <Col className=' d-flex align-items-center justify-content-center' key={restaurant?.id}  >
       <div className="item item1">
       <Card className='shadow rounded  ' style={{ width: '24rem' }}>
         <Card.Img  style={{height:'350px',width:'100%' ,borderRadius:'15px'}} variant="top" src={restaurant?.photograph} />
         <Card.Body>
           <Card.Title>{restaurant?.name}</Card.Title>
           <Card.Text>
             <p>Cuisine: {restaurant?.cuisine_type} <br />
             Location: {restaurant?.neighborhood}             
             </p>
            
           </Card.Text>
           <div className='d-flex justify-content-center'>
           <Link to={`${restaurant?.id}/view`} className='text-secondary' >View More...</Link>
           </div>
         </Card.Body>
       </Card>
       </div>
       </Col>
       ))
       :
       <div className="fw-bolder text-center mt-5 mb-5 text-danger">
        Product Not Found!!
       </div>

        
     }
        <div className="d-flex justify-content-center" style={{paddingBottom:'20px'}}>
        <nav>
  <ul className='pagination'>
    <li className='page-item'>
      <a href="#" className='page-link' onClick={prevPage}>Prev</a>
    </li>
    {
      numbers.map((n, i) => (
        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
          <a href="#" className='page-link' onClick={() => changeCPage(n)} >{n}</a>
        </li>
      ))
    }
    <li className='page-item'>
      <a href="#" className='page-link' onClick={nextPage}>Next</a>
    </li>
  </ul>
</nav>
        </div>
        <hr />
        <p className='text-center' style={{paddingBottom:'10px' , fontSize:'1.2em'}}>Copyright &#169; DineCafe &#174; aysha</p>
      </Row>
  } 
   </div>
    </>
  )
}

export default Home