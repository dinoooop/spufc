
export const enquiryValidation = (key, value) => {
    switch (key) {
        case "name":
            if (value.length === 0) {
                return "Name equired"
            } else {
                return (value.length >= 30) ? "Maximum charecters cannot exceed 30" : false
            }
        case "enquiries":
            if (value.length === 0) {
                return "Name equired"
            } else {
                return (value.length >= 500) ? "Maximum charecters cannot exceed 500" : false
            }

        case "phone":
            return (value.length === 0) ? "Phone required" : false

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