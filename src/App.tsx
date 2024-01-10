import './output.css'
import './App.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Welcome, { welcomeLoader } from './pages/Welcome'

import AllPosts from './pages/AllPosts'
import Layout from './components/Layout'
import MessageBoard from './components/MessageBoard'
import PostView from './components/PostView'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <MessageBoard />,
        children: [
          {
            path: ":pageNumber",
            element: <AllPosts />
          },
          {
            path: 'post/:postId',
            element: <PostView />
          }
        ]
      },
      {
        path: 'welcome',
        element: <Welcome />,
        loader: welcomeLoader
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App