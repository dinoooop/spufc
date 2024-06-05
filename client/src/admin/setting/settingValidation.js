
export const validateForm = (key, value) => {
    switch (key) {

        case "email":
            if (value.length === 0) {
                return "Email required";
            } else {
                const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                return !regex.test(value) ? "Email not valid" : false;
            }
        case "instagram":
        case "facebook":
            if (value.length === 0) {
                return false;
            } else {
                const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
                return !regex.test(value) ? "Not valid URL" : false;
            }

        default:
            return false;

    }

}