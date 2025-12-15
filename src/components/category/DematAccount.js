import { CButton } from "@/customLayouts/CButton"
import { Box, Text } from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation"
import { FeatureComponent } from "./FeatureComponent"
import { RedirectComponent } from "./RedirectComponent"
import { CardList } from "./cards/CardList"

export const DematAccount = () => {

    const params = useSearchParams()
    const categoryType = params.get("type")
    const categoryId = params.get("id")
    const router = useRouter()
    
    const handleToRedirect = () => {
        router.push(`/chooseProduct?id=${categoryId}`)
    }
    return (
        <Box>
            <Box minH="70vh" bg="secondary" pl={{ base: 3, md: 8, lg: 16 }} pt={3}>
                <RedirectComponent />
                <Box display="flex" flexDir={{ base: "column", md: "row", lg: "row", xl: "row" }} my={{ base: 8, md: 6, lg: 10, xl: 12 }}>
                    <Box textAlign="start" flex={1}>
                        <Text fontWeight="bold" fontSize={{ base: "22px", md: "36px", lg: "40px", xl: "45px" }} lineHeight={1.4} color="white">
                            It pays to pay with <br />a <span style={{ fontWeight: "bold" }}>Credit Card</span>. Literally.
                        </Text>
                        <Text color="white" fontSize={{ xl: 24, md: 20, lg: 22, base: 20 }}>Best offers on Credit Cards, only on onlinebanks.com</Text>
                        <CButton onClick={handleToRedirect} size={{ base: "md", md: "md", xl: "lg", lg: "lg" }} mb={15} mt={{ xl: 8, lg: 6, md: 6, base: 8 }}>
                            APPLY NOW
                        </CButton>
                    </Box>
                    <Box flex={1}>

                    </Box>
                </Box>
            </Box>
            <FeatureComponent />
            <CardList categoryId={categoryId} />
        </Box>
    )
}