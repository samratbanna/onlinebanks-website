import { STATUS } from "@/constants"
import { useCategoryStore } from "@/store/category"
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react"
import { find } from "lodash"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"

export const ProductLeadModal = ({ isOpen, onClose, productId }) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "", email: "", contact: "", pincode: ""
        }
    })
    const router = useRouter()

    const { createLeadAction, createPublicLeadStatus, resetStatus, productDetail } = useCategoryStore(s => ({
        createLeadAction: s.createLeadAction,
        createPublicLeadStatus: s.createPublicLeadStatus,
        resetStatus: s.resetStatus,
        productDetail: s.productDetail
    }))

    const onSubmit = (data) => {
        let payload = { ...data }
        createLeadAction({
            ...payload, productId
        })
    }

    const product = useMemo(() => find(productDetail, p => p._id == productId), [productId, productDetail])

    useEffect(() => {
        if (createPublicLeadStatus == STATUS.SUCCESS) {
            router.push(product?.url)
            resetStatus()
            reset()
            onClose()
        }
    }, [createPublicLeadStatus, resetStatus, onClose, product, reset, router])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalContent>
                    <ModalHeader>{`Create lead for ${product?.name}`}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack>
                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field }) =>
                                        <Input {...field} placeholder="Enter name" />
                                    }
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Contact</FormLabel>
                                <Controller
                                    control={control}
                                    name="contact"
                                    render={({ field }) =>
                                        <Input {...field} type="tel" placeholder="Enter contact" pattern="[6-9]{1}[0-9]{9}" maxLength={10} minLength={10} />
                                    }
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field }) =>
                                        <Input {...field} type="email" placeholder="Enter email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                                    }
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Pincode</FormLabel>
                                <Controller
                                    control={control}
                                    name="pincode"
                                    render={({ field }) =>
                                        <Input {...field} minLength={6} maxLength={6} placeholder="Enter pincode" />
                                    }
                                />
                            </FormControl>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button isLoading={createPublicLeadStatus == STATUS.FETCHING} type="submit" color="white" bgGradient="linear(45deg, buttonGradiant1, buttonGradiant2)">Apply</Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}