import { AspectRatio, Box, Button, Checkbox, useBreakpointValue, Divider, Flex, FormControl, HStack, Image, Text, useDisclosure } from "@chakra-ui/react"
import { wordBreakCss } from "../../../theme"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import { useMemo, useState } from "react"
import { filter, find, map } from "lodash"
import { CButton } from "@/customLayouts/CButton"
import { ProductLeadModal } from "../../productLead"

export const CreditCard = ({ key, detail, setProductId, productId }) => {
    const { isOpen: isOpenProductModal, onClose: onCloseProductModal, onOpen: onOpenProductModal } = useDisclosure()

    const { name, description, logo, productFeature, url } = detail || {}
    const [isToggle, setIsToggle] = useState(false)
    const maxCard = useBreakpointValue({ base: 2, md: 2, lg: 3, xl: 3 })

    const handleProduct = (cardId, isCheck) => {
        if (isCheck && productId?.length < maxCard) {
            setProductId(pre => [...pre, { _id: cardId, logo: detail?.logo, name: detail?.name, uniqueId: detail?.uniqueId }])
        } else {
            setProductId(filter(productId, product => product._id !== cardId))
        }
    }

    const selectedProduct = useMemo(() => find(productId, product => product?._id == detail?._id) ? true : false, [detail, productId])

    const handleProductLeadModal = () => {
        onOpenProductModal()
    }

    return (
        <Box w="100%" key={key} bg="white" borderRadius="lg" py="30px" _hover={{ boxShadow: "md" }}>
            <Box px={"20px"} w="100%" pb="16px" display="flex" flexDir={{ xl: "row", lg: "row", md: "row", base: "column" }} justifyContent="space-between">
                <HStack align="start" w={{ xl: "70%", lg: "70%", md: "70%", base: "100%" }} spacing={{ xl: 8, lg: 8, md: 6, base: 3 }}>
                    <AspectRatio ratio={9 / 5} minW={{ xl: "240px", lg: "240px", md: "230px", base: "120px" }}>
                        <Image border="1px solid" borderRadius="md" borderColor="gray.100" src={logo || "/assets/card.png"} w="240px" alt="Credit Card" objectFit="contain" />
                    </AspectRatio>
                    <Box>
                        <Text fontWeight={700} fontSize={{ xl: 18, lg: 18, md: 16, base: 14 }} pb={{ xl: "18px", lg: "18px", md: "16px", base: "3px" }}>{name}</Text>
                        <Text w="100%" pb="24px" fontSize={14} color="gray.500" {...wordBreakCss}>{description}</Text>
                    </Box>
                </HStack>
                <CButton onClick={handleProductLeadModal}>Apply</CButton>
            </Box>
            <Divider />
            <Flex pt={"16px"} px="20px" justify="space-between" align="center">
                <FormControl>
                    <Checkbox colorScheme="defaultColor" isChecked={selectedProduct} onChange={(e) => handleProduct(detail?._id, e.target.checked)} fontSize={{ xl: "14px", lg: "14px", md: "14px", base: '12px' }}>
                        Add to compare
                    </Checkbox>
                </FormControl>
                <Button size={{ xl: "md", lg: "md", md: "md", base: "sm" }} rightIcon={isToggle ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />} variant="flushed" onClick={() => setIsToggle(!isToggle)}>{`View ${isToggle ? "Less" : "More"}`}</Button>
            </Flex>
            {(productFeature?.length && isToggle) ?
                <Box px="20px" mt={"16px"}>
                    <Text pb={3} fontWeight="bold" fontSize={18}>Features</Text>
                    {map(productFeature, feature =>
                        <Box key={feature._id} pb="8px">
                            <HStack align="center">
                                <Box w={1.5} h={1.5} bg="gray.300" borderRadius={100}></Box>
                                <Text fontSize={{ xl: 16, lg: 16, md: 16, base: 14 }}>{feature?.feature}</Text>
                            </HStack>
                        </Box>
                    )}
                </Box>
                :
                null
            }
            {isOpenProductModal &&
                <ProductLeadModal isOpen={isOpenProductModal} onClose={onCloseProductModal} productId={detail._id} />
            }
        </Box>
    )
}