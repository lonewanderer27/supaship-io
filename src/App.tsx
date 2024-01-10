import './output.css'
import './App.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import AllPosts from './pages/AllPosts'
import Layout from './components/Layout'
import MessageBoard from './components/MessageBoard'
import PostView from './components/PostView'
import Welcome from './pages/Welcome'

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
        element: <Welcome />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App