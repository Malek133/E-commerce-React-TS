
import { selectLogin, userLogin } from "@/app/feauture/LoginSlice"
//  import { AppDispatch } from "@/app/store"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const LogInPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const {loading,data,error}=useSelector(selectLogin);
  const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [user,setUser] = useState({
        
      identifier:"",
      password:""
    });
    console.log(loading,data,error)

    

   

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name , value} = e.target;
      setUser({...user,[name]:value});
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) =>{
      
      e.preventDefault();
      dispatch(userLogin(user))
      setIsEmail(user.identifier === "");
      setIsPassword(user.password === "");
    
      if (user.identifier !== "" && user.password !== "") {
        
        console.log(user);
      }
      }
    

  return (
    <section className="h-auto flex items-center justify-center">
   
    <Card className="w-[350px] px-6">
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      {/* <CardContent> */}
     
      <form onSubmit={submitHandler} >
          <div className="grid w-full items-center gap-4">
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Email"  name="identifier"
              value={user.identifier} onChange={onChangeHandler}
              className={isEmail ? 'border-red-500' : ''} />
              {isEmail && <p className="text-red-500 text-sm">
                Veuillez entrer un email valide</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="Password" 
              type='password' name="password" value={user.password}
              onChange={onChangeHandler} 
              className={isPassword ? 'border-red-500' : ''}  />
              {isEmail && <p className="text-red-500 text-sm">
                Veuillez entrer password svp!!</p>}

            </div>
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>
        
      {/* </CardContent> */}
      <CardFooter className="flex justify-between py-7">
        
        <Button  type="submit">connexion</Button>
      </CardFooter>
       </form>
      
    </Card>


    </section>
  )
}

export default LogInPage
