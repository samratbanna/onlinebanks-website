import { Box, Text } from "@chakra-ui/react"

export const Expertise = () => {
    return (
        <Box  my={20} px={{base:3, md:5}} w="100%" display="flex" flexDir="column" alignItems="center">
            <Box w={{ base: "100%", xl: "65%", lg:"75%" }}>
                <Text fontWeight="bold" fontSize={{base:22, md:30, lg:34}} textAlign="center">Our Expertise + Our Technology = Happy You</Text>
                <Text mt={"2%"} textAlign="center" color="textColor" fontSize="16px" lineHeight="24px" fontWeight={400}>
                    At Online banks, we integrate our acute understanding of the marketplace with technology, to help you find the best financial products most suited to your needs. Our rich legacy spans over 30 years, 100 cities and thousands of happy customers.
                </Text>
            </Box>
        </Box>
    )
}