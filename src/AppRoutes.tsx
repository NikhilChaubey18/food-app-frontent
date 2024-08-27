import {Routes,Route } from "react-router-dom"
import Layout from "./layouts/layout"
import HomePage from "./pages/HomePage"
import AuthCallbackPage from "./pages/AuthCallBackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/MangeRestaurantPage";
import SearchPage from "./pages/SearchPage";


export default function AppRoutes() {
  return (
   <Routes>
    <Route path="/" element={<Layout showHero><HomePage/></Layout>}/>
    <Route path="/auth-callback" element={<AuthCallbackPage />} />
    <Route element={<ProtectedRoute/>}><Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />
        </Route>
      
    
    <Route path="/userpr" element={<h1>hii l'm fine</h1>}></Route>
   </Routes>
  )
}
