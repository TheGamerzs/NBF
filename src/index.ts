import * as util from "./util";

const words = util.getWordsUsedInNatives();
let i = 0,
	count = 0;

while (i < words.length) {
	i++;
	for (let j = 0; j < words.length; j++) {
		count++;
	}
}
console.log(count);
