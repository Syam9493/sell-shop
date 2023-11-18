import React from 'react';
import Product from '../Components/Product';
import {Link, useParams} from 'react-router-dom'
import {Row,Col} from 'react-bootstrap';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Paginate from '../Components/Paginate';
import ProductCarousel from '../Components/ProductCarousel';
//import Meta from '../Components/Meta';
import { useGetProductsQuery } from '../slices/productsApiSlice';


const HomeScreen = () => {
   
  const {keyword, pageNumber} = useParams();
   
   const { data, isLoading, error} = useGetProductsQuery({keyword, pageNumber});

  return (
   <>
   {!keyword ? (<ProductCarousel/>) : (<Link to='/' className='btn btn-light mb-4'>Go Back</Link>)}
   
   { isLoading ? (
    <Loader/>
   ) : error ? (
    <Message variant='danger'>{ error?.data?.message || error.error }</Message>
   ) : (
     <>
     <h1>Latest Products</h1>
     <Row>
      {data.products.map((product) =>(
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
         <Product product={product} />
        </Col>
      ))}
     </Row>
     <Paginate 
      pages={data.pages}
      page={data.page}
      keyword={keyword ? keyword : ''}
      />
    </>
   )}
   </>
  )
}

export default HomeScreen