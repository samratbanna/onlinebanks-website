import { CButton } from "@/customLayouts/CButton"
import { Box, Center, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation"
import { FeatureComponent } from "../FeatureComponent"
import { RedirectComponent } from "../RedirectComponent"
import { CreditCard } from "./CreditCard"
import { filter, map, uniqueId } from "lodash"
import { useEffect, useMemo, useState } from "react"
import { useCategoryStore } from "@/store/category"
import { CompareComponent } from "./CompareComponent"
import { mongoIdToShortId } from "@/components/compareCreditCard/GenerateShortId"
import { CardList } from "./CardList"

export const CreditCardComponent = () => {
    // const { getProductAction, getProductStatus, productDetail } = useCategoryStore(s => ({
    //     getProductAction: s.getProductAction,
    //     getProductStatus: s.getProductStatus,
    //     productDetail: s.productDetail
    // }))

    const params = useSearchParams()
    const categoryType = params.get("type")
    const categoryId = params.get("id")

    // const [productId, setProductId] = useState([])
    // const [productData, setProductData] = useState()
    // const [isOpen, setIsOpen] = useState(false)

    // useEffect(() => {
    //     getProductAction()
    // }, [getProductAction])

    // useEffect(() => {
    //     if (productId?.length) {
    //         setIsOpen(true)
    //     } else {
    //         setIsOpen(false)
    //     }
    // }, [productId])

    // useEffect(() => {
    //     setProductData(map(productDetail, d => ({ ...d, uniqueId: mongoIdToShortId(d._id) })))
    // }, [productDetail])

    // const creditCard = useMemo(() => filter(productData, product => product?.categoryId == categoryId), [categoryId, productData])

    // const handleClear = () => {
    //     setIsOpen(false)
    //     setProductId([])
    // }

    // const removeProduct = (id) => {
    //     setProductId(filter(productId, product => product._id != id))
    // }

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
            {/* {creditCard?.length ?
                <Box py="20" display="flex" flexDir="column" alignItems="center">
                    <Text fontSize={24} mb={4} fontWeight="semibold">Credit Card List</Text>
                    <VStack spacing={3} w={{ xl: "70%", lg: "75%", md: "90%", base: "90%" }}>
                        {map(creditCard, card =>
                            <CreditCard key={card._id} detail={card} setProductId={setProductId} productId={productId} />
                        )}
                    </VStack>
                </Box>
                :
                null
            }
            {isOpen &&
                <CompareComponent productId={productId} creditCard={creditCard} handleClear={handleClear} removeProduct={removeProduct} />
            } */}
        </Box>
    )
}