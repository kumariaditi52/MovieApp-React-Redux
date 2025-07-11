// import React from 'react'
// import Navbar from './components/Navbar'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import { Container } from "react-bootstrap";
// import MovieList from './components/MovieList';
// import MovieDetails from './components/MovieDetails';
// import NotFound from './components/NotFound';

// const App = () => {
  
//   return (
//     <div className="font color-body ">
//       <Navbar />
//       <Container>
//         <BrowserRouter>
//           <Routes>
//             <Route path='/'           element={<MovieList />}     />
//             <Route path='/movie/:id'  element={<MovieDetails />}  />
//             <Route path='*'           element={<NotFound />}      />
//           </Routes>
//         </BrowserRouter>
//       </Container>
//     </div >
//   )
// }

// export default App

import React from 'react'
import NavigationBar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Container } from "react-bootstrap";
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  
  return (
    <div className="font color-body">
      <BrowserRouter>
        <NavigationBar />
        <Container>
          <Routes>
            {/* Public Routes */}
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            
            {/* Protected Routes */}
            <Route 
              path='/' 
              element={
                <ProtectedRoute>
                  <MovieList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/movie/:id' 
              element={
                <ProtectedRoute>
                  <MovieDetails />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  )
}

export default App
