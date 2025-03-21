import WeatherSkeleton from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"
import { AlertTriangle, RefreshCw, MapPin} from "lucide-react"
import {Alert ,AlertDescription, AlertTitle} from "@/components/ui/alert"
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemp from "@/components/hourlyTemp";
import WeatherDetails from "@/components/weatherDetails";
import WeatherForecast from "@/components/weatherForecast";

const WeatherDashboard = () => {

    const {coordinates,error:locationError,isLoading:locationLoading,getLocation}=useGeolocation();
  
    const locationQuery=useReverseGeocodeQuery(coordinates);
    const weatherQuery=useWeatherQuery(coordinates)
    const forecastQuery=useForecastQuery(coordinates)
    console.log(locationQuery)
    const handleRefresh=()=>{
        getLocation();
        if(coordinates!==null && coordinates!==undefined){
          locationQuery.refetch();
          weatherQuery.refetch();
          forecastQuery.refetch();

        }
        
    }
    if(locationLoading){
        return <WeatherSkeleton />
    }
    if(locationError){
        return(
        <Alert variant="destructive">
        <AlertTriangle  className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4 "/>
                Enable location
          </Button>
          </AlertDescription>
      </Alert>
        )
    }
    if(!coordinates){
        return(
        <Alert variant="destructive">
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather </p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4 "/>
                Enable location
          </Button>
          </AlertDescription>
      </Alert>
        )
    }
    const locationName=locationQuery.data?.[0];
    if(weatherQuery.error || forecastQuery.error){
        return (
            <Alert variant="destructive">
        <AlertTriangle  className="h-4 w-4" />
        <AlertTitle> Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch teh weather data please try again</p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4 "/>
                retry
          </Button>
          </AlertDescription>
      </Alert>
        )
    }
    if(!weatherQuery.data|| !forecastQuery.data){
        return <WeatherSkeleton />
    }
  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Your Location </h1>
           <Button variant={"outline"} size={"icon"} onClick={handleRefresh} disabled={weatherQuery.isFetching || forecastQuery.isFetching} >
             <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching?"animate-spin":""}`}/>
           </Button>
        </div>
        <div className="grid gap-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <CurrentWeather
              data={weatherQuery.data}
              locationName={locationName}/>
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

export default WeatherDashboard