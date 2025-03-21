import { CommandDialog,CommandInput,CommandList ,CommandEmpty,CommandGroup,CommandItem} from "@/components/ui/command"
import { useLocationSearch } from "@/hooks/use-weather"
import { useSearchHistory } from "@/hooks/useSearchHistory"
import { CommandSeparator } from "cmdk"
import { Clock, Loader2, Search, XCircle } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"

const CitySearch = () => {
    const [open,setOpen]=useState(false)
    const [query,setQuery]=useState("")
   const {data:locations,isLoading}= useLocationSearch(query)
   const {history,addToHistory,clearHistory}=useSearchHistory();
   const navigate=useNavigate();
   const handleSelect=(cityData:string)=>{
   const [lat,lon ,name,country]=cityData.split("|")
   addToHistory.mutate({
    query,
    name,
    lat:parseFloat(lat),
    lon:parseFloat(lon),
    country,
   })
   setOpen(false);
   navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
   }
  return (
   <>
   <Button variant="outline" 
   className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64" onClick={()=>setOpen(true)}><Search className="mr-2 h-4 w-4" />Search Cities</Button>
     <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." 
      value={query}
      onValueChange={setQuery}/>
      <CommandList>
        {query.length>2 && !isLoading && <CommandEmpty>No cities found.</CommandEmpty>}
        <CommandGroup heading="Favorites">
          
        </CommandGroup>
        <CommandSeparator />
        {history.length>0 && (
        <>
        <CommandSeparator />
        <CommandGroup>
          <div className="flex items-center justify-between px-2 my-2">
            <p className="text-xs text-muted-foreground">Recent Searches</p>
            <Button
            variant="ghost" size="sm" onClick={()=>clearHistory.mutate()}>
              <XCircle className="h-4 w-4" />
              Clear
            </Button>
          </div>
          {history.map((location)=>{
            return(
              <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`} 
                    onSelect={handleSelect}> <Clock className="w-4 h-4 mr-2 text-muted-foreground" /><span>{location.name}</span>
                    {location.state && (
                        <span className="text-sm text-muted-foreground">,{location.state}</span>
                    )}
                    <span className="text-sm text-muted-foreground">,{location.country}</span>
                    <span className="ml-auto text-xs  text-muted-foreground">,{format(location.searchedAt,"MMM d, h:mm a")}</span></CommandItem>

            )
          })}
          
        </CommandGroup>
        </>)}
        <CommandSeparator />
        {locations && locations.length>0 &&<CommandGroup heading="Suggestions">
            {isLoading &&(
                <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                </div>
            )}
            {locations.map((location)=>{
                return (
                    <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`} 
                    onSelect={handleSelect}> <Search className="w-4 h-4 mr-2" /><span>{location.name}</span>
                    {location.state && (
                        <span className="text-sm text-muted-foreground">,{location.state}</span>
                    )}
                    <span className="text-sm text-muted-foreground">,{location.country}</span></CommandItem>
                )
            })}
          
        </CommandGroup>}
      </CommandList>
    </CommandDialog>
   </>
  )
}

export default CitySearch