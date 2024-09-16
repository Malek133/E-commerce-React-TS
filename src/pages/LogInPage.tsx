
import { selectLogin, userLogin } from "@/app/feauture/LoginSlice"
import { AppDispatch } from "@/app/store"
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
import CookiesService from "@/services/CookiesService"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {useNavigate,Navigate
    } from "react-router-dom"

const LogInPage = (
   { isAuthenticated }: { isAuthenticated: string | undefined }
) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate(); // Utilisation de useNavigate pour redirection
  // const cookies = new Cookies();  // Création d'une instance de Cookies
  const { loading, data, error } = useSelector(selectLogin);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [user, setUser] = useState({
    identifier: "",
    password: ""
  });

  console.log(loading, data, error);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userLogin(user));
    setIsEmail(user.identifier === "");
    setIsPassword(user.password === "");

    if (user.identifier !== "" && user.password !== "") {
      console.log(user);
      GoToDash(); // Appel de la fonction de redirection après validation
    }
  };

  const GoToDash = () => {

     const token = CookiesService.get('jwt')

    if (token) {
      navigate("/Dashboard/products"); // Redirection vers la page de dashboard si le JWT existe
    } else {
      alert("JWT manquant. Veuillez vous connecter pour accéder au tableau de bord.");
    }
  };

  // Si l'utilisateur est déjà authentifié, on redirige automatiquement
   if (isAuthenticated) return <Navigate to="/Dashboard/products" replace />

  return (
    <section className="h-auto flex items-center justify-center">
      <Card className="w-[350px] px-6">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>

        <form onSubmit={submitHandler}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                name="identifier"
                value={user.identifier}
                onChange={onChangeHandler}
                className={isEmail ? 'border-red-500' : ''}
              />
              {isEmail ? <p className="text-red-500 text-sm">Veuillez entrer un email valide</p> : null}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                type='password'
                name="password"
                value={user.password}
                onChange={onChangeHandler}
                className={isPassword ? 'border-red-500' : ''}
              />
              {isPassword ? <p className="text-red-500 text-sm">Veuillez entrer password svp!!</p> : null}
            </div>
          </div>

          <CardFooter className="flex justify-between py-7">
            <Button type="submit">Connexion</Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default LogInPage;





