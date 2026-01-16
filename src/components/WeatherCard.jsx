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
                        <Row>
                            <Col span={15}>
                                <h3>Tốc độ gió : {cardData?.wind?.speed}m/s</h3>
                                <h3>Tầm nhin:{cardData?.visibility/1000}km</h3>
                            </Col>
                            <Col span={9}>
                                <h3>Độ ẩm : {cardData?.main?.humidity}%</h3>
                            </Col>
                        </Row>
                    </div>

                ):(
                    <h1>Nhập thành phố bạn cần xem : </h1>
                )}
                        
                
            </div>

    


            
        </>
    )
}