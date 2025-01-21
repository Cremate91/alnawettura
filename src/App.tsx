import { AppSearchPage } from './components/page/app-search-page'
import { AppSidebar } from './components/custom/app-sidebar'
import { StartPage } from './components/page/app-start-page'
import { ThemeProvider } from './providers/theme-provider'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import alnaturaBg from '@/assets/img/alnatura-bg.jpg';
import { Route, Routes } from 'react-router'
import { WeatherDetailPage } from './components/page/app-weather-detail-page'

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="AW-ui-theme">
      <SidebarProvider defaultOpen={false}>
        <QueryClientProvider client={queryClient} >
          <AppSidebar />
          <main className='w-screen h-screen relative'>
            <div className='flex items-center px-2'>
              <SidebarTrigger variant={'default'} className='bg-transparent text-primary hover:bg-primary hover:text-white' />
              <h1 className="text-primary font-bold text-center ml-2">Das Wetter in Deutschland</h1>
            </div>
            <img src={alnaturaBg} className='z-[-1] object-cover absolute top-0 left-0 opacity-20 w-full h-full pointer-events-none' />
            <div className="px-4">
              <Routes>
                <Route path='/' element={<StartPage />} />
                <Route path='/search' element={<AppSearchPage />} />
                <Route path='/weather-detail/:name' element={<WeatherDetailPage />} />
              </Routes>
            </div>
          </main>
        </QueryClientProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
