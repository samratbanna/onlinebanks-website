import { Box, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { filter, find } from "lodash"
import { map } from "lodash"
import { useState, useMemo, useEffect } from "react"
import { useCategoryStore } from "../../../store/category"
import { CompareComponent } from "./CompareComponent"
import { mongoIdToShortId } from "@/components/compareCreditCard/GenerateShortId"
import { CreditCard } from "./CreditCard"

export const CardList = ({ categoryId }) => {
    const { getProductAction, getProductStatus, productDetail, categories } = useCategoryStore(s => ({
        getProductAction: s.getProductAction,
        getProductStatus: s.getProductStatus,
        productDetail: s.productDetail,
        categories: s.categories
    }))
    const [productId, setProductId] = useState([])
    const [productData, setProductData] = useState()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        getProductAction()
    }, [getProductAction])

    useEffect(() => {
        if (productId?.length) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [productId])

    useEffect(() => {
        setProductData(map(productDetail, d => ({ ...d, uniqueId: mongoIdToShortId(d._id) })))
    }, [productDetail])

    const creditCard = useMemo(() => filter(productData, product => product?.categoryId == categoryId), [categoryId, productData])
    const isFindCategory = useMemo(() => find(categories, c => c._id == categoryId), [categoryId, categories])

    const handleClear = () => {
        setIsOpen(false)
        setProductId([])
    }

    const removeProduct = (id) => {
        setProductId(filter(productId, product => product._id != id))
    }
    return (
        <Box>
            {creditCard?.length ?
                <Box py="20" display="flex" flexDir="column" alignItems="center">
                    <Text fontSize={24} mb={4} fontWeight="semibold">{`${isFindCategory?.name} List`}</Text>
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
            }
        </Box>
    )
}