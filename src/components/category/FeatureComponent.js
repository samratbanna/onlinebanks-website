import { Box, Center, Image, Text } from "@chakra-ui/react"
import { MainContainer } from "../homePages/MainContainer"

export const FeatureComponent = () => {
    return (
        <MainContainer bg="gray.100" my={0}>
            <Box display="flex" w="100%" py={10} alignItems={{ base: "center", md: "space-between", lg: "space-between", xl: "space-between" }} flexDir={{ base: "column", md: "row", lg: "row", xl: "row" }}>
                <Features />
                <Features />
                <Features />
            </Box>
        </MainContainer>
    )
}

const Features = ({image, desc, title}) => {
    return (
        <Box display="flex" w={{ base: "100%", md: "33%", lg: "33%", xl: "33%" }} p={10} flexDir="column" alignItems="center" >
            <Center>
                <Image src="/assets/reward.png" alt="Reward" />
            </Center>
            <Text fontSize={21} fontWeight="bold" mt="5px" mb="20px">Reward Points/Cash Back</Text>
            <Text color="textColor" fontSize={16}>
                Win reward points, direct cashback and air miles with every purchase made on your Credit Card.
            </Text>
        </Box>
    )
}