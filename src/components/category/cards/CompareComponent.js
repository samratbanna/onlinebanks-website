import { AspectRatio, Box, Button, ButtonGroup, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, HStack, Image, Text, useBreakpointValue } from "@chakra-ui/react"
import { map, slice } from "lodash"
import { useRouter, useSearchParams } from "next/navigation"
import { CgClose } from "react-icons/cg"

export const CompareComponent = ({ productId, creditCard, handleClear, removeProduct }) => {
    const params = useSearchParams()
    const categoryId = params.get("id")
    const sliceEnd = useBreakpointValue({base:2, md:2, lg:3, xl:3})
    const router = useRouter()

    const handleRedirect = () => {
        const uniqueIds = productId.map(item => item.uniqueId);
        router.push(`/compare-creditCard/${uniqueIds.join("/")}?id=${categoryId}`)
    }
    return (
        <Box
            pos="fixed"
            bottom={0}
            h={{xl:"180px", lg:"180px", md:"170px", base:"100px"}}
            minH={{xl:"180px", lg:"180px", md:"170px", base:"100px"}}
            w="full"
            bg="white"
            zIndex={99}
            boxShadow="0 -10px 24px 0 #0000001a"
            display="flex" flexDir="column" alignItems="center" justifyContent="center"
        >
            <Box >
                <HStack spacing={{base:2, xl:8, lg:8, md:6}}>
                    <HStack spacing={{base:1, xl:4, md:3, lg:3}} align="start">
                        {map(slice(productId, 0, sliceEnd), product =>
                            <Box key={product._id} pos="relative">
                                <Center w={6} h={6} bg="gray.100" cursor="pointer" onClick={() => removeProduct(product._id)} zIndex={1} pos="absolute" top={-2} right={-2} borderRadius={100}><CgClose /></Center>
                                <AspectRatio ratio={9 / 5} minW={{ xl: "140px", lg: "140px", md: "110px", base: "70px" }}>
                                    <Image border="1px solid" borderRadius="md" borderColor="gray.100" src={product?.logo || "/assets/card.png"} w="240px" alt="Credit Card" objectFit="contain" />
                                </AspectRatio>
                                <Text display={{lg:"block", base:"none", xl:"block", md:"block"}} textAlign="center" fontSize={12} fontWeight="semibold">{product.name}</Text>
                            </Box>
                        )}
                    </HStack>
                    <ButtonGroup>
                        <Button size={{xl:"md", lg:"md", md:"sm", base:"sm"}} colorScheme="green" isDisabled={productId?.length <= 1} onClick={handleRedirect}>Compare</Button>
                        <Button size={{xl:"md", lg:"md", md:"sm", base:"sm"}} onClick={handleClear}>Clear</Button>
                    </ButtonGroup>
                </HStack>
            </Box>
        </Box>
    )
}