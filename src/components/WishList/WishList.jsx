import React, { useContext, useEffect , useState} from 'react';
import  './WishList.module.css';
import { cartContext } from "../../Context/CartContext";
import {Helmet} from "react-helmet";
import { toast } from "react-hot-toast";
import { ThreeCircles } from 'react-loader-spinner';

export default function WishList() {
 let { addToCart , setNumOfCartItems,getLoggedWishList , removeFromWishlist} = useContext(cartContext);
 const [WishProducts, setWishProducts] = useState([])
 let [isLoading, setIsLoading] = useState(false);


 async function addCart(id) {
  let res = await addToCart(id);
  if (res.data.status == 'success') {
    toast.success('Product add successfully')
    setNumOfCartItems(res.data.numOfCartItems)
  } else {
    toast.error('Failed to add product ')
  }
}

async function removeProduct(id) {
  let { data } = await removeFromWishlist(id);
  if (data?.status == 'success') {

    setWishProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    toast.success('Product removed from wishlist');
  } else {
    toast.error('Failed to remove product');
  }
}

  async function getWishlistProducts(){
    setIsLoading (true);
    let {data} = await getLoggedWishList();
    setWishProducts(data?.data);
    setIsLoading(false);
  }

  useEffect(()=>{
    getWishlistProducts();
  },[])

  return <>
              <Helmet>
                <title>WishList</title>
            </Helmet>
   {isLoading ? (
   <ThreeCircles
   height="80vh"
   width="100"
   color="#4fa94d"
   wrapperStyle={{}}
   wrapperClass="justify-content-center"
   visible={true}
   ariaLabel="three-circles-rotating"
   outerCircleColor=""
   innerCircleColor=""
   middleCircleColor=""
 />
) :<div className="container bg-main-light mx-auto p-3 m-5">
    <h1 className='h3 py-3'> My wish list :</h1>
    {WishProducts?.map((product)=>(
      <div className="row my-2 border-bottom py-1 align-items-center">
        <div className="col-md-2">
          <img className='w-100'  src={product?.imageCover} alt={product?.title}/>
        </div>
        <div className="col-md-10">
          <div className='d-flex justify-content-between align-items-center'>
            <div>
            <h3 className='h6 fw-bold'>{product?.title?.split(' ').slice(0,3).join(' ')}</h3>
          <h6 className='text-main'><span className='text-black'> Price :</span> {product?.price} EGP </h6>
          <button onClick={()=>removeProduct(product?._id)} className='btn btn-outline-danger'> <i className=' font-sm fas fa-trash-can'></i> Remove</button>
            </div>
            <div>
              <button onClick={ () => addCart(product.id)} className='btn btn-outline-success'>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>}
  </>
}