"use client"
import { useState } from "react"
import {auth} from "../../lib/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"


const Login = () => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    
    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault()
        console.log(email, password)
        
        try{
            await signInWithEmailAndPassword(auth, email, password)
            alert("usuário logado com sucesso")
            router.push('/')
        }
        catch(error){
            console.log(error + "Erro ao fazer login")
        }
    }


    return(
        <main>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value) } />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value) } />
                <button >Entrar</button>
            </form>
        </main>
    )
}



export default Login