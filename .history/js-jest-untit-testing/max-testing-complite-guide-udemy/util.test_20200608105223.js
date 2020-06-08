const { generateText } = require('./util'); // mora ovako, ne sa import mada moze da se podesi

test('should output name and age', () => {
	const text1 = generateText('Zoki', 36);
	expect(text1).toBe('Zoki (36 years old)');

	const text2 = generateText('Jeka', 33);
	expect(text2).toBe('Jeka (33 years old)');
});

// avoid false positives
test('should output data-less text', () => {
	const text1 = generateText('', null);
	expect(text1).toBe(' (null years old)');

	const text2 = generateText();
	expect(text2).toBe('undefined (undefined years old)');
});
