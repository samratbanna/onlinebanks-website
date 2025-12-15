import { Box, Center, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { MainContainer } from "./MainContainer"
import { FaQuoteLeft } from "react-icons/fa"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import Carousel from "react-multi-carousel"
import 'react-multi-carousel/lib/styles.css';

export const Testimonial = () => {
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
        <MainContainer bg="gray.50" py={20}>
            <Text fontWeight="bold" fontSize={{ base: 22, md: 30, lg: 34 }} textAlign="center">Highest Standards. Happiest Customers.</Text>
            <Text color="textColor" lineHeight="43px">Our customers are our strength.</Text>
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
                customRightArrow={<CustomRightArrow display={'flex'} />}
                customLeftArrow={<CustomLeftArrow display={'flex'} />}
            >
                <TestimonialComponent />
                <TestimonialComponent />
                <TestimonialComponent />
                <TestimonialComponent />
            </Carousel>
        </MainContainer>
    )
}

export const CustomRightArrow = ({onClick, display }) => {
    return (
        <>
            <Center onClick={onClick} pos='absolute' display={display} cursor='pointer' right='-3%' color='black' borderRadius='50%' bg='gray.50' w='45px' h='45px' mr={{xl:'40px', lg:"10px", md:"40px", base:"8px"}} ml='32px' zIndex={98}>
                <MdKeyboardArrowRight fontSize='44px' />
            </Center>
        </>
    )
}
export const CustomLeftArrow = ({ onClick, display }) => {
    return (
        <>
            <Center onClick={onClick} pos='absolute' display={display} cursor='pointer' left='-4%' color='black' borderRadius='50%' bg='gray.50' w='45px' h='45px' mr='40px' ml={{xl:'30px', lg:"20px", md:"30px", base:"14px"}} zIndex={98}>
                <MdKeyboardArrowLeft fontSize='44px' />
            </Center>
        </>
    )
}

const TestimonialComponent = () => {
    return (
        <Box display="flex" w={{xl:"85%", lg:"100%", md:"90%", base:"95%"}} flexDir="column" alignItems="center">
            <Center bg="white" w="87px" h="87px" borderRadius={100}>
                <Image src="/assets/testimonial.png" objectFit="contain" />
            </Center>
            <VStack spacing={1} mt={3}>
                <Text fontWeight="bold" fontSize={16}>Rohan Mehra</Text>
                <Text color="textColor">Personal Loan Customer</Text>
            </VStack>
            <Center w="100%" pb={"30px"} px="17px" pt="5px" color="linear-gradient(45deg, buttonGradiant1, buttonGradiant2)">
                <FaQuoteLeft />
            </Center>
            <Box px="17px">
                <Text color="gray.600" lineHeight="24px" fontSize={15}>
                    I took a loan to finally go on my dream vacation to Europe. It was processed quickly and the availability of flexible repayment options made the entire process hassle free.
                </Text>
            </Box>
        </Box>
    )
}