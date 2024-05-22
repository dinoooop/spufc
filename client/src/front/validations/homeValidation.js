
export const enquiryValidation = (key, value) => {
    switch (key) {
        case "name":
            if (value.length === 0) {
                return "Name equired"
            } else {
                return (value.length >= 20) ? "Maximum charecters cannot exceed 20" : false
            }
        case "enquiries":
            return (value.length === 0) ? "Enquiries required" : false

        case "email":
            if (value.length === 0) {
                return "Email required";
            } else {
                const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                return !regex.test(value) ? "Email not valid" : false;
            }

        default:
            return false;

    }

}