import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import './View.css'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function View() {

  const [display, setDisplay] = useState(false)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [restaurant, setRestaurant] = useState({})
  const {id} = useParams()
  //console.log(id);

  useEffect(()=>{
    if(localStorage.getItem("allRestaurants")){
      const allRestaurants = JSON.parse(localStorage.getItem("allRestaurants"))
      setRestaurant(allRestaurants.find(result=>result.id==id))
      
    }
  },[])
  return (
    <div>
        <Header/>
        <div className="row" >
        
             <img src={restaurant?.photograph} style={{width:'450px',height:'640px'}} />
            <div className="col col2" style={{paddingBottom:'20px', paddingTop:'20px'}}>
                <div className="c2-content bg-secondary p-3 rounded shadow  ">
                    <h1>{restaurant.name}</h1>
                   <p style={{marginBottom:'30px'}}> {restaurant?.neighborhood}</p>
                   <hr />
                   <p className='m-0'> Cusine: {restaurant?.cuisine_type}</p>
                   <hr />
                   <p className='m-0'>Address: {restaurant?.address}</p>

              
                </div>
                <div className="buttons">
                 <button onClick={handleShow} style={{width:'180px',margin:'15px 0 15px 0'}} className='btn btn-primary rounded'>
                    Operating Hours
                   </button>

                   <button onClick={()=>setDisplay(!display)} style={{width:'280px'}} className='btn btn-primary rounded'>
                    Click here to view the reviews
                   </button>
                 </div>
                 {
            display ?
              <div className='reviews p-3 mt-3 border'>
                {restaurant.reviews && restaurant.reviews.length > 0 ? (
                  restaurant.reviews.map((review, index) => (
                    <div key={index} className='review-item'>
                      <h5>{review.name} : {review.date}</h5>
                 
                      <p>Rating : {review.rating} Stars</p>
                      <p>{review.comments}</p>
                      <hr />
                    </div>
                  ))
                ) : (
                  <p>No reviews available</p>
                )}
              </div> : null
          }

            </div>
            <hr style={{marginTop:'30px'}} />
            <p className='text-center' style={{paddingBottom:'10px' , fontSize:'1.2em'}}>Copyright &#169; DineCafe &#174; aysha</p>
        </div>
        
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h1>Operating Hours</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>     {restaurant.operating_hours ? (
            <ul className='list-group'>
              {Object.entries(restaurant.operating_hours).map(([day, hours]) => (
                <li className='list-group-item' key={day}><strong>{day} :</strong> {hours}</li>
              ))}
            </ul>
          ) : (
            <p>Operating hours not available</p>
          )}</Modal.Body>
        <Modal.Footer>       
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default View