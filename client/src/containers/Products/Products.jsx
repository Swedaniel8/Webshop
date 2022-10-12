import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import CSSRulePlugin from 'gsap/CSSRulePlugin'


import { ProductCard } from '../../components/index'

import { getItems } from '../../slices/apiReducer'
import { unwrapResult } from '@reduxjs/toolkit'
import './Products.css'


const Products = () => {
  const dispatch = useDispatch()
  const productArray = [
    {id:"123123",title:"headphone1",info:"1this is a text what else whatever..",price:10,img:"imgTest1", review:1,quantity:1},
    {id:"1232323",title:"headphone2",info:"2this is a text what else whatever..",price:20,img:"imgTest2", review:3,quantity:1},
    {id:"454545",title:"headphone3",info:"3this is a text what else whatever..",price:30 ,img:"imgTest3", review:5,quantity:1},
    {id:"9999991123",title:"headphone4",info:"4this is a text what else whatever..",price:40 ,img:"imgTest4", review:3,quantity:1},
    {id:"123", title: "XRM Headphones 1", info:"Great looking headphones with doolby x13 Virtual Sound",price:50, img:"", review:4,quantity:1}]
  const [products, setProducts ] = useState([])
  useEffect(()=>{
    dispatch(getItems())
      .then(unwrapResult)
      .then(res => {
        if(!res.err && res.success){            
          setProducts(res.products)
        }
      })
  },[])
 /*
    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger)
        //gsap.registerPlugin(CSSRulePlugin);
        gsap.utils.toArray('.info-item').forEach((item, i)=>{
        //const beforeDiv = CSSRulePlugin.getRule(`.products__info .info-item:nth-child(${i})`);
        console.log("beforeDiv: ",item)
        
           gsap 
                .fromTo(item,{
                    autoAlpha:1
                },
                {scrollTrigger: {
                    trigger: ".component__navbar",
                    start: `${800+i * 48}px 180px `, //start: `top ${i * -200}px`,
                    end: `100`,
                    toggleActions: "play none none reverse",
                    scrub:1,
                    markers:true
                    
                  },
                    autoAlpha:0.01
                })
        })
        
    },[])
*/
  return (
    <div className='container__products'>
      <div className='products__items'>
        {products.map((card,i)=>{
          return <ProductCard productsInfo={card} key={i}/>
        })}        
      </div>
        
       
    </div>
  )
}

export default Products