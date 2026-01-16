import { GetIcon } from "@/utils"
import { Col, Row } from 'antd';

export default function WeatherCard({cardData,city}){
    const icon = GetIcon(cardData?.weather[0]?.icon)
    return(
        <>
            <div>
                {cardData?(
                    <div>
                        <h1>City:{city},{cardData?.sys?.country}</h1>
                        <h1>Weather: 
                            <span>{cardData?.weather[0]?.description}</span>
                        </h1>
                        <h1>Temp:<span>{cardData?.main?.feels_like}℃</span></h1>
                        <div>
                            <img  src={icon} alt="weatherIcon" />
                        </div>
                    </div>

                ):(
                    <h1>Nhập thành phố bạn cần xem : </h1>
                )}
                        
                
            </div>

    


            
        </>
    )
}