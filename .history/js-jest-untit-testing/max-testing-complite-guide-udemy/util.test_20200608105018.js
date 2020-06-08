const { generateText } = require('./util'); // mora ovako, ne sa import mada moze da se podesi

test('should output name and age', () => {
	const text = generateText('Max', 29);
    expect(text).toBe('Zoki (36 years old)');
    
    const text2 = generateText('Jeka', 33);
    expect(text2).toBe('Jeka (33 years old)');
});

test('should output data-less text', () => {
	const text = generateText('', null);
	expect(text).toBe(' (null years old)');
});
