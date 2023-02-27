import { Heading, Text, Box, Input, IconButton } from '@chakra-ui/react'
 
export function Home(){

    const boxStyles = {
        p: "10px",
        bg: "#f0f1f2",
        m: "10px",
        color: "black",
        textAlign: "center",
        filter: 'blur(2px)',
        ':hover': {
            color: "white",
            bg: "purple.400"
        }
    }

    return (
        <div>
            <Heading> AI Generator </Heading>
            <Text m={20}> Lorem ipsum</Text>
            <Box sx={boxStyles}>
                Placeholder lorem ipsum
            </Box>
            <Input placeholder='Search here.....'></Input> <IconButton icon="{<Mic/>}"></IconButton>
        </div>
    )
}