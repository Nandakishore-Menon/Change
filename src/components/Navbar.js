// 0 for home, 1 form to start petition, 2 view petitions by user, 3 profile info
import { Avatar, Button, Center, Flex, Stack } from '@chakra-ui/react'

function Navbar(props){
    return (
        <Flex flex='1' style={{height:60, backgroundColor:'lightcyan'}}>
            {/* Insert LOGO */}
            <Center flex='1'>
                <Stack direction='row' spacing={10} >
                        <Button colorScheme='teal' variant='ghost' onClick={() => props.onClickFunction(0) }>
                            Home
                        </Button>
                        <Button colorScheme='teal' variant='ghost' onClick={() => props.onClickFunction(1) }>
                            Start Petition
                        </Button>
                        <Button colorScheme='teal' variant='ghost' onClick={() => props.onClickFunction(2) }>
                            My Petitions
                        </Button>
                </Stack>
            </Center>
            <Center>
                <Button colorScheme='teal' variant='ghost' onClick={() => props.onClickFunction(3) }>
                        <Avatar size='sm' ></Avatar>
                </Button>
            </Center>
        </Flex>
    );
}

export default Navbar;