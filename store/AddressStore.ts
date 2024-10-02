import { Address, AddressType } from "@/types/AddressType";
import { set } from "date-fns";
import {create} from "zustand";
import { persist } from "zustand/middleware";

interface AddressStoreType {
    currentAddress: Address | undefined,
    setCurrentAddress: (address: Address) => void
    permanentAddress: Address | undefined,
    setPermanentAddress: (address: Address) => void
    gurdianAddress: Address | undefined,
    setGurdianAddress: (address: Address) => void
}

export const useAddressStore = create<AddressStoreType>() (
    persist(
        (set) => ({
            currentAddress: undefined,
            setCurrentAddress: (address: Address) => set({currentAddress: address}),
            permanentAddress: undefined,
            setPermanentAddress: (address: Address) => set({permanentAddress: address}),
            gurdianAddress: undefined,
            setGurdianAddress: (address: Address) => set({gurdianAddress: address})
        })
        ,
        {
            name: 'address-storage'
        }
    )
)