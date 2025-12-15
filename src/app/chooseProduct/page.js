"use client";
import { MainLayout } from "@/layouts/MainLayout";
import { ProductList } from "../../components/productLead/ProductList";

export default function Page() {
    return (
        <MainLayout>
            <ProductList />
        </MainLayout>
    );
}
