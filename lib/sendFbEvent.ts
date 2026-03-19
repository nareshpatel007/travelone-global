import { event } from "@/lib/metaPixel";

// Define Proms
interface Props {
    eventName: string;
    email?: string;
    amount?: number;
}

export function sendFbEvent({ eventName, email = "", amount = 0 }: Props) {
    try {
        // Generate a unique event ID for deduplication
        const eventID = generateEventId();

        // Send event
        event(eventName, {
            value: amount || 0,
            currency: "USD"
        }, eventID);

        // Send server event for deduplication
        fetch("/api/facebook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                event_name: eventName,
                event_id: eventID,
                email: email || "",
            }),
        });
    } catch (error) {
        console.error("Failed to send FB event:", error);
    }
}

// Helper function to generate a unique event ID
function generateEventId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}