import  { PropsWithChildren } from 'react'
import Header from './header'
const layout = ({children}:PropsWithChildren) => {
  return (
    <div className='bg-gradient-to-br from-background to-muted w-full '>
        <Header></Header> 
        <main className='min-h-screen container px-4 py-8'>
        {children}
        </main>
       
        <footer className='border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60'>
            <div>
                <p>
                     Made by Team Sainath & Venkatesh
                </p>
            </div>
        </footer>
    </div>
  )
}

export default layout