import _ from 'lodash'
export const currency = (input?: number) => {
    if (!input) return ''

    /** Làm tròn chữ số thập phân */
    input = Math.round(input)

    /** Format tiền tệ */
    let result = new Intl.NumberFormat('vi').format(input)

    return _.isNaN(result) ? '' : result
}