import {Routes,Route} from 'react-router-dom'
import SignIn from './SignIn'
import Register from './Register';
import Layout from './Layout';
import Home from './Home';
import Shop from './Shop';
import CheckOutPage from './CheckOutPage';
import CreateFood from './CreateFood';
import About from './About';
import RequireAuth from './RequireAuth';
import CreateAdmin from './CreateAdmin';
import AdminPage from './Admin';
import Question from './Question';
import Location from './Location';
import EditFood from './EditFood';
import Terms from './Terms';
import FoodPage from './FoodPage';

function App() {
  return(
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='login' element={<SignIn/>}/>
        <Route path='signup' element={<Register/>}/>
        <Route path='shop' element={<Shop />}/>
        <Route path='tandc' element={<Terms/>}/>
        <Route path='foodpage/:foodName' element={<FoodPage/>}/>
        <Route element={<RequireAuth allowedRoles={["2006"]}/>}>
        <Route path='adminSignup' element={<CreateAdmin/>}/>
        <Route path='createFood' element={<CreateFood/>}/>
        <Route path='editFood/:foodName' element={<EditFood/>}/>
        <Route path='adminpage' element={<AdminPage/>}/>
        </Route>
        <Route element={<RequireAuth allowedRoles={["2005"]}/>}>
        <Route path='question' element={<Question/>}/>
        <Route path='location' element={<Location/>}/>
        <Route path='checkout' element={<CheckOutPage/>}/>
        </Route>
        <Route path='about' element={<About/>}/>
      </Route>
    </Routes>
  )
}

export default App;
