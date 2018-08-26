/**
 * format date
 */
let format = date => {
	// return new Date(date).getFullYear()+'-'+(parseInt(new Date(date).getMonth())+1)+'-'+new Date(date).getDate()
	let year = new Date(date).getFullYear()
	let month = (parseInt(new Date(date).getMonth())+1) > 10 ? (parseInt(new Date(date).getMonth())+1) : '0' + (parseInt(new Date(date).getMonth())+1)
	let day = new Date(date).getDate()

	return year + '-' + month + '-' + day
}

export default format