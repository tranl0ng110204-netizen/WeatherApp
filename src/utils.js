export const GetIcon = (iconCode) =>{
    if(!iconCode){
        return null
    }

    return `https://openweathermap.org/img/wn/${iconCode}.png`;
    

}