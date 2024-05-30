import store from '../store'

// Basic functions
export class bc {

  static has(roles) {
    if (roles === 'all') { return true }
    const userRoles = store.getState().auth?.user?.roles || []
    const userRoleNames = userRoles.map(role => role.name)
    const rolesToCheck = roles.split('|')
    return rolesToCheck.some(role => userRoleNames.includes(role))
  }

  static inArrayObject(arobj, needle, property = 'id') {
    if (!arobj) { return false }
    return arobj.some(obj => obj[property] === needle)
  }

  static toggleArrayItem(array, item) {

    const itemToToggle = isNaN(item) ? item : Number(item)

    if (!array) {
      return [itemToToggle]
    }

    const index = array.indexOf(itemToToggle)

    if (index > -1) {
      return [...array.slice(0, index), ...array.slice(index + 1)]
    } else {
      return [...array, itemToToggle]
    }
  }

  static pluckIds(arr) {
    if (!arr) { return [] }
    return arr.map(obj => obj.id)
  }

  // convert "2024-06-02T05:02:00.000+00:00" to "2024-06-02T05:02"
  static convertToISO8601ShortFormat(dateTimeStr) {
    // Create a new Date object from the input date-time string
    const date = new Date(dateTimeStr);

    // Extract the year, month, day, hours, and minutes
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() returns 0-based month
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    // Format the extracted components into the desired format
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

    return formattedDateTime;
}

}
