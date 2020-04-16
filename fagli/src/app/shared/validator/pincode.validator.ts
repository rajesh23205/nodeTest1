import { FormGroup } from '@angular/forms';
import { PinCode } from '../constant/Pincode';

export function ValidatePincode(pincode: string) {
    return (formGroup: FormGroup) => {
        const currentPinCode = formGroup.controls[pincode];

        if (currentPinCode.errors && !currentPinCode.errors.pincodeError) {
            return;
        }
        const pincodeList = PinCode.Pincode;
        const index = pincodeList.indexOf(currentPinCode.value);
        if (index === -1) {
          currentPinCode.setErrors({ pincodeError: true });
        } else {
          currentPinCode.setErrors(null);
        }
    };
}
