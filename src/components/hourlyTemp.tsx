import { ForecastData } from "@/api/types"
import {Card,CardHeader,CardTitle,CardContent} from "@/components/ui/card"

import {ResponsiveContainer, XAxis,LineChart,Line,YAxis, Tooltip} from 'recharts'
import {format} from 'date-fns'
interface HourlyTempProps{
    data:ForecastData

}
const HourlyTemp = ({data}:HourlyTempProps) => {

    const chartData=data.list.slice(0,8).map((item)=>({
        time: format(new Date(item.dt *1000),"ha"),
        temp:Math.round(item.main.temp),
        feels_like:Math.round(item.main.feels_like),

    }))
  return <Card className=" w-full">
       <CardHeader>
        <CardTitle> Todays Temperature </CardTitle>
        <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width={"100%"} height={"100%"}>
                        <LineChart data={chartData}>
                            <XAxis dataKey="time"  fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis tickFormatter={(value)=>`${value}`}  fontSize={12} tickLine={false} axisLine={false} />
                             <Tooltip content={({active,payload})=>{
                                if(active && payload && payload.length){
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid grid-cols-3 gap-2">
                                          <div className="flex flex-col">
                                                <span className="text-[0.70rem] uppercase text-muted-foreground ">Temperature</span>
                                                <span className="font-bold">{payload[0].value}°</span>
                                            </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[0.70rem] uppercase text-muted-foreground">Feels Like</span>
                                                <span className="font-bold">{payload[1].value}°</span>
                                            </div>
                                        </div>
                                        
                                    )
                                }
                                return null
                             }}/>
                            <Line type="monotone" dataKey="temp" stroke="#64748b" strokeWidth={2} dot={false}/>
                            <Line type="monotone" dataKey="feels_like" stroke="#64748b" strokeWidth={2} dot={false} strokeDasharray="5 5"/>
                            
                        </LineChart>
                        </ResponsiveContainer>
                </div>
            </CardContent>
       </CardHeader>
  </Card>

  
}

export default HourlyTemp