// const getAddressById = async (id: number) => {
//     const baseUrl = process.env.NEXT_PUBLIC_BASEURL!;
//     if (student) {
//         const addressUrl = `${baseUrl}/api/address/${id}`;
//         try {
//             const response = await fetch(
//                 addressUrl,
//                 {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     cache: 'force-cache'
//                 }
//             );
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const result = await response.json();

import { useAddressStore } from "@/store/AddressStore";
import { useSessionStore } from "@/store/SessionStore"
import { Address, AddressType } from "@/types/AddressType";
import { AxiosInstance } from "@/utils/AxiosInstance";
import { toast } from "sonner";

//             return result as Address;
//         } catch (error) {
//             console.error('[app/viewprofile/page.tsx] There was a problem with your fetch operation:', error);
//         }
//     } else {
//         console.error('[app/viewprofile/page.tsx] Student is undefined');
//     }
//     return undefined
// }

// const getAddress = async () => {
//     if (student && cruuAddress === undefined) {
//         const address = await getAddressById(student.present_address_id);
//         setCurrAddress(address)
//         const permAddress = await getAddressById(student.permanent_address_id);
//         setPermAddress(permAddress);
//         const guradianAddress = await getAddressById(student.guardian_address_id);
//         setGuradianAddress(guradianAddress);
//     }

// }

export const getAddress = async () => {
    
    const student = useSessionStore.getState().student;
    
    // const setCurrentAddress = useAddressStore (state => state.setCurrentAddress);
    // const setPermanentAddress = useAddressStore (state => state.setPermanentAddress);
    // const setGurdianAddress = useAddressStore (state => state.setGurdianAddress);
    
    if (student === undefined) {
        toast.error('[getAddress.ts] Student is undefined.');
        return; 
    }
    
    const currentAddress = await getAddressById(student.present_address_id);
    if (currentAddress === undefined) {
        toast.error('[getAddress.ts] Error fetching current address.');
        return;
    }

    useAddressStore.setState({currentAddress: currentAddress});

    const permanentAddress = await getAddressById(student.permanent_address_id);
    if (permanentAddress === undefined) {
        toast.error('[getAddress.ts] Error fetching permanent address.');
        return;
    }

    useAddressStore.setState({permanentAddress: currentAddress});


    const guardianAddress = await getAddressById(student.guardian_address_id);

    if (guardianAddress === undefined) {
        toast.error('[getAddress.ts] Error fetching guardian address.');
        return;
    }

    useAddressStore.setState({gurdianAddress: guardianAddress});

}

const getAddressById = async (id: number) : Promise<Address | undefined> => {
    const response = await AxiosInstance.get(`/api/address/${id}`);

    if (response.status !== 200) {
        toast.error('Error fetching address with id: ' + id);
        return; 
    }
    return response.data as Address;

}