import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { vr } from "../../helpers/vr";
import { enquiryValidation } from "../validations/homeValidation";
import { contact } from "../slices/homeSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { index } from "../../admin/banner/bannerSlice";

export default function () {

    const { items, perPage, total } = useSelector(state => state.banner)
    const dispatch = useDispatch()
    useEffect(() => { 
        dispatch(index())
    }, [dispatch])
    
    console.log(items);
    const spanStyle = {
        padding: '20px',
        background: '#efefef',
        color: '#000000'
    }

    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '500px'
    }
    const slideImages = [
        {
            image: 'http://127.0.0.1:8800/uploads/1716445250682.png',
            caption: 'Slide 1'
        },
        {
            image: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
            caption: 'Slide 2'
        },
        {
            image: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
            caption: 'Slide 3'
        },
    ];

    return (
        <div className="slide-container">
            <Slide>
                {items && items.map((slideImage, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle }}>
                            <img src={slideImage.image} />
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    )
}