import PersonasCountryLanding from "@/components/personas/country-landing";

type Props = {
    params: Promise<{ country: string }>;
};

export default async function Page({ params }: Props) {
    // Get values
    const { country } = await params;

    return (
        <PersonasCountryLanding country={country} />
    );
}