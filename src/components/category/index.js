import { useCategoryStore } from "@/store/category"
import { Box, Flex, Text } from "@chakra-ui/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { CreditCardComponent } from "./cards"
import { PersonalLoanComponent } from "./PersonalLoan"
import { SavingAccount } from "./SavingAccount"
import { DematAccount } from "./DematAccount"
import { DefaultComponent } from "./DefaultComponent"

export const CategoryComponent = () => {
    const { categories } = useCategoryStore(s => ({ categories: s.categories }))
    const params = useSearchParams()
    const path = usePathname()
    const router = useRouter()
    const categoryId = params.get("id")
    const _redirect = () => {
        router.push("/")
    }

    const categoryType = params.get("type")

    return (
        // <Box>
        categoryType == "credit-card" ?
            <CreditCardComponent />
            :
            categoryType == "personal-loan" ?
                <PersonalLoanComponent />
                :
                categoryType == "saving-accounts" ?
                    <SavingAccount />
                    :
                    categoryType == "demat-account" ?
                        <DematAccount />
                        :
                        <DefaultComponent />

        // </Box>
    )
}