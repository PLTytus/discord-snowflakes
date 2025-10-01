function tsToIso(ts){
	let date = new Date(Number(ts));

	let pad = (num, size) => String(num).padStart(size, '0');

	let y = date.getUTCFullYear();
	let m = pad(date.getUTCMonth() + 1, 2); // Months are 0-based
	let d = pad(date.getUTCDate(), 2);
	let h = pad(date.getUTCHours(), 2);
	let i = pad(date.getUTCMinutes(), 2);
	let s = pad(date.getUTCSeconds(), 2);
	let ms = pad(date.getUTCMilliseconds() * 1000, 6);

	return `${y}-${m}-${d}T${h}:${i}:${s}.${ms}+00:00`;
}

document.onreadystatechange = function(){
	document.querySelector("#snowflake").addEventListener("input", (e) => {
		e.target.value = e.target.value.replace(/[^\d]/, '');

		let snowflake = BigInt(e.target.value);

		let tsms = (snowflake >> 22n) + 1420070400000n;
		let tss = tsms / 1000n;
		let iso = tsToIso(tsms);
		let wid = (snowflake & 0x3E0000n) >> 17n;
		let pid = (snowflake & 0x1F000n) >> 12n;
		let inc = (snowflake & 0xFFFn);

		document.querySelector("#tsms").value = tsms;
		document.querySelector("#tss").value = tss;
		document.querySelector("#iso").value = iso;
		document.querySelector("#wid").value = wid;
		document.querySelector("#pid").value = pid;
		document.querySelector("#inc").value = inc;
	});
}