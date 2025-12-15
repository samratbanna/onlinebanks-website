import { Box } from "@chakra-ui/react"

export const MainContainer = (props) => {
    const {children, bg="white", my=20} = props || {};
    return(
        <Box  my={my} {...props} px={{ base: 3, md: 5 }} w="100%" display="flex" flexDir="column" alignItems="center">
            <Box w={{ base: "100%", xl: "85%", lg: "85%" }} textAlign="center">
                {children}
            </Box>
        </Box>
    )
}