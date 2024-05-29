
export const validateForm = (key, value) => {
    switch (key) {
        case "name":
            if (value.length === 0) {
                return "Name equired"
            }
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
