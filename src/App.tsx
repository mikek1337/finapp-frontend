import './App.css'
import { Header } from './components/header'
import { authClient } from './lib/auth-client'
import { Loading } from './components/loading'
import { Outlet } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();
function App() {
  
  const {useSession} = authClient;
  const {data, isPending} = useSession();
  
  return (
    <QueryClientProvider client={queryClient}> 
      {isPending ?
        (<Loading/>):
        (
        <Header user={data?.user}/>
        )
      }
      <Outlet/> 
    </QueryClientProvider>
  )
}

export default App
