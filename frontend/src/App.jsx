// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HeroSection from "./components/Home/HomePage";
// import PublicNavbar from "./components/Navbar/PublicNavbar";
// import LoginForm from "./components/Users/Login";
// import { useSelector } from "react-redux";
// import RegistrationForm from "./components/Users/Register";
// import PrivateNavbar from "./components/Navbar/PrivateNavbar";
// import { getUserFromStorage } from "./utils/getUserFromStorage";
// import AddCategory from "./components/Category/AddCategory";
// import CategoriesList from "./components/Category/CategoriesList";
// import UpdateCategory from "./components/Category/UpdateCategory";
// import TransactionForm from "./components/Transactions/TransactionForm";
// import Dashboard from "./components/Users/Dashboard";
// import UserProfile from "./components/Users/UserProfile";
// import AuthRoute from "./components/Auth/AuthRoute";

// function App() {
//   //get the token
//   const getToken = getUserFromStorage();
//   const user = useSelector((state) => state?.auth?.user);
//   return (
//     <BrowserRouter>
//       {/* Navbar */}
//       {/* <PublicNavbar />
//       <PrivateNavbar /> */}
//       {user ? <PrivateNavbar /> : <PublicNavbar />}
//       <Routes>
//         <Route path="/" element={<HeroSection />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/register" element={<RegistrationForm />} />
//         <Route path="/add-category" element={<AddCategory />} />
//         <Route path="/categories" element={<CategoriesList />} />
//         <Route path="/update-category/:id" element={<UpdateCategory />} />
//         <Route path="/add-transaction" element={<TransactionForm />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route
//           path="/profile"
//           element={
//             <AuthRoute>
//               <UserProfile />
//             </AuthRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroSection from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import LoginForm from "./components/Users/Login";
import { useSelector } from "react-redux";
import RegistrationForm from "./components/Users/Register";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import AddCategory from "./components/Category/AddCategory";
import CategoriesList from "./components/Category/CategoriesList";
import UpdateCategory from "./components/Category/UpdateCategory";
import TransactionForm from "./components/Transactions/TransactionForm";
import Dashboard from "./components/Users/Dashboard";
import UserProfile from "./components/Users/UserProfile";
import AuthRoute from "./components/Auth/AuthRoute";

function App() {
  const user = useSelector((state) => state?.auth?.user);

  return (
    <BrowserRouter>
      {/* Navbar */}

      {user ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route
          path="/add-category"
          element={
            <AuthRoute>
              <AddCategory />
            </AuthRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <AuthRoute>
              <CategoriesList />
            </AuthRoute>
          }
        />
        <Route
          path="/update-category/:id"
          element={
            <AuthRoute>
              <UpdateCategory />
            </AuthRoute>
          }
        />
        <Route
          path="/add-transaction"
          element={
            <AuthRoute>
              <TransactionForm />
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <UserProfile />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
