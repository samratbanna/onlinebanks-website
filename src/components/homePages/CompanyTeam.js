import { Box, Image, Text } from "@chakra-ui/react"
import { MainContainer } from "./MainContainer"
import Carousel from "react-multi-carousel"
import { map } from "lodash"
import { useCategoryStore } from "../../store/category"
import { useEffect } from "react"
import { CustomLeftArrow, CustomRightArrow } from "./BestSeller"

export const CompanyTeam = () => {
    const { teamDetail } = useCategoryStore(s => ({
        teamDetail: s.teamDetail,
    }))

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        largeTablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        }
    };

    return (
        <Box mt={20} py={10} px={{ base: 3, md: 5 }} bg="gray.100" w="100%" display="flex" flexDir="column" alignItems="center">
            <Box w={{ base: "100%", xl: "85%", lg: "85%" }} textAlign="center">
                <Box textAlign='center' w="100%">
                    <Text fontWeight={500} fontSize={{ base: 22, lg: 34, xl: 40 }} mt='20px' mb='10px'>Our Team</Text>
                    <Text fontSize='14px' mb='10px'>Considering desire as primary motivation for the generation of narratives is a useful concept.</Text>
                    <Box h='20px'></Box>
                    <Carousel
                        swipeable={false}
                        draggable={false}
                        responsive={responsive}
                        centerMode={false}
                        infinite={true}
                        autoPlay={true}
                        partialVisbile={false}
                        customRightArrow={<CustomRightArrow direction='right' display={{ base: 'flex', md: 'flex', lg: 'none' }} />}
                        customLeftArrow={<CustomLeftArrow direction='left' display={{ base: 'flex', md: 'flex', lg: 'none' }} />}
                    >
                        {map(teamDetail, (s, index) => {
                            return (
                                <Box key={index} px='15px' role='group' display="flex" flexDir="column" alignItems="center">
                                    <Box borderRadius='50%' pos='relative' transition="all 500ms ease" overflow='hidden' w={{ xl: '265px', lg: "240px", md: "220px", base: "200px" }} h={{ xl: '265px', lg: "240px", md: "220px", base: "200px" }}>
                                        <Image src={s.avatar || '/assets/blank_profile.webp'} w='100%' h='100%' objectFit='cover' alt='Staff' borderRadius='50%' _groupHover={{ transform: 'scale(1.3)' }} transition='all 500ms ease' />
                                        <Box w='100%' h='100%' left={0} top={0} pos='absolute' borderRadius='100%' transform='scale(0.0)' _groupHover={{ transform: 'scale(1.1)', bg: 'rgba(0, 0, 0, 0.5)' }} zIndex={1} transition='all 500ms ease'></Box>
                                    </Box>
                                    <Text mt='20px' mb='5px' fontWeight={700} fontSize='20px'>{s.name}</Text>
                                    <Text fontWeight={400}>{s.designation}</Text>
                                </Box>
                            )
                        }
                        )}
                    </Carousel>
                </Box>
            </Box>
        </Box>
    )
}