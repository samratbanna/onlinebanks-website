import { AspectRatio, Box, Center, Flex, HStack, Image, Text } from "@chakra-ui/react"
import { MainContainer } from "./MainContainer"
import { TiTick } from "react-icons/ti"
import { useCategoryStore } from "@/store/category"
import { useEffect } from "react"

export const MobilePortion = () => {
    const { getAppVersionAction, getAppVersionStatus, appDetail } = useCategoryStore(s => ({
        getAppVersionAction: s.getAppVersionAction,
        getAppVersionStatus: s.getAppVersionStatus,
        appDetail: s.appDetail,
    }))

    useEffect(() => {
        getAppVersionAction()
    }, [getAppVersionAction])

    const { androidAppLink, iosAppLink } = appDetail || {}

    return (
        <MainContainer>
            <Box display="flex" flexDir={{ xl: "row", lg: "row", md: "row", base: "column" }} justifyContent="space-between" w="100%">
                <Box>
                    <Text textAlign="start" fontWeight="bold" lineHeight={{ base: 1.3 }} fontSize={{ base: 22, lg: 34, xl: 40 }}>
                        Download the <span style={{ textDecoration: "underline", color: "#ff7477" }}>Onlinebanks</span> <br /> mobile application
                    </Text>
                    <Box mt={{ xl: 16, lg: 12, md: 8, base: 4 }}>
                        <DetailComponent>Enjoy a seemless experience.</DetailComponent>
                        <DetailComponent>Get exclusive Loans and Credit Cards offers.</DetailComponent>
                        <DetailComponent>Track your credit score anytime anywhere.</DetailComponent>
                    </Box>

                    <HStack spacing={8} mt={{ xl: 16, lg: 12, md: 12 }}>
                        <a target="_blank" href={iosAppLink}>
                            <AspectRatio ratio={16 / 5} minW={{ xl: "240px", lg: "220px", md: "180px" }}>
                                <Image cursor="pointer" borderRadius="md" border="1px solid gray" src="/assets/app_store.png" objectFit="contain" alt="app_store" />
                            </AspectRatio>
                        </a>
                        <a target="_blank" href={androidAppLink}>
                            <AspectRatio ratio={16 / 5} minW={{ xl: "240px", lg: "220px", md: "180px" }}>
                                <Image cursor="pointer" borderRadius="md" border="1px solid gray" src="/assets/google_play.png" objectFit="contain" alt="google_play_store" />
                            </AspectRatio>
                        </a>
                    </HStack>
                </Box>
                <Center pr={10}>
                    <Image src="/assets/mobile.png" mt={{xl:-3, base: 4 }} objectFit="contain" w={{ xl: "230px", lg: "200px", md: "170px", base: "160px" }} alt="mobile"/>
                </Center>
            </Box>
        </MainContainer>
    )
}

const DetailComponent = ({ children }) => {
    return (
        <HStack align="center" pt={2} pb={{ xl: "20px", lg: "20px", md: "20px", base: "8px" }} spacing={2}>
            <Center w={5} h={5} borderRadius={100} bg="defaultColor.500" color="white"><TiTick /></Center>
            <Text fontSize={{ xl: 20, lg: 20, md: 16 }} textAlign="start">{children}</Text>
        </HStack>
    )
}