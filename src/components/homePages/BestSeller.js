import { Box, Button, ButtonGroup, AspectRatio, Center, Image, Text, useDisclosure } from "@chakra-ui/react"
import { MainContainer } from "./MainContainer"
import { map } from "lodash"
import Carousel from "react-multi-carousel"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { useRouter } from "next/navigation"
import { ProductLeadModal } from "../productLead"

export const BestSeller = ({ recommended }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        largeTablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        }
    };
    return (
        <MainContainer>
            <Text fontWeight="bold" fontSize={{ base: 20, md: 30, lg: 34 }} textAlign="center">Our Bestsellers</Text>
            <Text textAlign="center" color="gray.500" mb={8}>Best deals. Quick approvals. That&apos;s the onlinebanks guarantee</Text>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
                centerMode={false}
                ssr={true}
                infinite={true}
                partialVisbile={false}
                autoPlay={true}
                sliderClass='slider'
                customRightArrow={<CustomRightArrow display={'flex'} />}
                customLeftArrow={<CustomLeftArrow display={'flex'} />}
            >
                {map(recommended, r =>
                    <ProductComponent detail={r} key={r._id} />
                )}
            </Carousel>
        </MainContainer>
    )
}



export const CustomRightArrow = ({ onClick, display }) => {
    return (
        <>
            <Center  onClick={onClick} pos='absolute' display={{base:'none', sm:'none', md:`${display}`, xl:`${display}`}} cursor='pointer' right='0px' color='black' borderRadius='50%' bg='gray.50' w='45px' h='45px' zIndex={98}>
                <MdKeyboardArrowRight fontSize='44px' />
            </Center>
        </>
    )
}
export const CustomLeftArrow = ({ onClick, display }) => {
    return (
        <>
            <Center onClick={onClick} pos='absolute' display={{base:'none',sm:'none', md:`${display}`,lg:`${display}`, xl:`${display}`}} cursor='pointer' left='0px' color='black' borderRadius='50%' bg='gray.50' w='45px' h='45px' zIndex={98}>
                <MdKeyboardArrowLeft fontSize='44px' />
            </Center>
        </>
    )
}

export const ProductComponent = ({ detail, key }) => {

    console.log("hello", detail);
    const { isOpen: isOpenProductModal, onClose: onCloseProductModal, onOpen: onOpenProductModal } = useDisclosure()
    const router = useRouter()
    const handleToCompare = (uniqueId) => {
        router.push(`/compare-creditCard/${uniqueId}?id=${detail?.categoryId}`)
    }

    const handleProductLeadModal = () => {
        onOpenProductModal()
    }

    return (
        <Box key={key} mx='auto' role="group" border="1px solid rgba(39, 49, 82, .3)" _hover={{ boxShadow: "0 4px 25px rgb(74 146 255 / 15%)", border: "1px solid white" }} w='85%' borderRadius="24px">
            <Box p="24px" display="flex" flexDir="column" alignItems="center">
                {/* <Box>
                    <Image src={detail.logo} alt="Personal loan" />
                </Box> */}

                <AspectRatio ratio={16 / 9} minW={{ xl: "180px", lg: "160px", md: "120px" }}>
                    <Image  cursor="pointer" borderRadius="md" border="1px solid gray" src={detail.logo} objectFit="fill" alt="app_store" />
                </AspectRatio>
                <Text display='flex' alignItems="center" height={16} color="defaultColor.800" fontWeight={700} fontSize={20}>{detail.name}</Text>
                <Text color="defaultColor.900">From 1 Lakh</Text>

                <Box w='full' display='flex' flexDir={"column"} gap={2} justifyContent='center' mt={6} mb={4} alignItems='center'>
                    <Button w='100%' size={{ xl: "md", lg: "md", md: "sm", base: "sm" }} borderRadius="10px" variant="outline" _groupHover={{ bgGradient: "linear(45deg, buttonGradiant1, buttonGradiant2)", color: "white" }} colorScheme="defaultColor" onClick={handleProductLeadModal}>APPLY NOW</Button>
                    <Button w='100%' px={40} size={{ xl: "md", lg: "md", md: "sm", base: "sm" }} borderRadius="10px" variant="solid" _groupHover={{ variant: "outline" }} colorScheme="blue" onClick={() => handleToCompare(detail.uniqueId)}>Compare</Button>
                </Box>
                <Text color="textColor" mt={{ xl: "3%", lg: "3%", md: "3%", base: "2%" }}>Starting at 8.5% p.a</Text>
            </Box>
            {isOpenProductModal &&
                <ProductLeadModal isOpen={isOpenProductModal} onClose={onCloseProductModal} productId={detail._id} />
            }
        </Box>
    )
}