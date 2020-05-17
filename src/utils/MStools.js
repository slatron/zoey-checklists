export const tools = () => {
  return {
    sortBy: function _sortBy (field, reverse, primer) {
      var key = function (x) {
        return primer ? primer(x[field]) : x[field]
      }
      return function (a, b) {
        var A = key(a); var B = key(b)
        return ((A < B) ? -1 : ((A > B) ? 1 : 0)) * [-1, 1][+!!reverse]
      }
    },

    pluck: function (array, key) {
      return array.map(o => o[key])
    },

    pluckDeep: function (array, key, keyDeep) {
      return array.map(o => {
        return o.hasOwnProperty(key)
          ? o[key][keyDeep]
          : undefined
      })
    },

    fastPush: (array, item) => {
      array[array.length] = item
      return array
    },

    intersection: (...arrays) => {
      return arrays.reduce((a, b) => a.filter(c => b.includes(c)))
    },

    max: (array) => {
      return array.reduce(function (a, b) {
        return Math.max(a, b)
      })
    },

    /**
     *  Safely access data from nested objects with tools().get(fn)
     *  - Replicates _.get
     *  - Pass accesor as function to use
     *  - Pass defaultVal param to return in place of undefined
     *
     *  Example:
     *  - const obj = {foo: bar: { fizz: 'buzz' }}
     *
     *  - tools().get(() => obj.foo.bar.fizz)      // returns 'buzz'
     *  - tools().get(() => obj.foo.yes.no)        // returns undefined
     *  - tools().get(() => obj.foo.yes.no, 'boo') // returns 'boo'
     **/
    get: (fn, defaultVal) => {
      try {
        return fn()
      } catch (e) {
        return defaultVal
      }
    },

    debounce: function debounce (func, wait, immediate) {
      let timeout
      return function executedFunction () {
        let context = this
        let args = arguments
        let later = function () {
          timeout = null
          if (!immediate) func.apply(context, args)
        }
        let callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
      }
    },

    formatCurrency: (text) => {
      if (text) {
        text = text.toString()
        let precedent = text.split('.')[0]
        let significand = text.split('.')[1]
        precedent = (precedent + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,')
        text = '$' + ' ' + precedent
        if (significand) {
          significand = significand.slice(0, 2)
          significand = significand.length === 1 ? significand + 0 : significand
          text += '.' + significand
        } else {
          text += '.' + '00'
        }
        return text
      } else {
        return ''
      }
    },

    isToday: (someDate, today) => {
      today = today || new Date()
      return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    }

  }
}
