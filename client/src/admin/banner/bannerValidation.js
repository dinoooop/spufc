
export const validateForm = (key, value) => {
    switch (key) {
        case "title":
            if (value.length === 0) {
                return "Title equired"
            } else {
                return (value.length >= 20) ? "Maximum charecters cannot exceed 20" : false
            }

        case "upload_banner":
            if (!value) {
                return "File is required";
            }
            if (value.size > 10 * 1024 * 1024) {
                return "File size cannot exceed 10MB";
            }
            if (
                !value.name.endsWith(".png") &&
                !value.name.endsWith(".jpg") &&
                !value.name.endsWith(".jpeg")
            ) {
                return "Only images files are allowed";
            } 
            return false;
        default:
            return false;

    }

}