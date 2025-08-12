import { Center, Box  } from "@chakra-ui/react";


function Header () {
    return (
    <Box marginTop={2}>   
        <Center fontSize={50} fontWeight={"bold"}>
            US Presidents
        </Center>
        <Center fontSize={15} >
            Explore data about US Presidents by clicking each tab!
        </Center>
    </Box>
    )
    
}

export default Header
