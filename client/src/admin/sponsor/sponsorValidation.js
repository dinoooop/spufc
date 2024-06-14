import { vr } from "../../helpers/vr";

export const validateForm = (key, value) => {
    switch (key) {
        
        case "name":
            return value.length === 0 ? "Name required" : false;

        case "email":
            if (value.length === 0) {
                return "Email required";
            } else {
                const regex = vr.regex("email");
                return !regex.test(value) ? "Email not valid" : false;
            }

        case "website":
            if (value.length === 0) {
                return false;
            } else {
                const regex = vr.regex("url");
                return !regex.test(value) ? "Not valid URL" : false;
            }

        case "status":
            return value.length === 0 ? "Status required" : false;

        case "type":
            return value.length === 0 ? "Type required" : false;

        default:
            return false;

    }

}
