import processData from "../helpers/processData";
import { sv } from "../helpers/sv";

// form helpers
export class fm {

  static getLabel(name) {
    let parts = name.split('_');
    parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    return parts.join(' ');
  }

  static getOptions(optionType) {

    switch (optionType) {
      case "role":
        return sv.role()
      case "sponsor-type":
        return processData.sponsorTypes;
      case "sponsor-status":
        return processData.sponsorStatus;
      case "event-type":
        return processData.eventTypes;
      case "status":
        return sv.status()
      default:
        return []
    }
  }

  static findItemById(id, haystack) {
    return haystack.find(item => item.id === id);
  }


  static toggleArrayItem(id, haystack) {
    const index = haystack.findIndex(item => item === id)
    if (index !== -1) {
      return haystack.filter(item => item !== id)
    } else {
      return [...haystack, id];
    }
  }

  static inArray(needle, haystack) {
    return haystack.some(item => item === needle);
  }

}
