import React from 'react'
import './Products.module.css'
import FeatureProducts from '../featureProducts/FeatureProducts'
import { Helmet } from 'react-helmet'

export default function Products() {
  return (
    <>
      <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      </>
    <FeatureProducts />
    </>
  )
}
