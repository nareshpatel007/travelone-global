import type { Metadata } from "next";
import ManageMyPersonaPage from "@/components/pages/manage-my-persona";

export const metadata: Metadata = {
    title: "Manage My Persona | Personalized Travel Intelligence",
    description: "Customize your travel identity. Use our AI-driven persona manager to refine your preferences and orchestrate your perfect global travel experience.",
    alternates: {
        canonical: `${process.env.SITE_URL}/legal/manage-my-persona`
    },
};

export default function Page() {
    return (
        <ManageMyPersonaPage />
    );
}
