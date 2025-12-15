import { useCategoryStore } from "@/store/category"
import { wordBreakCss } from "@/theme"
import { AspectRatio, Slide, Box, Center, Flex, HStack, Image, Select, Table, Tbody, Td, Text, Tr, useBreakpointValue, useDisclosure, Show, Hide } from "@chakra-ui/react"
import { filter, find, map } from "lodash"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { MdClose, MdOutlineAdd } from "react-icons/md"
import { mongoIdToShortId } from "./GenerateShortId"
import { CButton } from "@/customLayouts/CButton"

export const CompareCreditCard = () => {
    const { getProductAction, getProductStatus, productDetail } = useCategoryStore(s => ({
        getProductAction: s.getProductAction,
        getProductStatus: s.getProductStatus,
        productDetail: s.productDetail
    }))

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const categoryId = searchParams.get("id")
    const [productId, setProductId] = useState([])
    const [productData, setProductData] = useState()
    const [ids, setIds] = useState()
    const [visible, setIsVisible] = useState()
    const { isOpen, onToggle } = useDisclosure()

    useEffect(() => {
        getProductAction()
    }, [getProductAction])
    const breakpoint = useBreakpointValue({ base: 'base', md: 'md', lg: 'lg', xl: 'xl' });

    const paramsProductIds = useMemo(() => {
        const pathSegments = pathname.split('/').filter(segment => segment);
        const idSegments = (breakpoint == "md" || breakpoint == "base") ? pathSegments.slice(1, 3) : pathSegments.slice(1);
        return idSegments;
    }, [pathname, breakpoint])

    useEffect(() => {
        setIds(paramsProductIds.length > 0 ? paramsProductIds : ["none"]);
    }, [pathname, paramsProductIds]);

    useEffect(() => {
        setProductData(map(productDetail, p => {
            const uniqueId = mongoIdToShortId(p._id)
            return ({ ...p, uniqueId })
        }
        ))
    }, [productDetail])

    useEffect(() => {
        const product = filter(productData, p => paramsProductIds.includes(p.uniqueId))
        setProductId(product)
    }, [paramsProductIds, productData])


    useEffect(() => {
        const handleScroll = () => {

            if (window.scrollY > 100) {
                onToggle()
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const products = useMemo(() => filter(productData, product => product?.categoryId == categoryId), [categoryId, productData])
    const filterProduct = useMemo(() => productId?.length ? filter(products, product => !find(productId, p => p._id == product._id)) : products, [productId, products])
    const width = useMemo(() => {
        if ((breakpoint == "md" || breakpoint == "base") && productId.length >= 2) {
            return 100;
        } else {
            return 25 + productId?.length * 25
        }
    }, [breakpoint, productId]);
    const rowWidth = useMemo(() => (breakpoint == "md" || breakpoint == "base") ? (100 / (productId?.length || 0)) : (100 / ((productId?.length || 0) + 1)), [breakpoint, productId])
    const isCheck = useMemo(() => ((breakpoint == "xl" || breakpoint == "lg") && productId?.length < 3) || ((breakpoint == "md" || breakpoint == "base") && productId?.length < 2) ? true : false, [productId, breakpoint])
    return (
        <Box pb={3} bg="gray.100">
            {
                visible &&
                <Slide direction="top" in={visible} style={{ zIndex: 10 }}>
                    <Flex bg="white" justifyContent="center" alignItems="center" pos="fixed" w="100%" top="70px" h={150} gap={4} pl={{ base: 0, md: 0, lg: 16 }} pr={{ xl: 3, lg: 3, md: 0, base: 0 }}>
                        <Hide below="md">
                            <Box w="100%"></Box>
                        </Hide>

                        {map(productId, p =>
                            <SelectedProductSticky key={p._id} product={p} ids={ids} />
                        )}

                        {isCheck && <Box w="100%"></Box>}
                    </Flex>

                </Slide>

            }
            <Box pl={{ base: 0, md: 0, lg: 16 }} pr={{ xl: 3, lg: 3, md: 0, base: 0 }} pt={{ base: 4, md: 8, lg: 10 }}>
                <Text fontWeight="bold" px={{ base: 2, md: 5 }} fontSize={{ xl: 22, lg: 22, md: 20, base: 16 }}>{productId?.length ? map(productId, p => p.name).join(" vs ") : "Credit Card Compare"}</Text>
                <Flex w="100%" borderRadius="md" align="start">
                    <Box w={{ xl: "25%", lg: "25%", md: "33%", base: "100%" }} display={{ xl: "block", lg: "block", md: "none", base: "none" }}><CardDetail products={filterProduct} /></Box>
                    {map(productId, p =>
                        <SelectedProduct key={p._id} product={p} ids={ids} />
                    )}
                    {isCheck ?
                        <Box w={{ xl: "25%", lg: "25%", md: "33%", base: "100%" }}>
                            <SelectCreditCardComponent products={filterProduct} ids={ids} />
                        </Box>
                        :
                        null
                    }
                </Flex>
                <Box w="full" bg="white">
                    <Table w={width + "%"} css={{ "td": { border: "1px solid", borderColor: "#CBD5E0" } }}>
                        <Tbody>
                            {map(PRODUCT_FEATURE, detail => {
                                const key = detail.id
                                return (
                                    <Tr key={key} w="100%" >
                                        {breakpoint == "xl" || breakpoint == "lg" ?
                                            <Td w={rowWidth + "%"} verticalAlign="top" fontWeight="bold">{detail.title}</Td>
                                            :
                                            null
                                        }
                                        {productId?.length ?
                                            map(productId, product => {
                                                const { productCriteria, rulesToFollow, description, productFeature, eligibilityCriteria, documentRequired } = product || {}
                                                return (
                                                    <Td verticalAlign="top" w={rowWidth + "%"} px={{ xl: "24px", lg: "24px", md: "24px", base: "6px" }} key={product._id}>
                                                        <Text fontSize={14} display={{ xl: "none", lg: "none", md: "block", base: "block" }} fontWeight="semibold">{detail.title}</Text>
                                                        <Text w="100%" fontSize={{ xl: 15, lg: 15, md: 15, base: 14 }} {...wordBreakCss}>
                                                            {key == "cibilScore" ? productCriteria?.cibilScore :
                                                                key == "minSalary" ? productCriteria?.minSalary :
                                                                    key == "description" ? description : null
                                                            }
                                                        </Text>
                                                        {key == "productFeature" ?
                                                            map(productFeature, p =>
                                                                <DetailComponent key={p._id}>{p.feature}</DetailComponent>
                                                            )
                                                            :
                                                            key == "eligibilityCriteria" ?
                                                                map(eligibilityCriteria, p =>
                                                                    <DetailComponent key={p._id}>{p.criteriaValue}</DetailComponent>
                                                                )
                                                                :
                                                                key == "documentRequired" ?
                                                                    map(documentRequired, p =>
                                                                        <DetailComponent key={p._id}>{p.document}</DetailComponent>
                                                                    )
                                                                    :

                                                                    key == "rulesToFollow" ?
                                                                        map(rulesToFollow, p =>
                                                                            <DetailComponent key={p._id}>{p.rule}</DetailComponent>
                                                                        )
                                                                        :
                                                                        null
                                                        }
                                                    </Td>
                                                )
                                            })
                                            :
                                            null
                                        }
                                    </Tr>
                                )
                            }
                            )}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </Box >
    )
}
const DetailComponent = ({ children }) => {
    return (
        <HStack align="start" spacing={1} mb={2}>
            <Box w={{ xl: 1.5, lg: 1.5, md: 1.5, base: 1 }} h={{ xl: 1.5, lg: 1.5, md: 1.5, base: 1 }} mt={2} borderRadius={100} bg="gray.400"></Box>
            <Text w="100%" fontSize={{ xl: 15, lg: 15, md: 15, base: 14 }}  {...wordBreakCss}>{children}</Text>
        </HStack>
    )
}

const SelectCreditCardComponent = ({ products, ids }) => {


    const router = useRouter()
    const params = useSearchParams()
    const categoryId = params.get("id")

    const handleProduct = (id) => {
        const isFind = find(products, p => p._id == id)
        const newIds = [...ids, isFind?.uniqueId]
        router.push(`/compare-creditCard/${newIds.join('/')}?id=${categoryId}`)
    }

    return (
        <Box bg="white" minH="65vh" pt="40px" px="24px" display="flex" flexDir="column" alignItems="center" justifyContent="center">
            <Box bg="gray.50" w="100%" py="30px" display="flex" flexDir="column" alignItems="center" borderRadius="md" border="3px dashed" borderColor="gray.300">
                <MdOutlineAdd fontSize={40} />
                <Select bg="white" onChange={(e) => handleProduct(e.target.value)} py="1px" placeholder="Select new Credit card" w="60%">
                    {map(products, product =>
                        <option key={product._id} value={product._id}>{product.name}</option>
                    )}
                </Select>
            </Box>
            <Text textAlign="center" fontSize={{ xl: 20, lg: 18, md: 16, base: 16 }} mt={{ xl: "34px", lg: "30px", md: "10px", base: "10px" }} w="100%" {...wordBreakCss} fontWeight="semibold">Search another card from above</Text>
        </Box>
    )
}

const CardDetail = ({ products }) => {
    return (
        <Box bg="white" w="100%" borderRight="1px solid" borderColor="gray.300">
            <Box px="20px" pt="40px" minH="65vh" display={{ xl: "block", lg: "block", md: "block", base: "none" }}>
                <Text textAlign="center" fontWeight="semibold" fontSize={16}>Card Detail</Text>
            </Box>
            <Box display={{ xl: "none", lg: "none", md: "none", base: "block" }}><SelectCreditCardComponent products={products} /></Box>
        </Box>
    )
}

const SelectedProduct = ({ key, product, ids }) => {
    const router = useRouter()
    const params = useSearchParams()
    const categoryId = params.get('id')
    const handleFilterProduct = (idToRemove) => {
        const newIds = ids.filter(id => id !== idToRemove);
        const newUrl = newIds.length > 0
            ? `/compare-creditCard/${newIds.join('/')}`
            : `/compare-creditCard/none`;
        router.push(`${newUrl}?id=${categoryId}`)
    }
    return (
        <Box bg="white" key={key} w={{ xl: "25%", lg: "25%", md: "50%", base: "50%" }} borderRight="1px solid" borderColor="gray.300">
            <Box px={{ xl: "20px", lg: "20px", md: "20px", base: "6px" }} pt="40px" minH="65vh">
                <Box pos="relative">
                    <Center w={6} h={6} zIndex={1} cursor="pointer" onClick={() => handleFilterProduct(product.uniqueId)} borderRadius={100} bg="gray.100" pos="absolute" top={-2} right={-2} ><MdClose /></Center>
                    <AspectRatio ratio={9 / 5} minW={{ xl: "229px", lg: "177px", md: "287px", base: '147px' }}>
                        <Image src={product.logo || "/assets/card.png"} alt="Credit Card" objectFit="cover" objectPosition="center" />
                    </AspectRatio>
                </Box>
                <Text textAlign="center" fontSize={{ xl: 20, lg: 18, md: 16, base: 16 }} mt={{ xl: "34px", lg: "30px", md: "10px", base: "10px" }} w="100%" {...wordBreakCss} fontWeight="semibold">{product.name}</Text>
                <CButton mt={3} w="full">Apply</CButton>
            </Box>
        </Box>
    )
}

const SelectedProductSticky = ({ key, product }) => {

    return (
        <Flex w="100%" direction={"column"} gap={1} key={key} justifyContent="center" alignItems="center" fontSize="12px">
            <Flex gap={2} alignItems="center" justifyContent="center">

                <AspectRatio alignSelf="start" ratio={9 / 5} minW={{ xl: "80px", lg: "70px", md: "60px", base: '50px' }}>
                    <Image src={product.logo || "/assets/card.png"} alt="Credit Card" objectFit="cover" objectPosition="center" />
                </AspectRatio>

                <Show breakpoint='(min-width: 400px)'>
                    <Flex direction="column" w="70%">
                        <Box>
                            <Text whiteSpace="nowrap" fontWeight={600} fontSize={13} >{product.name}</Text>

                            <Text fontSize={13} >Priority: {product.priority}</Text>


                            <Text fontSize={12} mt="8px" > Cibil Score: {product?.productCriteria?.cibilScore}</Text>
                        </Box>
                    </Flex>
                </Show>
            </Flex>
            <CButton w="full" mt={3} h="35px">Apply</CButton>

        </Flex>
    )
}

const PRODUCT_FEATURE = [
    { title: "Minimum Salary", id: "minSalary" },
    { title: "Cibil Score", id: "cibilScore" },
    { title: "Description", id: "description" },
    { title: "Features", id: "productFeature" },
    { title: "Eligibility Criteria", id: "eligibilityCriteria" },
    { title: "Document Required", id: "documentRequired" },
    { title: "Terms & Conditions", id: "rulesToFollow" },
] 