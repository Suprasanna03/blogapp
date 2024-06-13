import './App.css';
import RootLayout from './components/RootLayout';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import NavigationBar from './components/Navbar/NavigationBar';
import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom';
import { lazy,Suspense } from 'react';
import UserProfile from './components/Userprofile/UserProfile';
import AuthorProfile from './components/Authorprofile/AuthorProfile';
//import AddArticle from './components/add-article/AddArticle';
import Article from './components/article/Article';
import Articles from './components/articles/Articles';
import ArticlesByAuthor from './components/articles-by-author/ArticlesByAuthor';
const AddArticle=lazy(()=>import('./components/add-article/AddArticle'))
function App() {
  let router= createBrowserRouter([
   {
     path:'',
     element:<RootLayout/>,
     children:[
       {
         path:'',
         element:<Home/>
       },
       {
         path:"register",
         element:<Register />
       },
       {
         path:"login",
         element:<Login />
       },
       {
        path:"/user-profile",
        element:<UserProfile />,
        children:[
          {
            path:"articles",
            element:<Articles />
          },
          {
            path:"article/:articleId",
            element:<Article />
          },
          {
            path:'',
            element:<Navigate to='articles' />
          }
        ]
      },
      {
        path:"/author-profile",
        element:<AuthorProfile />,
        children:[
          {
            path:'new-article',
            element:<Suspense fallback="loading..."><AddArticle /></Suspense> 
          },
          {
            path:'articles-by-author/:author',
            element:<ArticlesByAuthor />,
           
          },
          {
            path:"article/:articleId",
            element:<Article />
          },
          {
            path:'',
            element:<Navigate to='articles-by-author/:author' />
          }
        ]
      }

     ]
   },
  
  ])
   
   return (
     <div>
     <RouterProvider router={router}/>
     </div>
     
   );
 }
 
 export default App;

