"use client"

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

// Define interface
interface Props {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function PassengerForm({ formData, setFormData }: Props) {
    return (
        <div className="border border-border rounded-sm p-5 md:p-6 bg-card mb-4">
            <span className="text-xl font-semibold text-foreground mb-6 text-black mb-4 block">Lead Passenger Details</span>
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm md:text-base font-medium text-muted-foreground">Title</label>
                        <select
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border border-border rounded-sm bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent/50"
                        >
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Miss">Miss</option>
                            <option value="Dr.">Dr.</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm md:text-base font-medium text-muted-foreground mb-2">First Name</label>
                        <input
                            type="text"
                            value={formData.first_name}
                            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                            placeholder="First Name"
                            className="w-full px-4 py-2 border border-border rounded-sm bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm md:text-base font-medium text-muted-foreground mb-2">Last Name</label>
                        <input
                            type="text"
                            value={formData.last_name}
                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                            placeholder="Last Name"
                            className="w-full px-4 py-2 border border-border rounded-sm bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent/50"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm md:text-base font-medium text-muted-foreground mb-2">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Email Address"
                            className="w-full px-4 py-2 border border-border rounded-sm bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm md:text-base font-medium text-muted-foreground mb-2">Mobile Number</label>
                        <PhoneInput
                            defaultCountry="us"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e })}
                            placeholder="Enter your phone number"
                            className="w-full rounded-sm py-0.5 px-3 text-sm md:text-md text-black font-medium bg-white border border-black"
                            inputClassName="w-full !border-0 !border-white"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm md:text-base font-medium text-muted-foreground mb-2">Special Requirements</label>
                    <textarea
                        placeholder="Any special requests or requirements?"
                        value={formData.special_request}
                        onChange={(e) => setFormData({ ...formData, special_request: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-2 border border-border h-24 rounded-sm bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent/50"
                    />
                </div>
            </div>
        </div>
    )
}
