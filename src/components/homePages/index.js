import { AspectRatio, Box, Card, CardBody, Center, Flex, Image, Text, VStack, Wrap } from "@chakra-ui/react"
import { filter, map } from "lodash"
import { useEffect, useMemo, useRef, useState } from "react"
import { CButton } from "@/customLayouts/CButton"
import { LimitedOffer } from "./LimitedOffer"
import { useCategoryStore } from "@/store/category"
import { Expertise } from "./Expertise"
import { MiddleSection } from "./MiddleSection"
import { BestSeller } from "./BestSeller"
import { AssociatedInstitute } from "./AssociatedInstitute"
import { Testimonial } from "./Testimonial"
import { Partner } from "./Partner"
import { mongoIdToShortId } from "../compareCreditCard/GenerateShortId"
import { MobilePortion } from "./MobilePortion"
import { CompanyTeam } from "./CompanyTeam"
import { useRouter } from "next/navigation"
import Carousel from "react-multi-carousel"

export const HomePage = () => {
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

    const [categoryHeight, setCategoryHeight] = useState()
    const { categories, productDetail, getProductAction, getTeamAction, teamDetail } = useCategoryStore(s => ({
        categories: s.categories,
        productDetail: s.productDetail,
        getProductAction: s.getProductAction,
        getTeamAction: s.getTeamAction,
        teamDetail: s.teamDetail,
    }))

    const router = useRouter()

    const [productData, setProductData] = useState()

    useEffect(() => {
        getProductAction()
        getTeamAction()
    }, [getProductAction, getTeamAction])

    useEffect(() => {
        setProductData(map(productDetail, p => {
            const uniqueId = mongoIdToShortId(p._id)
            return ({ ...p, uniqueId })
        }
        ))
    }, [productDetail])

    const handleRedirect = () => {
        router.push("/chooseProduct")
    }
    const recommended = useMemo(() => filter(map(productData, d => ({ ...d, isReccommended: true })), p => p.isReccommended), [productData])
    return (
        <Box gap='20px' pb={3} bg="white">

            <Flex
                bg='red.50'
                flexDir={{ xl: "row", lg: "row", md: "column", base: "column" }}
                zIndex={100}
                backgroundImage="url('/assets/hero.jpeg')"
                backgroundPosition="top"
                backgroundSize='cover'
                backgroundRepeat="no-repeat"
                alignItems='center'
                justifyContent='center'
                p='8' h={{ xl: "70vh", lg: "60vh", md: "60vh", sm: "60vh", base: "510px" }}>
                <Box textAlign={{ xl: "left", md: "center", base: 'center' }} py={6}>
                    <Text fontWeight="semibold" lineHeight={{ base: 1.3 }} fontSize={{ base: 30, lg: 40 }}>We call ourself onlinebanks</Text>
                    <Text mt={{ base: 4, md: 12, lg: 14 }} fontWeight="semibold" fontSize={{ base: 16, lg: 20 }}>Our competitors call us India&apos;s Largest credit card Distributor.</Text>
                    <CButton size={{ base: "md", lg: "lg" }} mt={{ base: 4, md: 12, lg: 14 }} onClick={handleRedirect}>Apply Now</CButton>
                </Box>

                <Box pr={{ base: "40px" }} py={4} >

                    <AspectRatio ratio={16 / 10} minW={{ base: "300px", sm: "400px", md: "600px", lg: "550px", xl: "400px" }}>
                        <Image w='100%' src='/assets/herocard.png' alt='banks' objectFit="contain" />
                    </AspectRatio>
                </Box>
            </Flex>

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
                arrows={false}

            >
                {map(categories, catg =>
                    <CategoryCard key={catg?._id} title={catg?.name} setCategoryHeight={setCategoryHeight} />
                )}
            </Carousel>

            <LimitedOffer />
            <Expertise />
            <MiddleSection />
            {recommended?.length ?
                <BestSeller recommended={recommended} />
                :
                null
            }
            <AssociatedInstitute />
            <MobilePortion />
            <Testimonial />
            <Partner />
            {teamDetail?.length ?
                <CompanyTeam />
                :
                null
            }
            {/* </Center> */}
        </Box>
    )
}

const CategoryCard = ({ title, setCategoryHeight }) => {
    const categoryRef = useRef(null)

    useEffect(() => {
        if (categoryRef.current) {
            setCategoryHeight(categoryRef.current.clientHeight)
        }
    }, [setCategoryHeight])

    return (
        <Card ref={categoryRef} cursor="pointer" h="100px" justify="center" bg="white" w="100%" p={4} variant='elevated' mx='2px'>
            <CardBody textAlign='center'>
                <Text>{title}</Text>
            </CardBody>
        </Card>
    )
}