import { useState } from "react";

export default function useMoney() {
    const [donation, setDonation] = useState(0)
    const [formattedDonation, setFormattedDonation] = useState("")

    function clearDonationState() {
        setDonation(0);
        setFormattedDonation("");
    }


    return {donation, setDonation, formattedDonation, setFormattedDonation, clearDonationState}

}