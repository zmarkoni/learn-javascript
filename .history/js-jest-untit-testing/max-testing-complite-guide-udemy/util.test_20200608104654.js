const { generateText } = require('./util'); // mora ovako, ne sa import mada moze da se podesi

test('should output name and age', () => {
    const text = generateText('Max', 29);
    expect(text).toBe('Max (29 years old)');
});

test('should output data-less text', () => {
    
})