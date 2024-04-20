import ProcedureProgress from "@/wels-components/ProcedureProgress/ProcedureProgress";
import { ProgressStep } from "@/wels-components/ProcedureProgress/ProgressStep";
import { Check, DollarSign, LoaderIcon, Package, PackageCheck, Truck } from "lucide-react";

const ProcedureProgess = () => {
  return (
   
  <ProcedureProgress showSerial={true} direction="horizontal">
    <ProgressStep status="approved" icon={<Check />}>
      Order Received
    </ProgressStep>
    <ProgressStep status="approved" icon={<LoaderIcon />}>
      Order Processing
    </ProgressStep>
      <ProgressStep status="approved" icon={<DollarSign />}>
      Payment Failed
    </ProgressStep>
      <ProgressStep status="approved" icon={<Package />}>
      Packaging
    </ProgressStep>
    <ProgressStep status="cancelled" icon={<Truck />}>
      Shipment
    </ProgressStep>
    <ProgressStep status="waiting" icon={<PackageCheck />}>
      Delivered
    </ProgressStep>
  </ProcedureProgress>
  )
}

export default ProcedureProgess