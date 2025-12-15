import { Box, Image, Text } from "@chakra-ui/react"
import { MainContainer } from "./MainContainer"
import { CButton } from "../../customLayouts/CButton"

export const Partner = () => {
    return (
        <MainContainer>
            <Box display="flex" alignItems='center' gap={2} flexDir={{ base: "column-reverse", xl: "row", lg: "row", md: "row" }}>
                <Box flex={1} pr={{xl:"80px", md:"50px"}}>
                    <Image src="/assets/partner.png" w="100%" objectFit="contain" alt="Partner"/>
                </Box>
                <Box flex={1} textAlign="start" pl={{xl:"56px", md:"36px"}}>
                    <Text fontWeight={700} fontSize={{base:22, md:30, lg:34}}>Come let&apos;s <br/>partner together.</Text>
                    <Text color="textColor">With over 25000 partners and counting, join us to be a part of India&apos;s largest loan distributor.</Text>
                    <CButton mt={10} size={{xl:"lg", lg:"lg", md:"lg", base:"md"}}>PARTNER WITH US</CButton>
                </Box>
            </Box>
        </MainContainer>
    )
}