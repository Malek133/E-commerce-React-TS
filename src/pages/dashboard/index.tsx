
 import CookiesService from "@/services/CookiesService"
import LogInPage from "../LogInPage"


const AdminDashboard = () => {

       const token = CookiesService.get('jwt')

    return (
          <>
          <LogInPage
           isAuthenticated={token}
            />
          </>
    )
  }
  
  export default AdminDashboard