import { Button } from "@chakra-ui/react"

export const CButton = (props) => {
    return(
        <Button {...props} color="white" bg="linear-gradient(45deg, #FF512F, #DD2476)" _hover={{ bg: "defaultColor.500" }}/>
    )
}