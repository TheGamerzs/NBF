import * as fs from "fs";

export function saveWordsUsedInNatives() {
	const fileStream = fs.readFileSync("./data/natives.h", "utf8"),
		lines = fileStream.split("\n"),
		natives = [],
		nativeWords = [];

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		if (line.includes("static")) {
			const name = line.split(" ")[2].split("(")[0];
			natives.push(name);
		}
	}

	for (let i = 0; i < natives.length; i++) {
		const name = natives[i],
			words = name.split("_");

		for (let j = 0; j < words.length; j++) {
			if (
				words[j] !== "" &&
				nativeWords.indexOf(words[j]) === -1 &&
				words[j].startsWith("0x")
			) {
				nativeWords.push(words[j]);
			}
		}
	}

	nativeWords.sort();

	fs.writeFileSync("./data/native_words.txt", nativeWords.join("\n"));
}

export function getWordsUsedInNatives() {
	try {
		const fileStream = fs.readFileSync("./data/native_words.txt", "utf8"),
			lines = fileStream.split("\n");
		return lines;
	} catch (e) {
		console.error(e);
		return [];
	}
}

export function joaat(s: string) {
	const k = s.toLowerCase();
	let h, i;

	for (h = i = 0; i < k.length; i++) {
		h += k.charCodeAt(i);
		h += h << 10;
		h ^= h >>> 6;
	}

	h += h << 3;
	h ^= h >>> 11;
	h += h << 15;

	return h >>> 0;
}

export function toHex(n: any) {
	let h = n.toString(16);
	return "0x" + h.toUpperCase();
}
