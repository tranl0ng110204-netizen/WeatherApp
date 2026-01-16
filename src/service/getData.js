'use client'

import axios from "axios"


export const GeocodingData = async(data) =>{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_GEOCODING}q=${data}&appid=${process.env.NEXT_PUBLIC_APP_ID}`)
    return res.data
}


export const GetWeatherDetail = async(lat,lon) =>{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_WEATHER}lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_APP_ID}&units=metric&lang=vi`)
    return res.data
}