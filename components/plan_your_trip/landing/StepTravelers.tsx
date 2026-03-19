"use client";
import { useEffect, useState } from "react";
import QuestionHeading from "./questionHeading";

const travelerConfig = [
    ["Adults", "Ages 12 or above", "adults"],
    ["Child", "Ages 8-12", "child_8_12"],
    ["Child", "Ages 3-7", "child_3_7"],
    ["Infant", "Ages 0-2", "infant"],
];

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function StepTravelers({
    planYourTripForm,
    setPlanYourTripForm,
}: Props) {
    // Define state
    const [activeTab, setActiveTab] = useState<"solo" | "family" | "group">("family");
    const [womenOnly, setWomenOnly] = useState({
        solo: false,
        family: false,
        group: false,
    });

    const [familyCount, setFamilyCount] = useState({
        adults: 2,
        child_8_12: 0,
        child_3_7: 0,
        infant: 0,
    });

    const [groupCount, setGroupCount] = useState({
        adults: 2,
        child_8_12: 0,
        child_3_7: 0,
        infant: 0,
    });

    useEffect(() => {
        if (planYourTripForm?.prefer_travel_type) {
            setActiveTab(planYourTripForm.prefer_travel_type);
        }

        if (planYourTripForm?.family_friends) {
            setFamilyCount(planYourTripForm.family_friends);
            setWomenOnly((p) => ({
                ...p,
                family: !!planYourTripForm.family_friends.is_women_only,
            }));
        }

        if (planYourTripForm?.groups) {
            setGroupCount(planYourTripForm.groups);
            setWomenOnly((p) => ({
                ...p,
                group: !!planYourTripForm.groups.is_women_only,
            }));
        }

        if (planYourTripForm?.solo) {
            setWomenOnly((p) => ({
                ...p,
                solo: !!planYourTripForm.solo.is_women_only,
            }));
        }
    }, []);

    // Update count
    const updateCount = (
        type: "family" | "group",
        key: string,
        value: number
    ) => {
        const updater = type === "family" ? setFamilyCount : setGroupCount;

        updater((prev: any) => {
            const updated = {
                ...prev,
                [key]: Math.max(0, value),
            };

            setPlanYourTripForm((form: any) => ({
                ...form,
                prefer_travel_type: type === "family" ? "family" : "group",
                [type === "family" ? "family_friends" : "groups"]: updated,
            }));

            return updated;
        });
    };

    // Handle women only
    const handleWomenOnlyChange = (checked: boolean) => {
        setWomenOnly((prev) => ({
            ...prev,
            [activeTab]: checked,
        }));

        setPlanYourTripForm((form: any) => {
            if (activeTab === "solo") {
                return {
                    ...form,
                    prefer_travel_type: "solo",
                    solo: { is_women_only: checked },
                };
            }

            if (activeTab === "family") {
                return {
                    ...form,
                    prefer_travel_type: "family",
                    family_friends: {
                        ...familyCount,
                        is_women_only: checked,
                    },
                };
            }

            return {
                ...form,
                prefer_travel_type: "group",
                groups: {
                    ...groupCount,
                    is_women_only: checked,
                },
            };
        });
    };

    // Active data
    const activeData: any = activeTab === "family" ? familyCount : groupCount;

    return (
        <>
            <QuestionHeading title="Who's traveling and how many of you?" />
            <div className="!grid !grid-cols-3 !gap-3 !mb-3 !md:mb-6 !items-center !text-center">
                <Tab
                    label="Solo"
                    active={activeTab === "solo"}
                    onClick={() => {
                        setActiveTab("solo");
                        setPlanYourTripForm((f: any) => ({
                            ...f,
                            prefer_travel_type: "solo",
                        }));
                    }}
                />
                <Tab
                    label="Family"
                    active={activeTab === "family"}
                    onClick={() => {
                        setActiveTab("family");
                        setPlanYourTripForm((f: any) => ({
                            ...f,
                            prefer_travel_type: "family",
                        }));
                    }}
                />
                <Tab
                    label="Small Group"
                    active={activeTab === "group"}
                    onClick={() => {
                        setActiveTab("group");
                        setPlanYourTripForm((f: any) => ({
                            ...f,
                            prefer_travel_type: "group",
                        }));
                    }}
                />
            </div>

            {(activeTab === "family" || activeTab === "group") && (
                <div className="space-y-4">
                    {travelerConfig.map(([title, subtitle, key]) => (
                        <div key={key} className="!flex !justify-between !items-center !bg-white !mb-2 !px-4 !py-2 !rounded-sm">
                            <div>
                                <p className="!text-sm !m-0 font-medium !block">{title}</p>
                                <p className="!text-sm !m-0 text-gray-600">{subtitle}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() =>
                                        updateCount(activeTab, key, activeData[key] - 1)
                                    }
                                    className="w-7 h-7 bg-white border rounded-full hover:bg-black hover:text-white cursor-pointer"
                                >
                                    −
                                </button>

                                <span className="w-4 text-center">
                                    {activeData[key]}
                                </span>

                                <button
                                    onClick={() =>
                                        updateCount(activeTab, key, activeData[key] + 1)
                                    }
                                    className="w-7 h-7 bg-white border rounded-full hover:bg-black hover:text-white cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-3 !mt-4">
                <input
                    type="checkbox"
                    checked={womenOnly[activeTab]}
                    onChange={(e) => handleWomenOnlyChange(e.target.checked)}
                />
                <span>Women only</span>
            </div>
        </>
    );
}

function Tab({ label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`py-2 text-sm !md:text-md rounded-md cursor-pointer transition ${active ? "!bg-black !text-white" : "bg-white text-black"
                }`}
        >
            {label}
        </button>
    );
}