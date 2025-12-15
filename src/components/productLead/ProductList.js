import { Box, Card, CardBody, HStack, Text, useDisclosure } from "@chakra-ui/react"
import { useCategoryStore } from "../../store/category"
import { useEffect, useMemo, useState } from "react"
import { filter, map } from "lodash"
import { ProductLeadModal } from "./index"
import { LoadingContainer } from "../../common/LoadingContainer"
import { STATUS } from "@/constants"
import { useSearchParams } from "next/navigation"

export const ProductList = () => {
    const { isOpen: isOpenProductModal, onClose: onCloseProductModal, onOpen: onOpenProductModal } = useDisclosure()
    const { getProductAction, productDetail, getProductStatus } = useCategoryStore(s => ({
        getProductAction: s.getProductAction,
        getProductStatus: s.getProductStatus,
        productDetail: s.productDetail
    }))

    const params = useSearchParams()
    const categoryId = params.get("id")

    const [productId, setProductId] = useState()

    useEffect(() => {
        getProductAction()
    }, [getProductAction])

    const handleProduct = (id) => {
        onOpenProductModal()
        setProductId(id)
    }

    const productData = useMemo(() => categoryId ? filter(productDetail, product => product.categoryId == categoryId) : productDetail, [productDetail, categoryId])
 
    return (
        <Box bg="white" pl={{ base: 3, md: 8, lg: 16 }} py={10} minH="70vh">
            <Text mb={3} fontWeight="semibold" fontSize={24}>Let&apos; choose product</Text>
            <LoadingContainer loading={getProductStatus == STATUS.FETCHING}>
                <HStack wrap="wrap">
                    {map(productData, product =>
                        <Card transition="500ms" border="1px solid" _hover={{ transform:"scale(1.1)"}} borderColor="defaultColor.400" borderRadius="md" onClick={() => handleProduct(product._id)} bg="defaultColor.50" cursor="pointer" key={product._id} p={2} m={2}>
                            <CardBody>
                                <Text>{product.name}</Text>
                            </CardBody>
                        </Card>
                    )}
                </HStack>
            </LoadingContainer>
            {isOpenProductModal &&
                <ProductLeadModal isOpen={isOpenProductModal} onClose={onCloseProductModal} productId={productId} />
            }
        </Box>
    )
} 