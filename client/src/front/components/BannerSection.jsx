import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { vr } from "../../helpers/vr";
import { enquiryValidation } from "../validations/homeValidation";
import { unwrapResult } from "@reduxjs/toolkit";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import useBannerStore from "../../admin/banner/useBannerStore";

export default function () {

    useEffect(() => {
        index()
    }, [])

    const { items, loading, total, index } = useBannerStore()

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="slide-container">
            <Slide>
                {
                    items && items.map((slideImage, index) => (
                        <div key={index}>
                            <div className="banner-container">
                                <img src={slideImage.image} />
                            </div>
                        </div>
                    ))
                }
            </Slide>
        </div>
    )
}