import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { useParams, useSearchParams } from "react-router-dom"
import { AlertTriangle, RefreshCw, MapPin} from "lucide-react"
import {Alert ,AlertDescription, AlertTitle} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import WeatherSkeleton from "@/components/loading-skeleton";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemp from "@/components/hourlyTemp";
import WeatherDetails from "@/components/weatherDetails";
import WeatherForecast from "@/components/weatherForecast";
const CityPage = () => {
  
    const [searchParams]=useSearchParams()
    const params=useParams;
    const { cityName } = useParams();
    const lat=parseFloat(searchParams.get("lat")|| "0")
    const lon=parseFloat(searchParams.get("lon")||"0")
    const coordinates={lat,lon};
    const weatherQuery=useWeatherQuery(coordinates)
    const forecastQuery=useForecastQuery(coordinates)
    if(weatherQuery.error || forecastQuery.error){
      return (
          <Alert variant="destructive">
      <AlertTriangle  className="h-4 w-4" />
      <AlertTitle> Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Failed to fetch teh weather data please try again</p>
        </AlertDescription>
    </Alert>
      )
  }

  if(!weatherQuery.data|| !forecastQuery.data ||!cityName){
    return <WeatherSkeleton />
}
  
  return (
    <div className="space-y-4">
    <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{cityName} ,{weatherQuery.data.sys.country} 
        <div>
          
          </div>
          </h1>
      
    </div>
    <div className="grid gap-6">
        <div className="flex flex-col  gap-4">
          <CurrentWeather
          data={weatherQuery.data}/>
          <HourlyTemp data={forecastQuery.data}/>
        </div>
        <div className="flex flex-col md:flex-row gap-5 ">
            <WeatherDetails data={weatherQuery.data} />
            <WeatherForecast data={forecastQuery.data}/>
        </div>
    </div>
</div>
  )
  }

export default CityPage