
export const validateForm = (key, value) => {
    switch (key) {
        case "name":
            if (value.length === 0) {
                return "Name equired"
            }
            return false;
       

        default:
            return false;

    }

}
