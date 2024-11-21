import Image from "next/image"
import { TextField, Avatar } from "@mui/material"

const Navbar = () => {
    return(
        <header className="flex items-center justify-between px-5">
            <Image width={100} height={100} alt="Logo" src={"/"}/>
            <TextField id="outlined-basic" label="Procurar" variant="outlined" />
            <Avatar alt="Avatar" src="/" />
        </header>
    )
}


export default Navbar