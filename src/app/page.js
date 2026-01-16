'use client'

import {Input,Button, Spin } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import WeatherCard from '@/components/WeatherCard';
import styles from "./page.module.css";
import Head from "next/head";
import Link from "next/link";
import { useState } from 'react';
import axios from 'axios';
import * as AppService from '../service/getData'


export default function Home() {
  const [weatherData,setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');

  const [city,setCity] = useState('')


  const [cardData,setCardData] = useState(null)

  
  const capitalize = (string) =>{
    if(string.length === 0){
      return string
    }
    const firstLetter = string.charAt(0).toUpperCase()
    const restLetters = string.slice(1)
    return firstLetter+restLetters
  } 

  const LocationHandle = (value) =>{
    setLocation(value)
  }

  const fetchWeatherData = async() =>{
    try{
        if (!location || !location.trim()) {
        alert("vui lòng nhập tên thành phố ")
        return;
      }
 
      const res = await AppService.GeocodingData(capitalize(location))
      console.log('data',res[0])
      setCity(res[0].name)
      console.log('city',city)
      if(res && res.length>0){
        const firstLocation =res[0]
          setWeatherData(firstLocation)
          const [fetchData] = await Promise.all([ AppService.GetWeatherDetail(firstLocation?.lat,firstLocation?.lon)])
          console.log('fetchData',fetchData)
          setCardData(fetchData)
          setLocation(''); // <-- Thêm dòng này
      }
      else{
        setError('Không tìm thấy thành phố này');
      }
    }
    catch(error){
      console.log('error',error)
    }
    
  }

  

 


  return (
   <>
        <div>
           <Head>
            <title>Weather App - Ứng dụng thời tiết</title>
            <meta name="description" content="Ứng dụng thời tiết với dự báo chính xác" />
          </Head>
        </div>
       

        <header className={styles.header}>
          <h1>Weather App</h1>
          <br></br>
          <p>Du bao thoi thiet dung WeatherAPI</p>
        </header>
        <div className={styles.search}>
          <Input value={location} placeholder="Enter the city name" onChange={(e) =>LocationHandle(e.target.value)}/>
          <Button onClick={fetchWeatherData}>
              <SearchOutlined/>
          </Button>
        </div>

       <div className={styles.card}>

          <WeatherCard cardData={cardData} location={location} city={city} />
       </div>
       
      <div className={styles.info}>
        <h3>Về ứng dụng của chúng tôi</h3>
        <p>
          Weather App cung cấp thông tin thời tiết chính xác và cập nhật cho 
          hơn 10,000 thành phố trên toàn thế giới. Dữ liệu được cập nhật mỗi 
          10 phút để đảm bảo độ chính xác.
        </p>
        <div className="features">
          <div className="feature">
            <h4>🌡️ Nhiệt độ chính xác</h4>
            <p>Cập nhật nhiệt độ thực tế và cảm giác như</p>
          </div>
          <div className="feature">
            <h4>🌧️ Dự báo chi tiết</h4>
            <p>Dự báo 3 ngày với thông tin chi tiết</p>
          </div>
          <div className="feature">
            <h4>📍 Toàn cầu</h4>
            <p>Thông tin thời tiết cho mọi thành phố trên thế giới</p>
          </div>
        </div>
      </div>
      

      <footer className={styles.footer}>
        <p>© 2023 Weather App. Tất cả các quyền được bảo lưu.</p>
        <p>
          <Link href="/contact" className="footer-link">Liên hệ</Link> | 
          <a href="#" className="footer-link"> Điều khoản sử dụng</a> | 
          <a href="#" className="footer-link"> Chính sách bảo mật</a>
        </p>
        <p className="api-credit">
          Dữ liệu thời tiết được cung cấp bởi <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer">WeatherAPI.com</a>
        </p>
      </footer>
   
   </>
  );
}
