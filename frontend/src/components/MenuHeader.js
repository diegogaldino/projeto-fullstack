import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { AiOutlineHome, AiOutlineLogin, AiOutlineLogout, AiOutlineMenu, AiOutlineMessage, AiOutlineUser } from "react-icons/ai"
import { FiMoon, FiSun } from "react-icons/fi"
import { ImEnter } from "react-icons/im"
import { goTo } from "../routes/Coordinator"

export const MenuHeader = (props) =>{
    
    return(
        <Menu >
        <MenuButton
            as={IconButton}
            p={2}
            icon={<AiOutlineMenu />}
            variant="outline"
            display={props.isLargerThan ? "none" : "initial"}
        />
        <MenuList>
            {props.user!==null?<MenuItem icon={<AiOutlineUser />} >Welcome {props.user!==null&&props.user["username"]}</MenuItem>:false}
            {!localStorage.getItem("token") ?<MenuItem icon={<AiOutlineHome />} onClick={() => { goTo(props.history, "/", "") }}>Home</MenuItem>:false}
            
            {localStorage.getItem("token") ?
                <MenuItem icon={<AiOutlineMessage/>} onClick={() => { goTo(props.history, "/posts", "") }}>Posts</MenuItem>
                :
                <MenuItem icon={<AiOutlineLogin/>} onClick={() => { goTo(props.history, "/login", "") }}>Sign in</MenuItem>
            }

            {localStorage.getItem("token") ?
                <MenuItem
                    icon={<AiOutlineLogout/>}
                    onClick={() => {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                    goTo(props.history, "/", "")
                    window.location.reload()
                }}>Log Out</MenuItem>
                :
                <MenuItem icon={<ImEnter/>} onClick={() => { goTo(props.history, "/signup", "") }}>Sign Up</MenuItem>
            }
            <MenuItem icon={props.colorMode === 'light' ?<FiMoon/>:<FiSun/>} onClick={props.toggleColorMode}  variant="outline">
                {props.colorMode === 'light' ? "Dark mode" : "Light mode"}
            </MenuItem>
        </MenuList>
    </Menu>
    )
}