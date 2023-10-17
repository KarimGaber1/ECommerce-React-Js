import React from 'react'
import './Home.module.css'
import FeatureProducts from '../featureProducts/FeatureProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet'






export default function Home() {
  return (
    <>
      <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>E-Commerce</title>
      </Helmet>
      </>
      <MainSlider />
      <CategoriesSlider />
      <FeatureProducts />
    </>
  )
}
