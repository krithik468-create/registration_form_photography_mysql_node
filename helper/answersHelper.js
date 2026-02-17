exports.getValue = (text, answer) => {
    // Dig into the groups to find the specific question
    for (const group of answer) {
        const found = group.answer.find(q => q.question.toLowerCase().includes(text.toLowerCase()));
        if (found) return found.value;
    }
    return null;
};


