"use client"
import { useState } from "react"
import {auth} from "../../lib/firebaseConfig"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useRouter } from "next/navigation"



const Register = () => {

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            await updateProfile(user, {
                displayName : username
            })

            console.log("Usuário registrado com sucesso!")
            router.push('/')
        }
        catch (error){
            console.log(error)
            alert('Erro ao registrar o usuário')

        }
    } 


    return(
        <main>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="User" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button>Registrar</button>
            </form>
        </main>
    )
}


export default Register